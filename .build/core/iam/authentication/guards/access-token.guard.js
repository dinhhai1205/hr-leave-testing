"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const enums_1 = require("../../../../common/enums");
const utils_1 = require("../../../../common/utils");
const config_1 = require("../../../../config");
const company_user_role_service_1 = require("../../../../modules/user/modules/company-user-role/company-user-role.service");
const employee_service_1 = require("../../../../modules/user/modules/employee/employee.service");
const decorators_1 = require("../../decorators");
const iam_constant_1 = require("../../iam.constant");
const access_token_service_1 = require("../access-token.service");
let AccessTokenGuard = class AccessTokenGuard {
    constructor(reflector, jwtService, employeeService, companyUserRoleService, accessTokenService, jwtConfig) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.employeeService = employeeService;
        this.companyUserRoleService = companyUserRoleService;
        this.accessTokenService = accessTokenService;
        this.jwtConfig = jwtConfig;
    }
    async canActivate(context) {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const companyId = this.getCompanyId(request);
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.BadRequestException(`Missing jwtToken`);
        }
        let jwtPayload;
        try {
            jwtPayload =
                (await this.jwtService.verifyAsync(token, this.jwtConfig)) ?? {};
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
        await this.setActiveUserToRequest({
            request,
            jwtPayload,
            companyId,
            context,
        });
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, key] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? key : undefined;
    }
    async setActiveUserToRequest(args) {
        const { request, jwtPayload, companyId, context } = args;
        const { sub: userEmail = '' } = jwtPayload;
        const ranking = this.getRanking(jwtPayload);
        const select = (0, utils_1.getDecorator)(decorators_1.SELECT_EMPLOYEE_FIELDS_KEY, context, this.reflector);
        const moduleMode = (0, utils_1.getDecorator)(decorators_1.MODULE_MODE_KEY, context, this.reflector);
        let adminData = null;
        let essData = null;
        try {
            [adminData, essData] = await Promise.all([
                this.companyUserRoleService.getAdminData({
                    companyId,
                    userEmail,
                    apiModuleMode: moduleMode,
                }),
                this.employeeService.getEssData({ companyId, userEmail }, select?.selectedEmployeeFields ?? { id: true, email: true }),
            ]);
        }
        catch (error) {
            if (ranking === enums_1.EUserRanking.SILVER) {
                throw error;
            }
        }
        const activeUserData = this.setUserData(request, jwtPayload, adminData);
        const activeAdminData = this.setActiveAdminData(request, jwtPayload, adminData);
        const activeEssData = this.setIActiveEssData(request, jwtPayload, essData);
        return { activeUserData, activeAdminData, activeEssData };
    }
    setUserData(request, jwtPayload, adminData) {
        const { sub: userEmail = '' } = jwtPayload;
        const ranking = this.getRanking(jwtPayload);
        if (!userEmail) {
            throw new common_1.BadRequestException('Missing userEmail in jwt payload');
        }
        const activeUserData = {
            userEmail,
            userRanking: ranking,
            utcOffset: Number(jwtPayload[iam_constant_1.JWT_PAYLOAD_USER_UTC_OFFSET_KEY] || 0),
            isAdmin: ranking === enums_1.EUserRanking.GOLD || adminData ? true : false,
        };
        Object.assign(request, { [iam_constant_1.REQUEST_USER_KEY]: activeUserData });
        return activeUserData;
    }
    setActiveAdminData(request, jwtPayload, adminData) {
        const ranking = this.getRanking(jwtPayload);
        const isGoldMemberButNotHaveAdminData = ranking === enums_1.EUserRanking.GOLD && !adminData;
        if (isGoldMemberButNotHaveAdminData) {
            const rankGoldFullPermission = '{"View":true,"Export":true,"Create":true,"Edit":true,"Delete":true,"FullAccess":true,"NoAccess":false}';
            const activeAdminData = {
                id: 0,
                organizationPaths: [],
                approval: rankGoldFullPermission,
                leave: rankGoldFullPermission,
                payroll: rankGoldFullPermission,
                esign: rankGoldFullPermission,
            };
            Object.assign(request, { [iam_constant_1.REQUEST_ADMIN_KEY]: activeAdminData });
            return activeAdminData;
        }
        if (!adminData)
            return;
        const { orgElementListJson, approval, esign, leave, payroll, companyUserRoleId, } = adminData;
        const activeAdminData = {
            id: companyUserRoleId,
            organizationPaths: this.accessTokenService.getAdminOrganizationPaths(orgElementListJson),
            approval,
            leave,
            payroll,
            esign,
        };
        Object.assign(request, { [iam_constant_1.REQUEST_ADMIN_KEY]: activeAdminData });
        return activeAdminData;
    }
    setIActiveEssData(request, jwtPayload, essData) {
        const companyId = this.getCompanyId(request);
        const ranking = this.getRanking(jwtPayload);
        const { sub: userEmail = '' } = jwtPayload;
        if (ranking === enums_1.EUserRanking.GOLD && !essData) {
            const activeEssData = {
                email: userEmail,
                companyId,
                active: true,
                isEssEnabled: true,
            };
            Object.assign(request, {
                [iam_constant_1.REQUEST_ESS_KEY]: activeEssData,
            });
            return activeEssData;
        }
        if (!essData)
            return;
        Object.assign(request, { [iam_constant_1.REQUEST_ESS_KEY]: essData });
        return essData;
    }
    getRanking(jwtPayload) {
        return jwtPayload[iam_constant_1.JWT_PAYLOAD_USER_RANKING_KEY] || enums_1.EUserRanking.SILVER;
    }
    getCompanyId(request) {
        const { companyId: companyIdParam } = request.params;
        if (!companyIdParam) {
            throw new common_1.BadRequestException('Missing companyId');
        }
        const companyId = Number(companyIdParam);
        if (Number.isNaN(companyId)) {
            throw new common_1.BadRequestException(`Invalid company id ${companyId}`);
        }
        return companyId;
    }
};
exports.AccessTokenGuard = AccessTokenGuard;
exports.AccessTokenGuard = AccessTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, config_1.InjectJwtConfig)()),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        employee_service_1.EmployeeService,
        company_user_role_service_1.CompanyUserRoleService,
        access_token_service_1.AccessTokenService, Object])
], AccessTokenGuard);
//# sourceMappingURL=access-token.guard.js.map
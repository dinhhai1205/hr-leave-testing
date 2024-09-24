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
exports.LegacyAccessTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../../../../common/constants");
const decorators_1 = require("../../../../common/decorators");
const enums_1 = require("../../../../common/enums");
const utils_1 = require("../../../../common/utils");
const config_1 = require("../../../../config");
const octo_user_service_1 = require("../../../../modules/octopro/modules/octo-user/octo-user.service");
const company_user_role_service_1 = require("../../../../modules/user/modules/company-user-role/company-user-role.service");
const employee_service_1 = require("../../../../modules/user/modules/employee/employee.service");
let LegacyAccessTokenGuard = class LegacyAccessTokenGuard {
    constructor(jwtConfig, jwtService, employeeService, reflector, companyUserRole, octoUserService) {
        this.jwtConfig = jwtConfig;
        this.jwtService = jwtService;
        this.employeeService = employeeService;
        this.reflector = reflector;
        this.companyUserRole = companyUserRole;
        this.octoUserService = octoUserService;
        this.defaultPermission = {
            View: true,
            Export: false,
            Create: false,
            Edit: false,
            Delete: false,
            FullAccess: false,
            NoAccess: false,
        };
    }
    async canActivate(context) {
        const skipFlag = (0, utils_1.getDecoratorContext)({
            reflector: this.reflector,
            context,
            key: decorators_1.SKIP_FLAG,
        }) || [];
        if (skipFlag && skipFlag.includes(enums_1.ESkipFlag.AUTHORIZATION))
            return true;
        const request = context.switchToHttp().getRequest();
        const { appMode: appModeQuery, module = enums_1.EMainModule.LEAVE } = request.query;
        const { appMode: appModeHeader } = request.headers;
        const appMode = appModeHeader || appModeQuery;
        if (!request?.params?.companyId &&
            !(skipFlag && skipFlag.includes(enums_1.ESkipFlag.COMPANY_ID))) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.MISSING('Company id'));
        }
        const companyId = Number(request.params.companyId);
        const token = (0, utils_1.extractTokenFromHeader)(request);
        if (!token) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.MISSING('JWT token'));
        }
        let decodedToken;
        try {
            decodedToken = await this.jwtService.verifyAsync(token, {
                secret: this.jwtConfig.secret,
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
        const email = decodedToken?.sub || '';
        const ranking = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || enums_1.EUserRanking.SILVER;
        if (!email) {
            throw new common_1.ForbiddenException(constants_1.ERR_MSG.INVALID_JWT);
        }
        const authType = (0, utils_1.getDecoratorContext)({
            reflector: this.reflector,
            context,
            key: decorators_1.AUTH_TYPE,
        }) || enums_1.EAuthType.HRFORTE;
        switch (authType) {
            case enums_1.EAuthType.OCTOPRO:
                await this.setOctoAuthContext({ request, email, companyId, ranking });
                break;
            case enums_1.EAuthType.HRFORTE:
                await this.setHrforteAuthContext({
                    request,
                    companyId,
                    email,
                    appMode: appMode?.toString(),
                    ranking,
                    module: module,
                });
                break;
            default:
                break;
        }
        return true;
    }
    async setHrforteAuthContext(args) {
        const { appMode = enums_1.EApiAppMode.ADMIN, companyId, email, request, ranking = enums_1.EUserRanking.SILVER, module = enums_1.EMainModule.LEAVE, } = args;
        let employee = null;
        let companyUserRole = null;
        if (companyId) {
            try {
                [employee, companyUserRole] = await Promise.all([
                    this.employeeService.getEmployeeAuth({ companyId, email }),
                    this.companyUserRole.getCompanyUserRole({ companyId, email }),
                ]);
            }
            catch (error) {
                if (ranking === enums_1.EUserRanking.SILVER) {
                    throw error;
                }
            }
        }
        const organizationPaths = appMode === enums_1.EApiAppMode.ADMIN && ranking !== enums_1.EUserRanking.GOLD
            ? this.companyUserRole.getAdminOrganizationPaths(companyUserRole?.orgElementListJson)
            : [];
        const parsePermission = (permission) => {
            if (typeof permission === 'string') {
                return (0, utils_1.safeJsonParse)({
                    text: permission,
                    defaultValueReturn: this.defaultPermission,
                });
            }
            return permission;
        };
        const permissions = companyUserRole
            ? {
                leave: parsePermission(companyUserRole.leave),
                approval: parsePermission(companyUserRole.approval),
                payroll: parsePermission(companyUserRole.payroll),
            }
            : undefined;
        Object.assign(request, {
            authInfo: {
                authEmail: email,
                authEmployeeId: employee?.id || undefined,
                authPermission: permissions,
                appMode,
                ranking,
                module: module.toLowerCase(),
                utcOffset: employee?.aspNetUsers?.utcOffset ?? 0,
                organizationPaths,
                isAdmin: permissions !== undefined,
            },
        });
    }
    async setOctoAuthContext(args) {
        const { companyId, ranking, email, request } = args;
        let octoUser = null;
        if (companyId) {
            try {
                octoUser = await this.octoUserService.getOctoUser({
                    companyId,
                    email,
                });
            }
            catch (error) {
                if (ranking === enums_1.EUserRanking.SILVER) {
                    throw error;
                }
            }
        }
        if (!octoUser && ranking !== enums_1.EUserRanking.GOLD) {
            throw new common_1.NotFoundException(`Not found ${email} octo user in the company ${companyId}`);
        }
        Object.assign(request, {
            authInfo: {
                authEmail: email,
                ranking,
                authUserId: octoUser?.id,
            },
        });
    }
};
exports.LegacyAccessTokenGuard = LegacyAccessTokenGuard;
exports.LegacyAccessTokenGuard = LegacyAccessTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, config_1.InjectJwtConfig)()),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        employee_service_1.EmployeeService,
        core_1.Reflector,
        company_user_role_service_1.CompanyUserRoleService,
        octo_user_service_1.OctoUserService])
], LegacyAccessTokenGuard);
//# sourceMappingURL=legacy-access-token.guard.js.map
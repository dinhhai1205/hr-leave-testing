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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const decorators_1 = require("../../../../common/decorators");
const enums_1 = require("../../../../common/enums");
const utils_1 = require("../../../../common/utils");
const decorators_2 = require("../../decorators");
const iam_constant_1 = require("../../iam.constant");
let PermissionGuard = class PermissionGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const activeUserData = request[iam_constant_1.REQUEST_USER_KEY];
        if (!activeUserData) {
            throw new common_1.NotFoundException(`Not found active user`);
        }
        if (activeUserData.userRanking === enums_1.EUserRanking.GOLD)
            return true;
        const requiredApiAppMode = (0, utils_1.getDecorator)(decorators_2.EApiAppMode_KEY, context, this.reflector) ||
            enums_1.EApiAppMode.ADMIN;
        switch (requiredApiAppMode) {
            case enums_1.EApiAppMode.ESS:
                return this.authorizeEss(request);
            case enums_1.EApiAppMode.ADMIN:
                return this.authorizeAdmin(request, context);
            default:
                break;
        }
        return true;
    }
    async authorizeEss(request) {
        const activeEssData = request[iam_constant_1.REQUEST_ESS_KEY];
        if (!activeEssData) {
            throw new common_1.ForbiddenException(`Not found employee information`);
        }
        return true;
    }
    async authorizeAdmin(request, context) {
        const activeAdminData = request[iam_constant_1.REQUEST_ADMIN_KEY];
        if (!activeAdminData) {
            throw new common_1.ForbiddenException(`Missing admin role data`);
        }
        const requiredPermission = (0, utils_1.getDecorator)(decorators_1.PERMISSION_KEY, context, this.reflector);
        if (!requiredPermission) {
            throw new common_1.InternalServerErrorException('Application missing permission action config to process admin authorization.');
        }
        const moduleMode = (0, utils_1.getDecorator)(decorators_2.MODULE_MODE_KEY, context, this.reflector);
        if (!moduleMode) {
            throw new common_1.InternalServerErrorException('Application missing module mode config to process admin authorization.');
        }
        const permissionString = activeAdminData[moduleMode];
        if (!permissionString) {
            throw new common_1.InternalServerErrorException(`Missing permission for role admin in module ${moduleMode}`);
        }
        const permissionAction = (0, utils_1.safeJsonParse)({
            text: permissionString,
            defaultValueReturn: null,
        });
        if (!permissionAction) {
            throw new common_1.InternalServerErrorException(`Missing permission for role admin in module ${moduleMode}`);
        }
        if (permissionAction['FullAccess']) {
            return true;
        }
        if (permissionAction['NoAccess']) {
            throw new common_1.ForbiddenException(`User have no permission access`);
        }
        return permissionAction[requiredPermission];
    }
};
exports.PermissionGuard = PermissionGuard;
exports.PermissionGuard = PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], PermissionGuard);
//# sourceMappingURL=permission.guard.js.map
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
exports.LegacyPermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("../../../../common/constants");
const decorators_1 = require("../../../../common/decorators");
const enums_1 = require("../../../../common/enums");
const decorators_2 = require("../../decorators");
let LegacyPermissionGuard = class LegacyPermissionGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { appMode, authPermission = undefined, ranking } = request.authInfo;
        let module = request.authInfo.module;
        if (!module) {
            module =
                this.getDecorator(decorators_2.MODULE_MODE_KEY, context) ||
                    enums_1.EApiModuleMode.Leave;
        }
        if (ranking === enums_1.EUserRanking.GOLD)
            return true;
        const requiredRoles = this.getDecorator(decorators_1.ROLES_KEY, context);
        const requiredPermission = this.getDecorator(decorators_1.PERMISSION_KEY, context);
        if (requiredPermission && requiredRoles && requiredRoles.length) {
            const canAccess = this.canAccess({
                permissionDetail: authPermission,
                requirePermission: requiredPermission,
                requireRoles: requiredRoles,
                appMode,
                module,
            });
            if (canAccess)
                return true;
            throw new common_1.ForbiddenException(constants_1.ERR_MSG.ACCESS_DENIED);
        }
        return true;
    }
    getDecorator(key, context) {
        return this.reflector.getAllAndOverride(key, [
            context.getHandler(),
            context.getClass(),
        ]);
    }
    canAccess(args) {
        const { appMode = enums_1.EApiAppMode.ADMIN, permissionDetail = undefined, requirePermission, requireRoles, module, } = args;
        const isEmployee = permissionDetail ? false : true;
        if (appMode === enums_1.EApiAppMode.ADMIN) {
            if (isEmployee === true)
                return false;
            const permission = permissionDetail[module.toLowerCase()];
            if (permission[enums_1.EPermissionActions.FULL_ACCESS])
                return true;
            if (permission[enums_1.EPermissionActions.NO_ACCESS])
                return false;
            return permission[requirePermission];
        }
        if (isEmployee && requireRoles.includes(enums_1.ERole.ADMIN)) {
            return false;
        }
        return true;
    }
};
exports.LegacyPermissionGuard = LegacyPermissionGuard;
exports.LegacyPermissionGuard = LegacyPermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], LegacyPermissionGuard);
//# sourceMappingURL=legacy-permission.guard.js.map
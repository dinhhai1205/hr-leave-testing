"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesDecorator = exports.ROLES_KEY = exports.PermissionDecorator = exports.PERMISSION_KEY = void 0;
exports.SetAuthorize = SetAuthorize;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../core/iam/authentication/decorators");
const enums_1 = require("../../core/iam/enums");
exports.PERMISSION_KEY = 'permission';
const PermissionDecorator = (permission) => (0, common_1.SetMetadata)(exports.PERMISSION_KEY, permission);
exports.PermissionDecorator = PermissionDecorator;
exports.ROLES_KEY = 'roles';
const RolesDecorator = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.RolesDecorator = RolesDecorator;
function SetAuthorize(args) {
    const { permission, roles = [] } = args;
    const uniqueRoles = new Set();
    for (const role of roles) {
        uniqueRoles.add(role);
    }
    return (0, common_1.applyDecorators)((0, exports.RolesDecorator)(...Array.from(uniqueRoles)), (0, exports.PermissionDecorator)(permission), (0, decorators_1.Auth)(enums_1.AuthType.LegacyBearer, enums_1.AuthType.LegacyPermission));
}
//# sourceMappingURL=set-authorize.decorator.js.map
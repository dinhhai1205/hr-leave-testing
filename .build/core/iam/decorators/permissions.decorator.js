"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SELECT_EMPLOYEE_FIELDS_KEY = exports.PERMISSION_KEY = exports.EApiAppMode_KEY = void 0;
exports.Permissions = Permissions;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../../common/enums");
exports.EApiAppMode_KEY = 'apiAppModeKey';
exports.PERMISSION_KEY = 'permissionKey';
exports.SELECT_EMPLOYEE_FIELDS_KEY = 'selectedEmployeeFieldsKey';
const ApiAppModesDecorator = (apiAppMode) => (0, common_1.SetMetadata)(exports.EApiAppMode_KEY, apiAppMode);
const PermissionDecorator = (permission) => (0, common_1.SetMetadata)(exports.PERMISSION_KEY, permission);
const SelectedEmployeeFields = (selectedEmployeeFields = {}) => (0, common_1.SetMetadata)(exports.SELECT_EMPLOYEE_FIELDS_KEY, selectedEmployeeFields);
function Permissions(apiAppMode, opts) {
    switch (apiAppMode) {
        case enums_1.EApiAppMode.ADMIN:
            return (0, common_1.applyDecorators)(ApiAppModesDecorator(apiAppMode), PermissionDecorator(opts));
        case enums_1.EApiAppMode.ESS:
            return (0, common_1.applyDecorators)(ApiAppModesDecorator(apiAppMode), SelectedEmployeeFields(opts || {}));
        default:
            return (0, common_1.applyDecorators)(ApiAppModesDecorator(apiAppMode));
    }
}
//# sourceMappingURL=permissions.decorator.js.map
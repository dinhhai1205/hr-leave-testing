"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authInfoTestData = void 0;
const enums_1 = require("../enums");
exports.authInfoTestData = {
    authEmail: 'trunglm@zigvy.com',
    authEmployeeId: 154690,
    authPermission: {
        leave: {
            View: true,
            Export: true,
            Create: true,
            Edit: true,
            Delete: true,
            FullAccess: true,
            NoAccess: false,
        },
        approval: {
            View: true,
            Export: true,
            Create: true,
            Edit: true,
            Delete: true,
            FullAccess: true,
            NoAccess: false,
        },
        payroll: {
            View: true,
            Export: true,
            Create: true,
            Edit: true,
            Delete: true,
            FullAccess: true,
            NoAccess: false,
        },
    },
    appMode: enums_1.EApiAppMode.ADMIN,
    ranking: enums_1.EUserRanking.SILVER,
    module: enums_1.EApiModuleMode.Leave,
    utcOffset: 0,
    organizationPaths: [],
    isAdmin: true,
};
//# sourceMappingURL=auth-info.test-data.js.map
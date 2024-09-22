"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGoldUserAccessEssWithoutEmp = isGoldUserAccessEssWithoutEmp;
const enums_1 = require("../enums");
function isGoldUserAccessEssWithoutEmp(authInfo) {
    const { appMode, authEmployeeId, ranking } = authInfo;
    if (ranking === enums_1.EUserRanking.GOLD &&
        appMode === enums_1.EApiAppMode.ESS &&
        !authEmployeeId) {
        return true;
    }
    return false;
}
//# sourceMappingURL=is-gold-user-access-ess-without-employee.util.js.map
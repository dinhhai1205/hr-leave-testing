"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterEmployeeQueryBuilderInEssMode = filterEmployeeQueryBuilderInEssMode;
const enums_1 = require("../enums");
function filterEmployeeQueryBuilderInEssMode(authInfo, queryBuilder, queryBuilderOpts) {
    const { isAdmin, authEmployeeId, ranking, authEmail } = authInfo;
    if (ranking !== enums_1.EUserRanking.GOLD && !isAdmin) {
        if (!authEmployeeId) {
            throw new Error(`The employee #${authEmail} is missing id`);
        }
        const alias = queryBuilder.alias;
        const { field, value, customVariable } = queryBuilderOpts;
        const variable = customVariable ?? String(field);
        queryBuilder.andWhere(`${alias}.${String(field)} = :${variable}`, {
            [variable]: value,
        });
    }
}
//# sourceMappingURL=filter-employee-querybuilder-in-ess-mode.js.map
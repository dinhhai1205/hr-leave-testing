"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByKey = sortByKey;
const enums_1 = require("../enums");
function sortByKey(array, key, order = enums_1.EOrder.ASC) {
    return array.sort((a, b) => {
        if (a[key] < b[key]) {
            return order === enums_1.EOrder.ASC ? -1 : 1;
        }
        if (a[key] > b[key]) {
            return order === enums_1.EOrder.DESC ? 1 : -1;
        }
        return 0;
    });
}
//# sourceMappingURL=sort-by-key.util.js.map
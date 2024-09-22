"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATETIME_WITHOUT_TZ_COLUMN_TYPE = void 0;
const utils_1 = require("../utils");
exports.DATETIME_WITHOUT_TZ_COLUMN_TYPE = {
    type: (0, utils_1.columnType)('DATETIME'),
    transformer: (0, utils_1.datetimeWithoutTimezoneTransformer)(),
};
//# sourceMappingURL=datetime-without-tz-column-type.constant.js.map
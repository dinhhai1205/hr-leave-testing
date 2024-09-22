"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTION_TYPE_PERCENTAGE_TABLE = void 0;
const enums_1 = require("../enums");
exports.ACTION_TYPE_PERCENTAGE_TABLE = {
    [enums_1.DocumentActionType.Sign]: {
        [enums_1.DocumentActionStatus.NoAction]: 0,
        [enums_1.DocumentActionStatus.Unopened]: 0.33,
        [enums_1.DocumentActionStatus.Viewed]: 0.66,
        [enums_1.DocumentActionStatus.Signed]: 1,
        [enums_1.DocumentActionStatus.Declined]: 1,
    },
    [enums_1.DocumentActionType.InPerson]: {
        [enums_1.DocumentActionStatus.NoAction]: 0,
        [enums_1.DocumentActionStatus.Unopened]: 0.33,
        [enums_1.DocumentActionStatus.Viewed]: 0.66,
        [enums_1.DocumentActionStatus.Signed]: 1,
        [enums_1.DocumentActionStatus.Declined]: 1,
    },
    [enums_1.DocumentActionType.Approver]: {
        [enums_1.DocumentActionStatus.NoAction]: 0,
        [enums_1.DocumentActionStatus.Unopened]: 0.33,
        [enums_1.DocumentActionStatus.Viewed]: 0.66,
        [enums_1.DocumentActionStatus.Approved]: 1,
        [enums_1.DocumentActionStatus.Declined]: 1,
    },
    [enums_1.DocumentActionType.View]: {
        [enums_1.DocumentActionStatus.NoAction]: 0,
        [enums_1.DocumentActionStatus.Unopened]: 0.5,
        [enums_1.DocumentActionStatus.Viewed]: 1,
    },
};
//# sourceMappingURL=action-type-percentage-table.constant.js.map
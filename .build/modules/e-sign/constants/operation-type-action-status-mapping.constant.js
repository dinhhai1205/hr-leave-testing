"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPERATION_TYPE_ACTION_STATUS_MAPPING = void 0;
const enums_1 = require("../enums");
exports.OPERATION_TYPE_ACTION_STATUS_MAPPING = {
    [enums_1.DocumentOperationType.RequestViewed]: enums_1.DocumentActionStatus.Viewed,
    [enums_1.DocumentOperationType.RequestApproved]: enums_1.DocumentActionStatus.Approved,
    [enums_1.DocumentOperationType.RequestSigningSuccess]: enums_1.DocumentActionStatus.Signed,
    [enums_1.DocumentOperationType.RequestRejected]: enums_1.DocumentActionStatus.Declined,
};
//# sourceMappingURL=operation-type-action-status-mapping.constant.js.map
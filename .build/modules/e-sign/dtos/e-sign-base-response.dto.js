"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESignBaseResponseDto = void 0;
const enums_1 = require("../../../common/enums");
const utils_1 = require("../../../common/utils");
const enums_2 = require("../enums");
class ESignBaseResponseDto {
    constructor(args) {
        const { data, operationType: operationEnumKey } = args;
        const { companyId, documentId, documentName, documentStatus, performedByEmail, activity, ipAddress, longitude, latitude, } = data;
        const operationType = enums_2.DocumentOperationType[operationEnumKey];
        this.companyId = companyId;
        this.documentId = documentId;
        this.documentName = documentName;
        this.documentStatus = documentStatus;
        this.activity =
            activity ||
                `Document has been ${(0, utils_1.getTrailingWords)(operationType).toLowerCase()}`;
        this.operationType = operationType;
        this.data = data;
        this.performedByEmail = performedByEmail || enums_1.EDefaultEmail.SYSTEM_GENERATED;
        this.ipAddress = ipAddress || '127.0.0.1';
        this.longitude = longitude || '0';
        this.latitude = latitude || '0';
    }
}
exports.ESignBaseResponseDto = ESignBaseResponseDto;
//# sourceMappingURL=e-sign-base-response.dto.js.map
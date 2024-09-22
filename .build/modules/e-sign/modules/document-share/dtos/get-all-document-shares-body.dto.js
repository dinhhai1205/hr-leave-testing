"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllDocumentSharesBodyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const get_all_document_shares_payload_dto_1 = require("./get-all-document-shares-payload.dto");
class GetAllDocumentSharesBodyDto extends (0, swagger_1.OmitType)(get_all_document_shares_payload_dto_1.GetAllDocumentSharesPayloadDto, ['companyId', 'userEmail']) {
}
exports.GetAllDocumentSharesBodyDto = GetAllDocumentSharesBodyDto;
//# sourceMappingURL=get-all-document-shares-body.dto.js.map
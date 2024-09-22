"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDocumentShareBodyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_document_share_payload_dto_1 = require("./create-document-share-payload.dto");
class CreateDocumentShareBodyDto extends (0, swagger_1.PickType)(create_document_share_payload_dto_1.CreateDocumentSharePayloadDto, ['notes', 'sharedWithEmail']) {
}
exports.CreateDocumentShareBodyDto = CreateDocumentShareBodyDto;
//# sourceMappingURL=create-document-share-body.dto.js.map
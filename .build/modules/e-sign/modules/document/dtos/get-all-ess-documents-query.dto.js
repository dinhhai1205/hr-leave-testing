"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllEssDocumentsQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const get_all_documents_query_dto_1 = require("./get-all-documents-query.dto");
class GetAllEssDocumentsQueryDto extends (0, swagger_1.OmitType)(get_all_documents_query_dto_1.GetAllDocumentsQueryDto, ['queryRecipients', 'queryOwner']) {
}
exports.GetAllEssDocumentsQueryDto = GetAllEssDocumentsQueryDto;
//# sourceMappingURL=get-all-ess-documents-query.dto.js.map
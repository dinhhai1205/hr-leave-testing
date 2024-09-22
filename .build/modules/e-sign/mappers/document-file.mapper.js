"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentFileMapper = void 0;
const moment = require("moment");
const entities_1 = require("../../../core/database/entities");
class DocumentFileMapper {
    static fromTemplate(documentId, userEmail, documentTemplate, copySourceBucket) {
        const { companyId, documentFiles, id: documentTemplateId, } = documentTemplate;
        const commonResult = { fileDtos: [], copySourceKeys: [] };
        if (!documentFiles.length)
            return commonResult;
        for (const fileTemplate of documentFiles) {
            const documentFileEntity = new entities_1.DocumentFileEntity();
            documentFileEntity.companyId = companyId;
            documentFileEntity.documentId = documentId;
            documentFileEntity.name = fileTemplate.name;
            documentFileEntity.size = fileTemplate.size;
            documentFileEntity.order = fileTemplate.order;
            documentFileEntity.imageString = fileTemplate.imageString;
            documentFileEntity.originalname = fileTemplate.originalname;
            documentFileEntity.createdBy = userEmail;
            documentFileEntity.createdOn = moment.utc().toDate();
            documentFileEntity.isDeleted = false;
            commonResult.fileDtos.push(documentFileEntity);
            commonResult.copySourceKeys.push(copySourceBucket +
                `/${companyId}` +
                `/${documentTemplateId}` +
                `/${fileTemplate.id}.pdf`);
        }
        return commonResult;
    }
}
exports.DocumentFileMapper = DocumentFileMapper;
//# sourceMappingURL=document-file.mapper.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentMapper = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const utils_1 = require("../../../common/utils");
const entities_1 = require("../../../core/database/entities");
const enums_1 = require("../enums");
const zoho_1 = require("../libs/zoho");
const document_action_mapper_1 = require("./document-action.mapper");
class DocumentMapper {
    static toZohoRequest(document) {
        if (!document) {
            throw new common_1.BadRequestException(`Document is empty`);
        }
        if (!document?.documentActions.length) {
            throw new common_1.BadRequestException(`At least one action is required`);
        }
        const { name, isSequential, expirationDays, validity, description, emailReminders, reminderPeriod, notes, documentActions, companyId, id: documentId, isBulk, bulkActions = [], } = document;
        const zohoRequestDto = new zoho_1.ZohoRequestDto();
        zohoRequestDto.request_name = `${companyId}-${documentId}-${name}`;
        zohoRequestDto.is_sequential = isSequential ?? true;
        zohoRequestDto.expiration_days = expirationDays || 15;
        zohoRequestDto.validity = validity || -1;
        zohoRequestDto.description = description || '';
        zohoRequestDto.email_reminders = emailReminders ?? true;
        zohoRequestDto.reminder_period = reminderPeriod || 5;
        zohoRequestDto.notes = notes || '';
        zohoRequestDto.is_bulk = isBulk ?? false;
        if (zohoRequestDto.is_bulk === true) {
            const bulkActionsParsed = typeof bulkActions === 'string'
                ? (0, utils_1.safeJsonParse)({ text: bulkActions, defaultValueReturn: [] })
                : bulkActions;
            const bulkActionsSnakeCase = (0, utils_1.convertObjectKeyToSnakeCase)(bulkActionsParsed);
            zohoRequestDto.bulk_actions = bulkActionsSnakeCase || [];
        }
        zohoRequestDto.actions = documentActions.map(action => document_action_mapper_1.DocumentActionMapper.toZohoRequestAction(action));
        return zohoRequestDto;
    }
    static fromTemplate(userEmail, documentTemplate, customTemplatePayload = {}) {
        const { companyId, id: documentTemplateId } = documentTemplate;
        const documentEntity = new entities_1.DocumentEntity();
        documentEntity.owner = userEmail;
        documentEntity.companyId = companyId;
        documentEntity.documentTemplateId = documentTemplateId;
        documentEntity.status = enums_1.DocumentStatus.Draft;
        documentEntity.isSequential = documentTemplate.isSequential;
        documentEntity.expirationDays = documentTemplate.expirationDays;
        documentEntity.validity = documentTemplate.validity;
        documentEntity.description = documentTemplate.description;
        documentEntity.emailReminders = documentTemplate.emailReminders;
        documentEntity.documentTypeId = documentTemplate.documentTypeId;
        documentEntity.name =
            customTemplatePayload.documentName || documentTemplate.name;
        documentEntity.folderId =
            customTemplatePayload.folderId || documentTemplate.folderId;
        documentEntity.notes =
            customTemplatePayload.notes || documentTemplate.notes;
        documentEntity.createdBy = userEmail;
        documentEntity.createdOn = moment.utc().toDate();
        documentEntity.isDeleted = false;
        return documentEntity;
    }
}
exports.DocumentMapper = DocumentMapper;
//# sourceMappingURL=document.mapper.js.map
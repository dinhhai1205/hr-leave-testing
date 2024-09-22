"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZohoWebhookService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const enums_1 = require("../../enums");
const zoho_1 = require("../../libs/zoho");
const document_1 = require("../../modules/document");
const document_action_service_1 = require("../document-action/document-action.service");
const document_audit_1 = require("../document-audit");
const document_audit_interceptor_1 = require("../document-audit/document-audit.interceptor");
const services_1 = require("../document-file/services");
let ZohoWebhookService = class ZohoWebhookService {
    constructor(documentService, documentFileService, documentActionService, documentAuditService) {
        this.documentService = documentService;
        this.documentFileService = documentFileService;
        this.documentActionService = documentActionService;
        this.documentAuditService = documentAuditService;
    }
    async receiveMessage(zohoWebHookPayload) {
        const { requests, notifications } = zohoWebHookPayload;
        const { request_id, request_status: requestStatus, document_ids: zohoFilesPayload, } = requests;
        const { action_id: zohoActionId, activity, operation_type: operationType, ip_address: ipAddress, latitude, longitude, performed_by_email: performedByEmail, reason, } = notifications;
        const currentDate = moment.utc().toDate();
        const document = await this.documentService.getDocumentById({ companyId: 0, documentId: 0, requestId: request_id }, {
            calculateSignPercentage: false,
            joinDocumentAction: true,
            joinDocumentFile: true,
            joinDocumentType: false,
            joinFolder: false,
        });
        const { documentActions, companyId, id: documentId, name: documentName, } = document;
        let updatedAction = null;
        if (zohoActionId) {
            const documentActionTable = documentActions.reduce((table, action) => {
                table[action.zohoActionId] = action;
                return table;
            }, {});
            const documentAction = documentActionTable[zohoActionId];
            if (!documentAction) {
                throw new common_1.NotFoundException(`Not found action with is ${zohoActionId}`);
            }
            if (operationType === enums_1.DocumentOperationType.RequestViewed ||
                operationType === enums_1.DocumentOperationType.RequestApproved ||
                operationType === enums_1.DocumentOperationType.RequestSigningSuccess ||
                operationType === enums_1.DocumentOperationType.RequestRejected) {
                updatedAction =
                    await this.documentActionService.updateDocumentActionStatusFromZohoWebhook(document, documentAction, operationType, requestStatus, performedByEmail, currentDate);
            }
        }
        let updatedDocumentFile = null;
        if (operationType === enums_1.DocumentOperationType.RequestSigningSuccess ||
            operationType === enums_1.DocumentOperationType.RequestCompleted) {
            updatedDocumentFile =
                await this.documentFileService.updateMultiDocumentFileFromZohoWebhook(companyId, documentId, request_id, zohoFilesPayload, operationType);
        }
        let updatedDocumentStatus = null;
        if (operationType === enums_1.DocumentOperationType.RequestCompleted ||
            operationType === enums_1.DocumentOperationType.RequestExpired ||
            operationType === enums_1.DocumentOperationType.RequestRejected) {
            updatedDocumentStatus =
                await this.documentService.updateDocumentStatusFromZohoWebhook(operationType, requestStatus, document, performedByEmail, currentDate, reason);
        }
        const data = {
            updatedAction,
            updatedDocumentFile,
            updatedDocumentStatus,
        };
        await this.documentAuditService.createDocumentAudit({
            activity,
            companyId,
            documentId,
            documentStatus: requestStatus,
            documentName,
            ipAddress,
            latitude: `${latitude}`,
            longitude: `${longitude}`,
            operationType,
            userEmail: performedByEmail,
            data: JSON.stringify(data),
            payload: JSON.stringify(zohoWebHookPayload),
        });
    }
};
exports.ZohoWebhookService = ZohoWebhookService;
__decorate([
    (0, common_1.UseInterceptors)(document_audit_interceptor_1.DocumentAuditInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [zoho_1.ZohoWebHooKPayload]),
    __metadata("design:returntype", Promise)
], ZohoWebhookService.prototype, "receiveMessage", null);
exports.ZohoWebhookService = ZohoWebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_1.DocumentService,
        services_1.DocumentFileService,
        document_action_service_1.DocumentActionService,
        document_audit_1.DocumentAuditService])
], ZohoWebhookService);
//# sourceMappingURL=zoho-webhook.service.js.map
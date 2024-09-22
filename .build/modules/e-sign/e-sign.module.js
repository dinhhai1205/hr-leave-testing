"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESignModule = void 0;
const common_1 = require("@nestjs/common");
const company_e_sign_document_no_module_1 = require("./modules/company-e-sign-document-no/company-e-sign-document-no.module");
const document_action_field_1 = require("./modules/document-action-field");
const document_action_module_1 = require("./modules/document-action/document-action.module");
const document_audit_1 = require("./modules/document-audit");
const document_share_module_1 = require("./modules/document-share/document-share.module");
const document_template_1 = require("./modules/document-template");
const document_type_module_1 = require("./modules/document-type/document-type.module");
const document_module_1 = require("./modules/document/document.module");
const field_type_module_1 = require("./modules/field-type/field-type.module");
const folder_module_1 = require("./modules/folder/folder.module");
const zoho_webhook_module_1 = require("./modules/zoho-webhook/zoho-webhook.module");
let ESignModule = class ESignModule {
};
exports.ESignModule = ESignModule;
exports.ESignModule = ESignModule = __decorate([
    (0, common_1.Module)({
        imports: [
            document_type_module_1.DocumentTypeModule,
            folder_module_1.FolderModule,
            document_action_module_1.DocumentActionModule,
            field_type_module_1.FieldTypeModule,
            document_module_1.DocumentModule,
            document_audit_1.DocumentAuditModule,
            document_action_field_1.DocumentActionFieldModule,
            company_e_sign_document_no_module_1.CompanyESignDocumentNoModule,
            document_share_module_1.DocumentShareModule,
            zoho_webhook_module_1.ZohoWebhookModule,
            document_template_1.DocumentTemplateModule,
        ],
    })
], ESignModule);
//# sourceMappingURL=e-sign.module.js.map
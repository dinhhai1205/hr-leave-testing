"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZohoWebhookModule = void 0;
const common_1 = require("@nestjs/common");
const aws_1 = require("../../../../libs/aws");
const document_audit_1 = require("../../modules/document-audit");
const document_action_module_1 = require("../document-action/document-action.module");
const document_file_module_1 = require("../document-file/document-file.module");
const document_module_1 = require("../document/document.module");
const zoho_webhook_controller_1 = require("./zoho-webhook.controller");
const zoho_webhook_service_1 = require("./zoho-webhook.service");
let ZohoWebhookModule = class ZohoWebhookModule {
};
exports.ZohoWebhookModule = ZohoWebhookModule;
exports.ZohoWebhookModule = ZohoWebhookModule = __decorate([
    (0, common_1.Module)({
        imports: [
            document_module_1.DocumentModule,
            document_action_module_1.DocumentActionModule,
            document_file_module_1.DocumentFileModule.forFeature({
                bucketName: aws_1.EAwsS3BucketServiceName.UserObjectsPrivate,
                objectKeyPrefix: aws_1.AWS_S3_MODULE_FOLDER_NAME.E_SIGN_DOCUMENT_FILE,
            }),
            document_audit_1.DocumentAuditModule,
        ],
        providers: [zoho_webhook_service_1.ZohoWebhookService],
        controllers: [zoho_webhook_controller_1.ZohoWebhookController],
    })
], ZohoWebhookModule);
//# sourceMappingURL=zoho-webhook.module.js.map
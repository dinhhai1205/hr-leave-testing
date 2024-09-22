"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("../../../../config");
const document_entity_1 = require("../../../../core/database/entities/document.entity");
const aws_1 = require("../../../../libs/aws");
const zoho_1 = require("../../libs/zoho");
const document_audit_1 = require("../../modules/document-audit");
const document_action_module_1 = require("../document-action/document-action.module");
const document_file_module_1 = require("../document-file/document-file.module");
const document_controller_1 = require("./controllers/document.controller");
const ess_document_controller_1 = require("./controllers/ess-document.controller");
const document_subscriber_1 = require("./document.subscriber");
const document_service_1 = require("./services/document.service");
const ess_document_service_1 = require("./services/ess-document.service");
let DocumentModule = class DocumentModule {
};
exports.DocumentModule = DocumentModule;
exports.DocumentModule = DocumentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([document_entity_1.DocumentEntity]),
            document_file_module_1.DocumentFileModule.forFeature({
                bucketName: aws_1.EAwsS3BucketServiceName.UserObjectsPrivate,
                objectKeyPrefix: aws_1.AWS_S3_MODULE_FOLDER_NAME.E_SIGN_DOCUMENT_FILE,
            }),
            config_1.ConfigModule.forFeature(config_2.databaseConfig),
            document_action_module_1.DocumentActionModule,
            zoho_1.ZohoModule,
            document_audit_1.DocumentAuditModule,
        ],
        providers: [document_service_1.DocumentService, document_subscriber_1.DocumentSubscriber, ess_document_service_1.EssDocumentService],
        controllers: [document_controller_1.DocumentController, ess_document_controller_1.EssDocumentController],
        exports: [document_service_1.DocumentService],
    })
], DocumentModule);
//# sourceMappingURL=document.module.js.map
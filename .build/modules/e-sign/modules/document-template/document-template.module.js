"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../../../core/database/entities");
const aws_1 = require("../../../../libs/aws");
const document_1 = require("../../modules/document");
const document_action_module_1 = require("../document-action/document-action.module");
const document_file_module_1 = require("../document-file/document-file.module");
const document_template_controller_1 = require("./controllers/document-template.controller");
const document_template_service_1 = require("./document-template.service");
let DocumentTemplateModule = class DocumentTemplateModule {
};
exports.DocumentTemplateModule = DocumentTemplateModule;
exports.DocumentTemplateModule = DocumentTemplateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.DocumentTemplateEntity]),
            document_1.DocumentModule,
            document_file_module_1.DocumentFileModule.forFeature({
                bucketName: aws_1.EAwsS3BucketServiceName.UserObjectsPrivate,
                objectKeyPrefix: aws_1.AWS_S3_MODULE_FOLDER_NAME.E_SIGN_DOCUMENT_TEMPLATE,
            }),
            document_action_module_1.DocumentActionModule,
        ],
        providers: [document_template_service_1.DocumentTemplateService],
        controllers: [document_template_controller_1.DocumentTemplateController],
    })
], DocumentTemplateModule);
//# sourceMappingURL=document-template.module.js.map
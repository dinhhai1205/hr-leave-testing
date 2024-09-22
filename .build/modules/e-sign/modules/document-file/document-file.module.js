"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DocumentFileModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentFileModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const document_file_entity_1 = require("../../../../core/database/entities/document-file.entity");
const aws_1 = require("../../../../libs/aws");
const docx_to_pdf_1 = require("../../libs/docx-to-pdf");
const image_transform_1 = require("../../libs/image-transform");
const pdf_1 = require("../../libs/pdf");
const pdf_to_image_1 = require("../../libs/pdf-to-image");
const zip_1 = require("../../libs/zip");
const zoho_1 = require("../../libs/zoho");
const document_audit_1 = require("../../modules/document-audit");
const document_file_controller_1 = require("./controllers/document-file.controller");
const document_file_config_factory_1 = require("./document-file-config.factory");
const document_file_provider_1 = require("./document-file.provider");
const document_file_service_1 = require("./services/document-file.service");
let DocumentFileModule = DocumentFileModule_1 = class DocumentFileModule {
    static forFeature(options = {}) {
        return {
            module: DocumentFileModule_1,
            imports: [
                typeorm_1.TypeOrmModule.forFeature([document_file_entity_1.DocumentFileEntity]),
                image_transform_1.ImageTransformModule,
                pdf_to_image_1.PdfToImageModule,
                docx_to_pdf_1.DocxToPdfModule,
                zip_1.ZipModule,
                zoho_1.ZohoModule,
                pdf_1.PdfModule,
                document_audit_1.DocumentAuditModule,
                aws_1.AwsS3Module.registerAsync({
                    provideInjectionTokensFrom: [
                        ...(0, document_file_provider_1.createDocumentFileProvider)(options),
                        document_file_config_factory_1.DocumentFileConfigFactory,
                    ],
                    useClass: document_file_config_factory_1.DocumentFileConfigFactory,
                }),
            ],
            providers: [document_file_service_1.DocumentFileService],
            controllers: [document_file_controller_1.DocumentFileController],
            exports: [document_file_service_1.DocumentFileService],
        };
    }
};
exports.DocumentFileModule = DocumentFileModule;
exports.DocumentFileModule = DocumentFileModule = DocumentFileModule_1 = __decorate([
    (0, common_1.Module)({})
], DocumentFileModule);
//# sourceMappingURL=document-file.module.js.map
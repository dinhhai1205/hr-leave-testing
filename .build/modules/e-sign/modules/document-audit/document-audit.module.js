"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentAuditModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const document_audit_entity_1 = require("../../../../core/database/entities/document-audit.entity");
const document_audit_interceptor_1 = require("../../modules/document-audit/document-audit.interceptor");
const document_audit_controller_1 = require("./document-audit.controller");
const document_audit_service_1 = require("./document-audit.service");
let DocumentAuditModule = class DocumentAuditModule {
};
exports.DocumentAuditModule = DocumentAuditModule;
exports.DocumentAuditModule = DocumentAuditModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([document_audit_entity_1.DocumentAuditEntity])],
        controllers: [document_audit_controller_1.DocumentAuditController],
        providers: [document_audit_service_1.DocumentAuditService, document_audit_interceptor_1.DocumentAuditInterceptor],
        exports: [document_audit_service_1.DocumentAuditService],
    })
], DocumentAuditModule);
//# sourceMappingURL=document-audit.module.js.map
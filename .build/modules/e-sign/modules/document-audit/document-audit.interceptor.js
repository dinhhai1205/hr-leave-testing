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
exports.DocumentAuditInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const utils_1 = require("../../../../common/utils");
const document_audit_service_1 = require("./document-audit.service");
let DocumentAuditInterceptor = class DocumentAuditInterceptor {
    constructor(documentAuditService) {
        this.documentAuditService = documentAuditService;
    }
    intercept(context, next) {
        const bodyPayload = context.switchToHttp().getRequest().body || {};
        return next.handle().pipe((0, rxjs_1.map)(async (eSignBaseResponseDto) => {
            const { operationType, activity, companyId, documentId, documentName, documentStatus, performedByEmail, ipAddress, latitude, longitude, } = eSignBaseResponseDto;
            const data = (0, utils_1.overrideBufferProperties)(structuredClone(eSignBaseResponseDto?.data ?? {}), '(buffer data)');
            const payload = (0, utils_1.overrideBufferProperties)(structuredClone(bodyPayload), '(buffer data)');
            await this.documentAuditService.createDocumentAudit({
                activity,
                companyId,
                documentId,
                documentStatus,
                operationType,
                documentName,
                userEmail: performedByEmail,
                ipAddress,
                longitude,
                latitude,
                payload: JSON.stringify(payload),
                data: JSON.stringify(data),
            });
            return eSignBaseResponseDto.data;
        }), (0, rxjs_1.catchError)(err => (0, rxjs_1.throwError)(() => err)), (0, rxjs_1.defaultIfEmpty)([]));
    }
};
exports.DocumentAuditInterceptor = DocumentAuditInterceptor;
exports.DocumentAuditInterceptor = DocumentAuditInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_audit_service_1.DocumentAuditService])
], DocumentAuditInterceptor);
//# sourceMappingURL=document-audit.interceptor.js.map
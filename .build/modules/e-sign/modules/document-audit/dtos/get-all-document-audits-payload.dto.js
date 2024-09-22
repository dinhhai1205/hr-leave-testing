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
exports.GetAllDocumentAuditsPayloadDto = void 0;
const class_validator_1 = require("class-validator");
const get_all_document_audits_query_dto_1 = require("./get-all-document-audits-query.dto");
class GetAllDocumentAuditsPayloadDto extends get_all_document_audits_query_dto_1.GetAllDocumentAuditsQueryDto {
}
exports.GetAllDocumentAuditsPayloadDto = GetAllDocumentAuditsPayloadDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetAllDocumentAuditsPayloadDto.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetAllDocumentAuditsPayloadDto.prototype, "documentId", void 0);
//# sourceMappingURL=get-all-document-audits-payload.dto.js.map
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
exports.RecallDocumentPayload = void 0;
const class_validator_1 = require("class-validator");
const get_document_by_id_payload_dto_1 = require("./get-document-by-id-payload.dto");
const swagger_1 = require("@nestjs/swagger");
class RecallDocumentPayload extends get_document_by_id_payload_dto_1.GetDocumentByIdPayloadDto {
}
exports.RecallDocumentPayload = RecallDocumentPayload;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RecallDocumentPayload.prototype, "userEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The reason for recalling the document' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecallDocumentPayload.prototype, "reason", void 0);
//# sourceMappingURL=recall-document-payload.dto.js.map
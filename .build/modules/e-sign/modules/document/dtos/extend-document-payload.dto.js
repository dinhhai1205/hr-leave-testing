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
exports.ExtendDocumentPayloadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const get_document_by_id_payload_dto_1 = require("./get-document-by-id-payload.dto");
const extend_document_body_dto_1 = require("./extend-document-body.dto");
const class_validator_1 = require("class-validator");
class ExtendDocumentPayloadDto extends (0, swagger_1.IntersectionType)(get_document_by_id_payload_dto_1.GetDocumentByIdPayloadDto, extend_document_body_dto_1.ExtendDocumentBodyDto) {
}
exports.ExtendDocumentPayloadDto = ExtendDocumentPayloadDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ExtendDocumentPayloadDto.prototype, "userEmail", void 0);
//# sourceMappingURL=extend-document-payload.dto.js.map
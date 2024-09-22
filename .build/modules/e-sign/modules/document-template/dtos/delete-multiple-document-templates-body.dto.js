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
exports.DeleteMultipleDocumentTemplatesBodyDto = void 0;
const decorators_1 = require("../../../../../common/decorators");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DeleteMultipleDocumentTemplatesBodyDto {
}
exports.DeleteMultipleDocumentTemplatesBodyDto = DeleteMultipleDocumentTemplatesBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true }),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.Min)(1, { each: true }),
    (0, decorators_1.IsNotEmptyArray)(),
    (0, class_validator_1.ArrayUnique)(),
    __metadata("design:type", Array)
], DeleteMultipleDocumentTemplatesBodyDto.prototype, "documentTemplateIds", void 0);
//# sourceMappingURL=delete-multiple-document-templates-body.dto.js.map
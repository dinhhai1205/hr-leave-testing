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
exports.LeaveAttachmentQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../../../common/enums");
class LeaveAttachmentQueryDto {
    constructor() {
        this.fileNames = [];
        this.isSelectAll = 'false';
    }
}
exports.LeaveAttachmentQueryDto = LeaveAttachmentQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123 }),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], LeaveAttachmentQueryDto.prototype, "leaveId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cat.jpg' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LeaveAttachmentQueryDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cat.jpg,cow.jpg,dog.jpg' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], LeaveAttachmentQueryDto.prototype, "fileNames", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'true',
        default: 'false',
        type: String,
        enum: enums_1.EBoolean,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LeaveAttachmentQueryDto.prototype, "isSelectAll", void 0);
//# sourceMappingURL=leave-attachment-query.dto.js.map
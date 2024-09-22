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
exports.AzureSSODto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AzureSSODto {
}
exports.AzureSSODto = AzureSSODto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    __metadata("design:type", Number)
], AzureSSODto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], AzureSSODto.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], AzureSSODto.prototype, "enable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://login.microsoftonline.com/9f4df3ad-aba6-492a-90b7-e618cb4ca88c/federationmetadata/2007-06/federationmetadata.xml?appid=718b4922-7ac2-4100-dddd-b31c36932529',
    }),
    __metadata("design:type", String)
], AzureSSODto.prototype, "metadataUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-04-13T02:41:31.087Z' }),
    __metadata("design:type", Date)
], AzureSSODto.prototype, "createdOn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-04-13T02:41:31.087Z' }),
    __metadata("design:type", Object)
], AzureSSODto.prototype, "updatedOn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AzureSSODto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AzureSSODto.prototype, "updatedBy", void 0);
//# sourceMappingURL=azure-sso.dto.js.map
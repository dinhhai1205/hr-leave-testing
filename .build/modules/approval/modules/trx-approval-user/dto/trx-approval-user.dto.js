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
exports.TrxApprovalUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const abstract_dto_1 = require("../../../../../common/dto/abstract.dto");
const asp_net_users_dto_1 = require("../../../../user/modules/asp-net-users/dto/asp-net-users.dto");
class TrxApprovalUserDto extends abstract_dto_1.AbstractDto {
}
exports.TrxApprovalUserDto = TrxApprovalUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    __metadata("design:type", Number)
], TrxApprovalUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    __metadata("design:type", Number)
], TrxApprovalUserDto.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    __metadata("design:type", Number)
], TrxApprovalUserDto.prototype, "moduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], TrxApprovalUserDto.prototype, "recordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], TrxApprovalUserDto.prototype, "approverLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@email.com' }),
    __metadata("design:type", String)
], TrxApprovalUserDto.prototype, "userEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-04-13T02:41:31.087Z' }),
    __metadata("design:type", String)
], TrxApprovalUserDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", asp_net_users_dto_1.AspNetUsersDto)
], TrxApprovalUserDto.prototype, "aspUser", void 0);
//# sourceMappingURL=trx-approval-user.dto.js.map
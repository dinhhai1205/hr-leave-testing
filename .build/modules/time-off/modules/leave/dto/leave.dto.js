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
exports.LeaveDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const abstract_dto_1 = require("../../../../../common/dto/abstract.dto");
const enums_1 = require("../../../../../common/enums");
const company_1 = require("../../../../general/modules/company");
const employee_dto_1 = require("../../../../user/modules/employee/dto/employee.dto");
const leave_type_dto_1 = require("../../leave-type/dto/leave-type.dto");
class LeaveDto extends abstract_dto_1.AbstractDto {
}
exports.LeaveDto = LeaveDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    __metadata("design:type", Number)
], LeaveDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    __metadata("design:type", Number)
], LeaveDto.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    __metadata("design:type", Number)
], LeaveDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    __metadata("design:type", Number)
], LeaveDto.prototype, "leaveTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    __metadata("design:type", String)
], LeaveDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Leave reason' }),
    __metadata("design:type", String)
], LeaveDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ELeaveStatusId, example: enums_1.ELeaveStatusId.DRAFT }),
    __metadata("design:type", Number)
], LeaveDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-04-13T02:41:31.087Z' }),
    __metadata("design:type", Date)
], LeaveDto.prototype, "dateFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-04-13T02:41:31.087Z' }),
    __metadata("design:type", Date)
], LeaveDto.prototype, "dateTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", company_1.CompanyDto)
], LeaveDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", employee_dto_1.EmployeeDto)
], LeaveDto.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", leave_type_dto_1.LeaveTypeDto)
], LeaveDto.prototype, "leaveType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], LeaveDto.prototype, "approverTrx", void 0);
//# sourceMappingURL=leave.dto.js.map
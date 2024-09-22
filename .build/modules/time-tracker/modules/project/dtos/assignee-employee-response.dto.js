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
exports.AssigneeEmployeeResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_entity_response_dto_1 = require("../../../common/dtos/base-entity-response.dto");
const project_response_dto_1 = require("./project-response.dto");
const employee_entity_1 = require("../../employee/employee.entity");
class AssigneeEmployeeResponseDto extends base_entity_response_dto_1.BaseEntityResponseDto {
}
exports.AssigneeEmployeeResponseDto = AssigneeEmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], AssigneeEmployeeResponseDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], AssigneeEmployeeResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", project_response_dto_1.ProjectResponseDto)
], AssigneeEmployeeResponseDto.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], AssigneeEmployeeResponseDto.prototype, "employee", void 0);
//# sourceMappingURL=assignee-employee-response.dto.js.map
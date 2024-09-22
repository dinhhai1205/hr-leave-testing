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
exports.AssigneeGroupResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../../../../time-tracker/common/dtos");
const group_response_dto_1 = require("../../group/dtos/group-response.dto");
const project_response_dto_1 = require("./project-response.dto");
class AssigneeGroupResponseDto extends dtos_1.BaseEntityResponseDto {
}
exports.AssigneeGroupResponseDto = AssigneeGroupResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], AssigneeGroupResponseDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], AssigneeGroupResponseDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", group_response_dto_1.GroupResponseDto)
], AssigneeGroupResponseDto.prototype, "group", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", project_response_dto_1.ProjectResponseDto)
], AssigneeGroupResponseDto.prototype, "project", void 0);
//# sourceMappingURL=assignee-group-response.dto.js.map
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
exports.PaginationGroupMembersQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_query_dto_1 = require("../../../common/dtos/pagination-query.dto");
class PaginationGroupMembersQueryDto extends pagination_query_dto_1.PaginationQueryDto {
    constructor() {
        super(...arguments);
        this.workScheduleIds = [];
    }
}
exports.PaginationGroupMembersQueryDto = PaginationGroupMembersQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ isArray: true, type: String }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PaginationGroupMembersQueryDto.prototype, "workScheduleIds", void 0);
//# sourceMappingURL=pagination-group-member-query.dto.js.map
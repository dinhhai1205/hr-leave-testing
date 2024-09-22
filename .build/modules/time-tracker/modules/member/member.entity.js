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
exports.MemberEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const group_entity_1 = require("../group/group.entity");
const employee_entity_1 = require("../employee/employee.entity");
const common_1 = require("../../common");
let MemberEntity = class MemberEntity extends base_entity_1.BaseTimeTrackerEntity {
};
exports.MemberEntity = MemberEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MemberEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MemberEntity.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MemberEntity.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: common_1.RoleGroup.Member }),
    __metadata("design:type", String)
], MemberEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.GroupEntity),
    (0, typeorm_1.JoinColumn)({ name: 'group_id' }),
    __metadata("design:type", group_entity_1.GroupEntity)
], MemberEntity.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.EmployeeEntity),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], MemberEntity.prototype, "employee", void 0);
exports.MemberEntity = MemberEntity = __decorate([
    (0, typeorm_1.Entity)()
], MemberEntity);
//# sourceMappingURL=member.entity.js.map
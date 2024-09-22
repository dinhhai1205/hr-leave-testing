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
exports.GroupEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const member_entity_1 = require("../member/member.entity");
const database_1 = require("../../../../core/database");
let GroupEntity = class GroupEntity extends base_entity_1.BaseTimeTrackerEntity {
};
exports.GroupEntity = GroupEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GroupEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GroupEntity.prototype, "workScheduleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GroupEntity.prototype, "holidayPolicyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GroupEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GroupEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GroupEntity.prototype, "groupPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GroupEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: (0, database_1.columnType)('BOOLEAN'),
        default: (0, database_1.defaultColumn)({ columnType: 'BOOLEAN', value: true }),
        nullable: true,
    }),
    __metadata("design:type", Boolean)
], GroupEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => GroupEntity, group => group.subGroups),
    __metadata("design:type", GroupEntity)
], GroupEntity.prototype, "parentGroup", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => GroupEntity, group => group.parentGroup),
    __metadata("design:type", Array)
], GroupEntity.prototype, "subGroups", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => member_entity_1.MemberEntity, member => member.group),
    __metadata("design:type", Array)
], GroupEntity.prototype, "members", void 0);
exports.GroupEntity = GroupEntity = __decorate([
    (0, typeorm_1.Entity)()
], GroupEntity);
//# sourceMappingURL=group.entity.js.map
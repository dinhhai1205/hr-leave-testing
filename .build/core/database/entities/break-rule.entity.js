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
exports.BreakRuleEntity = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("../../../modules/time-tracker/common");
const enums_1 = require("../enums");
const base_app_entity_1 = require("./base-app.entity");
const work_schedule_entity_1 = require("./work-schedule.entity");
let BreakRuleEntity = class BreakRuleEntity extends base_app_entity_1.BaseAppEntity {
};
exports.BreakRuleEntity = BreakRuleEntity;
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BreakRuleEntity.prototype, "ttBreakRuleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BreakRuleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'allow_taken_from_to',
    }),
    __metadata("design:type", Boolean)
], BreakRuleEntity.prototype, "allowToBeTakenFromTo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BreakRuleEntity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true,
    }),
    __metadata("design:type", String)
], BreakRuleEntity.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true,
    }),
    __metadata("design:type", String)
], BreakRuleEntity.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'unit_time',
        default: common_1.UnitTime.MINUTE,
        enum: common_1.UnitTime,
    }),
    __metadata("design:type", String)
], BreakRuleEntity.prototype, "unitTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_schedule_entity_1.WorkScheduleEntity, workSchedule => workSchedule.breaks),
    (0, typeorm_1.JoinColumn)({ name: 'work_schedule_id' }),
    __metadata("design:type", work_schedule_entity_1.WorkScheduleEntity)
], BreakRuleEntity.prototype, "workSchedule", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], BreakRuleEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], BreakRuleEntity.prototype, "workScheduleId", void 0);
exports.BreakRuleEntity = BreakRuleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.BREAK })
], BreakRuleEntity);
//# sourceMappingURL=break-rule.entity.js.map
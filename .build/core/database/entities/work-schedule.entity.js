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
exports.WorkScheduleEntity = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("../../../modules/time-tracker/common");
const work_schedule_state_enum_1 = require("../../../modules/time-tracker/modules/work-schedule/enums/work-schedule-state.enum");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const auto_deduction_entity_1 = require("./auto-deduction.entity");
const base_app_entity_1 = require("./base-app.entity");
const break_rule_entity_1 = require("./break-rule.entity");
const day_schedule_entity_1 = require("./day-schedule.entity");
const employee_entity_1 = require("./employee.entity");
const location_work_schedule_entity_1 = require("./location-work-schedule.entity");
const organization_structure_entity_1 = require("./organization-structure.entity");
const work_schedule_tag_entity_1 = require("./work-schedule-tag.entity");
const work_schedule_publish_type_enum_1 = require("../../../modules/time-tracker/modules/work-schedule/enums/work-schedule-publish-type.enum");
const work_schedule_assignment_entity_1 = require("./work-schedule-assignment.entity");
let WorkScheduleEntity = class WorkScheduleEntity extends base_app_entity_1.BaseAppEntity {
    constructor() {
        super(...arguments);
        this.publishHistories = [];
        this.assignees = {};
        this.groupAssignees = {};
    }
};
exports.WorkScheduleEntity = WorkScheduleEntity;
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WorkScheduleEntity.prototype, "ttWorkScheduleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkScheduleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, nullable: true }),
    __metadata("design:type", Number)
], WorkScheduleEntity.prototype, "utcOffset", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_arrangement', enum: common_1.WorkArrangement }),
    __metadata("design:type", String)
], WorkScheduleEntity.prototype, "workArrangement", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'break_type', enum: common_1.BreakType }),
    __metadata("design:type", String)
], WorkScheduleEntity.prototype, "breakType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default' }),
    __metadata("design:type", Boolean)
], WorkScheduleEntity.prototype, "default", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], WorkScheduleEntity.prototype, "weeklyHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: common_1.UnitTime, default: common_1.UnitTime.MINUTE, nullable: true }),
    __metadata("design:type", String)
], WorkScheduleEntity.prototype, "unitTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'exclude_early_clock_in' }),
    __metadata("design:type", Boolean)
], WorkScheduleEntity.prototype, "excludeEarlyClockIn", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WorkScheduleEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], WorkScheduleEntity.prototype, "overtimeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true, default: '00:00:00' }),
    __metadata("design:type", String)
], WorkScheduleEntity.prototype, "endWorkDayAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        default: work_schedule_publish_type_enum_1.EWorkSchedulePublishType.JUST_PUBLISH_NEW,
    }),
    __metadata("design:type", String)
], WorkScheduleEntity.prototype, "publishType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WorkScheduleEntity.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], WorkScheduleEntity.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], WorkScheduleEntity.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], WorkScheduleEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: (0, utils_1.columnType)('INTEGER'), default: 30 }),
    __metadata("design:type", Number)
], WorkScheduleEntity.prototype, "threshold", void 0);
__decorate([
    (0, typeorm_1.Column)({ ...constants_1.JSON_COLUMN_TYPE, nullable: true }),
    __metadata("design:type", Array)
], WorkScheduleEntity.prototype, "publishHistories", void 0);
__decorate([
    (0, typeorm_1.Column)({ ...constants_1.JSON_COLUMN_TYPE, nullable: true }),
    __metadata("design:type", Object)
], WorkScheduleEntity.prototype, "assignees", void 0);
__decorate([
    (0, typeorm_1.Column)({ ...constants_1.JSON_COLUMN_TYPE, nullable: true }),
    __metadata("design:type", Object)
], WorkScheduleEntity.prototype, "groupAssignees", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => auto_deduction_entity_1.AutoDeductionEntity, autoDeduction => autoDeduction.workSchedule, { cascade: true }),
    __metadata("design:type", Array)
], WorkScheduleEntity.prototype, "autoDeductions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => break_rule_entity_1.BreakRuleEntity, breakEntity => breakEntity.workSchedule, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], WorkScheduleEntity.prototype, "breaks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => location_work_schedule_entity_1.LocationWorkScheduleEntity, locationWorkSchedule => locationWorkSchedule.workSchedule, { cascade: true }),
    __metadata("design:type", Array)
], WorkScheduleEntity.prototype, "locationWorkSchedules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => day_schedule_entity_1.DayScheduleEntity, dayScheduleEntity => dayScheduleEntity.workSchedule, { cascade: true }),
    __metadata("design:type", Array)
], WorkScheduleEntity.prototype, "daySchedules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => work_schedule_assignment_entity_1.WorkScheduleAssignmentEntity, workScheduleAssignment => workScheduleAssignment.workScheduleId, { cascade: true }),
    __metadata("design:type", Array)
], WorkScheduleEntity.prototype, "workScheduleAssignment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.EmployeeEntity, employeeEntity => employeeEntity.workSchedule),
    __metadata("design:type", Array)
], WorkScheduleEntity.prototype, "employees", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => work_schedule_tag_entity_1.WorkScheduleTagEntity, entity => entity.workSchedule),
    __metadata("design:type", Array)
], WorkScheduleEntity.prototype, "workScheduleTags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organization_structure_entity_1.OrganizationStructureEntity, groupEntity => groupEntity.workSchedule),
    __metadata("design:type", Array)
], WorkScheduleEntity.prototype, "organizationStructures", void 0);
exports.WorkScheduleEntity = WorkScheduleEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: enums_1.ETableName.WORK_SCHEDULE,
    })
], WorkScheduleEntity);
//# sourceMappingURL=work-schedule.entity.js.map
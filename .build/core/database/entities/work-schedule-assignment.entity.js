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
exports.WorkScheduleAssignmentEntity = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const base_app_entity_1 = require("./base-app.entity");
const work_schedule_entity_1 = require("./work-schedule.entity");
let WorkScheduleAssignmentEntity = class WorkScheduleAssignmentEntity extends base_app_entity_1.BaseAppEntity {
};
exports.WorkScheduleAssignmentEntity = WorkScheduleAssignmentEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WorkScheduleAssignmentEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WorkScheduleAssignmentEntity.prototype, "workScheduleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WorkScheduleAssignmentEntity.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.DATE_COLUMN_TYPE),
    __metadata("design:type", Date)
], WorkScheduleAssignmentEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WorkScheduleAssignmentEntity.prototype, "isSwapped", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WorkScheduleAssignmentEntity.prototype, "isUnpublished", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_schedule_entity_1.WorkScheduleEntity),
    (0, typeorm_1.JoinColumn)({ name: 'work_schedule_id' }),
    __metadata("design:type", work_schedule_entity_1.WorkScheduleEntity)
], WorkScheduleAssignmentEntity.prototype, "workSchedule", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.EmployeeEntity),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", _1.EmployeeEntity)
], WorkScheduleAssignmentEntity.prototype, "employee", void 0);
exports.WorkScheduleAssignmentEntity = WorkScheduleAssignmentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.WORK_SCHEDULE_ASSIGNMENT })
], WorkScheduleAssignmentEntity);
//# sourceMappingURL=work-schedule-assignment.entity.js.map
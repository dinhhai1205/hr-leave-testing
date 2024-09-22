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
exports.TimeEntryEntity = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("../../common");
let TimeEntryEntity = class TimeEntryEntity extends common_1.BaseTimeTrackerEntity {
};
exports.TimeEntryEntity = TimeEntryEntity;
__decorate([
    (0, typeorm_1.Column)({
        enum: common_1.TimeEntryType,
        name: 'type',
    }),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "timeEntryType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'utc_offset',
    }),
    __metadata("design:type", Number)
], TimeEntryEntity.prototype, "utcOffset", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        name: 'time',
        unique: true,
    }),
    __metadata("design:type", Date)
], TimeEntryEntity.prototype, "timeEntry", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'local_date',
    }),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "localDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'total_duration',
        nullable: true,
    }),
    __metadata("design:type", Number)
], TimeEntryEntity.prototype, "totalDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'reason_delete',
        nullable: true,
    }),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "reasonDelete", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: common_1.StatusTimeEntry,
        name: 'status',
    }),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'unit_time',
        default: common_1.UnitTime.MINUTE,
        enum: common_1.UnitTime,
    }),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "unitTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'next_time_entry_id',
        nullable: true,
    }),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "nextTimeEntryId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'previous_time_entry_id',
        nullable: true,
    }),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "previousTimeEntryId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "belongsToDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'break_id',
        nullable: true,
    }),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "breakId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], TimeEntryEntity.prototype, "isManual", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "workScheduleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "breakRuleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TimeEntryEntity.prototype, "activityId", void 0);
exports.TimeEntryEntity = TimeEntryEntity = __decorate([
    (0, typeorm_1.Entity)()
], TimeEntryEntity);
//# sourceMappingURL=time-entry.entity.js.map
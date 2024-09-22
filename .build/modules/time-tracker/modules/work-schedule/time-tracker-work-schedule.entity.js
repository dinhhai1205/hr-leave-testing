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
exports.TimeTrackerWorkScheduleEntity = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("../../common");
let TimeTrackerWorkScheduleEntity = class TimeTrackerWorkScheduleEntity extends common_1.BaseTimeTrackerEntity {
};
exports.TimeTrackerWorkScheduleEntity = TimeTrackerWorkScheduleEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TimeTrackerWorkScheduleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'work_arrangement',
        enum: common_1.WorkArrangement,
    }),
    __metadata("design:type", String)
], TimeTrackerWorkScheduleEntity.prototype, "workArrangement", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'break_type',
        enum: common_1.BreakType,
    }),
    __metadata("design:type", String)
], TimeTrackerWorkScheduleEntity.prototype, "breakType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'default',
    }),
    __metadata("design:type", Boolean)
], TimeTrackerWorkScheduleEntity.prototype, "default", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], TimeTrackerWorkScheduleEntity.prototype, "weeklyHours", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: common_1.UnitTime,
        default: common_1.UnitTime.MINUTE,
        nullable: true,
    }),
    __metadata("design:type", String)
], TimeTrackerWorkScheduleEntity.prototype, "unitTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        name: 'exclude_early_clock_in',
    }),
    __metadata("design:type", Boolean)
], TimeTrackerWorkScheduleEntity.prototype, "excludeEarlyClockIn", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TimeTrackerWorkScheduleEntity.prototype, "companyId", void 0);
exports.TimeTrackerWorkScheduleEntity = TimeTrackerWorkScheduleEntity = __decorate([
    (0, typeorm_1.Entity)()
], TimeTrackerWorkScheduleEntity);
//# sourceMappingURL=time-tracker-work-schedule.entity.js.map
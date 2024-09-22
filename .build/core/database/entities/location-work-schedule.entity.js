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
exports.LocationWorkScheduleEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const base_app_entity_1 = require("./base-app.entity");
const location_entity_1 = require("./location.entity");
const work_schedule_entity_1 = require("./work-schedule.entity");
let LocationWorkScheduleEntity = class LocationWorkScheduleEntity extends base_app_entity_1.BaseAppEntity {
};
exports.LocationWorkScheduleEntity = LocationWorkScheduleEntity;
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], LocationWorkScheduleEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], LocationWorkScheduleEntity.prototype, "locationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], LocationWorkScheduleEntity.prototype, "workScheduleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.LocationEntity, location => location.locationWorkSchedules),
    (0, typeorm_1.JoinColumn)({ name: 'location_id' }),
    __metadata("design:type", location_entity_1.LocationEntity)
], LocationWorkScheduleEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_schedule_entity_1.WorkScheduleEntity, workSchedule => workSchedule.locationWorkSchedules),
    (0, typeorm_1.JoinColumn)({ name: 'work_schedule_id' }),
    __metadata("design:type", work_schedule_entity_1.WorkScheduleEntity)
], LocationWorkScheduleEntity.prototype, "workSchedule", void 0);
exports.LocationWorkScheduleEntity = LocationWorkScheduleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.LOCATION_WORK_SCHEDULE })
], LocationWorkScheduleEntity);
//# sourceMappingURL=location-work-schedule.entity.js.map
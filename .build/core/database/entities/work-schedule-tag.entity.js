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
exports.WorkScheduleTagEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const base_app_entity_1 = require("./base-app.entity");
const time_tracker_tag_entity_1 = require("./time-tracker-tag.entity");
const work_schedule_entity_1 = require("./work-schedule.entity");
let WorkScheduleTagEntity = class WorkScheduleTagEntity extends base_app_entity_1.BaseAppEntity {
};
exports.WorkScheduleTagEntity = WorkScheduleTagEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WorkScheduleTagEntity.prototype, "workScheduleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WorkScheduleTagEntity.prototype, "tagId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WorkScheduleTagEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => time_tracker_tag_entity_1.TimeTrackerTagEntity, tag => tag.workScheduleTags),
    (0, typeorm_1.JoinColumn)({ name: 'tag_id' }),
    __metadata("design:type", time_tracker_tag_entity_1.TimeTrackerTagEntity)
], WorkScheduleTagEntity.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_schedule_entity_1.WorkScheduleEntity, workSchedule => workSchedule.workScheduleTags),
    (0, typeorm_1.JoinColumn)({ name: 'work_schedule_id' }),
    __metadata("design:type", work_schedule_entity_1.WorkScheduleEntity)
], WorkScheduleTagEntity.prototype, "workSchedule", void 0);
exports.WorkScheduleTagEntity = WorkScheduleTagEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.WORK_SCHEDULE_TAG })
], WorkScheduleTagEntity);
//# sourceMappingURL=work-schedule-tag.entity.js.map
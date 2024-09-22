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
exports.TimeTrackerTagEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const base_app_entity_1 = require("./base-app.entity");
const work_schedule_tag_entity_1 = require("./work-schedule-tag.entity");
let TimeTrackerTagEntity = class TimeTrackerTagEntity extends base_app_entity_1.BaseAppEntity {
};
exports.TimeTrackerTagEntity = TimeTrackerTagEntity;
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], TimeTrackerTagEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TimeTrackerTagEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TimeTrackerTagEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TimeTrackerTagEntity.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TimeTrackerTagEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => work_schedule_tag_entity_1.WorkScheduleTagEntity, entity => entity.tag),
    __metadata("design:type", Array)
], TimeTrackerTagEntity.prototype, "workScheduleTags", void 0);
exports.TimeTrackerTagEntity = TimeTrackerTagEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.TAG })
], TimeTrackerTagEntity);
//# sourceMappingURL=time-tracker-tag.entity.js.map
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
exports.HoursEntryEntity = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("../../common");
let HoursEntryEntity = class HoursEntryEntity extends common_1.BaseTimeTrackerEntity {
};
exports.HoursEntryEntity = HoursEntryEntity;
__decorate([
    (0, typeorm_1.Column)({
        name: 'duration',
    }),
    __metadata("design:type", Number)
], HoursEntryEntity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HoursEntryEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        nullable: true,
    }),
    __metadata("design:type", String)
], HoursEntryEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HoursEntryEntity.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HoursEntryEntity.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HoursEntryEntity.prototype, "activityId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HoursEntryEntity.prototype, "locationWorkScheduleId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'unit_time',
        default: common_1.UnitTime.MINUTE,
        enum: common_1.UnitTime,
    }),
    __metadata("design:type", String)
], HoursEntryEntity.prototype, "unitTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HoursEntryEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HoursEntryEntity.prototype, "reasonDelete", void 0);
exports.HoursEntryEntity = HoursEntryEntity = __decorate([
    (0, typeorm_1.Entity)()
], HoursEntryEntity);
//# sourceMappingURL=hour-entry.entity.js.map
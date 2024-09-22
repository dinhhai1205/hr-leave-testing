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
exports.LocationEntity = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const base_app_entity_1 = require("./base-app.entity");
const location_work_schedule_entity_1 = require("./location-work-schedule.entity");
let LocationEntity = class LocationEntity extends base_app_entity_1.BaseAppEntity {
};
exports.LocationEntity = LocationEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LocationEntity.prototype, "ttLocationId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], LocationEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: '',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], LocationEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], LocationEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], LocationEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ ...constants_1.JSON_COLUMN_TYPE, nullable: true }),
    __metadata("design:type", Object)
], LocationEntity.prototype, "geoFence", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: (0, utils_1.columnType)('BOOLEAN'),
        default: true,
    }),
    __metadata("design:type", Boolean)
], LocationEntity.prototype, "visible", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], LocationEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => location_work_schedule_entity_1.LocationWorkScheduleEntity, locationWorkSchedule => locationWorkSchedule.location),
    __metadata("design:type", Array)
], LocationEntity.prototype, "locationWorkSchedules", void 0);
exports.LocationEntity = LocationEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.LOCATION }),
    (0, typeorm_1.Index)(['name', 'address'])
], LocationEntity);
//# sourceMappingURL=location.entity.js.map
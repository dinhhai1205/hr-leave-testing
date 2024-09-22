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
exports.PayElementMappingEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const base_app_entity_1 = require("./base-app.entity");
const timesheet_adjustment_entity_1 = require("./timesheet-adjustment.entity");
let PayElementMappingEntity = class PayElementMappingEntity extends base_app_entity_1.BaseAppEntity {
};
exports.PayElementMappingEntity = PayElementMappingEntity;
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PayElementMappingEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayElementMappingEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayElementMappingEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayElementMappingEntity.prototype, "pay_element_category_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayElementMappingEntity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PayElementMappingEntity.prototype, "is_sys_gen", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayElementMappingEntity.prototype, "formula", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayElementMappingEntity.prototype, "gl_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", String)
], PayElementMappingEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayElementMappingEntity.prototype, "name_local", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayElementMappingEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PayElementMappingEntity.prototype, "computed", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => timesheet_adjustment_entity_1.TimeSheetAdjustmentEntity, timeSheetAdjustment => timeSheetAdjustment.payElementMapping),
    __metadata("design:type", timesheet_adjustment_entity_1.TimeSheetAdjustmentEntity)
], PayElementMappingEntity.prototype, "timesheetAdjustment", void 0);
exports.PayElementMappingEntity = PayElementMappingEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.PAY_ELEMENT_MAPPING })
], PayElementMappingEntity);
//# sourceMappingURL=pay-element-mapping.entity.js.map
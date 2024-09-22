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
exports.TimeSheetAdjustmentEntity = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const base_app_entity_1 = require("./base-app.entity");
const pay_element_mapping_entity_1 = require("./pay-element-mapping.entity");
const payroll_timesheet_entity_1 = require("./payroll-timesheet.entity");
let TimeSheetAdjustmentEntity = class TimeSheetAdjustmentEntity extends base_app_entity_1.BaseAppEntity {
};
exports.TimeSheetAdjustmentEntity = TimeSheetAdjustmentEntity;
__decorate([
    (0, typeorm_1.Column)({
        enum: enums_1.TimeSheetAdjustmentType,
    }),
    __metadata("design:type", String)
], TimeSheetAdjustmentEntity.prototype, "timeSheetType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: enums_1.AdjustmentStatus,
    }),
    __metadata("design:type", String)
], TimeSheetAdjustmentEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], TimeSheetAdjustmentEntity.prototype, "payElementMappingId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], TimeSheetAdjustmentEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], TimeSheetAdjustmentEntity.prototype, "hour", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], TimeSheetAdjustmentEntity.prototype, "daysToProrate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TimeSheetAdjustmentEntity.prototype, "payrollTimesheetId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TimeSheetAdjustmentEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: (0, utils_1.columnType)('JSONB'), nullable: true, default: {} }),
    __metadata("design:type", String)
], TimeSheetAdjustmentEntity.prototype, "workScheduleSetting", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: enums_1.TimeAdjustmentType,
    }),
    __metadata("design:type", String)
], TimeSheetAdjustmentEntity.prototype, "adjustmentType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TimeSheetAdjustmentEntity.prototype, "leaveId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'uuid',
    }),
    __metadata("design:type", String)
], TimeSheetAdjustmentEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], TimeSheetAdjustmentEntity.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payroll_timesheet_entity_1.PayrollTimeSheetEntity, payroll => payroll.timeSheetAdjustments),
    (0, typeorm_1.JoinColumn)({ name: 'payroll_timesheet_id' }),
    __metadata("design:type", payroll_timesheet_entity_1.PayrollTimeSheetEntity)
], TimeSheetAdjustmentEntity.prototype, "payroll", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pay_element_mapping_entity_1.PayElementMappingEntity, payElementMapping => payElementMapping.timesheetAdjustment),
    (0, typeorm_1.JoinColumn)({ name: 'pay_element_mapping_id' }),
    __metadata("design:type", pay_element_mapping_entity_1.PayElementMappingEntity)
], TimeSheetAdjustmentEntity.prototype, "payElementMapping", void 0);
exports.TimeSheetAdjustmentEntity = TimeSheetAdjustmentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.TIME_SHEET_ADJUSTMENT })
], TimeSheetAdjustmentEntity);
//# sourceMappingURL=timesheet-adjustment.entity.js.map
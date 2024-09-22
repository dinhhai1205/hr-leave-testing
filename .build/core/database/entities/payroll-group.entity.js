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
exports.PayrollGroupEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
const payroll_group_type_enum_1 = require("../../../modules/payroll/modules/payroll-group/enums/payroll-group-type.enum");
const enums_2 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
const payroll_group_wd_entity_1 = require("./payroll-group-wd.entity");
let PayrollGroupEntity = class PayrollGroupEntity extends abstract_entity_1.AbstractEntity {
};
exports.PayrollGroupEntity = PayrollGroupEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PayrollGroupEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PayrollGroupEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "pgType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PayrollGroupEntity.prototype, "useStdWorkDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "stdWorkDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PayrollGroupEntity.prototype, "otUseStdWorkDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '0', type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "otStdWorkDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "mon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "tue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "wed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "thu", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "fri", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "sat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "sun", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "minWorkDaySmui", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayrollGroupEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayrollGroupEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], PayrollGroupEntity.prototype, "stdDayByYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], PayrollGroupEntity.prototype, "otStdDayByYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], PayrollGroupEntity.prototype, "useCalendarDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], PayrollGroupEntity.prototype, "otUseCalendarDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0, type: 'int' }),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "otRoundTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 8, type: 'int' }),
    __metadata("design:type", Number)
], PayrollGroupEntity.prototype, "hourPerDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], PayrollGroupEntity.prototype, "incPerHourForex", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payroll_group_wd_entity_1.PayrollGroupWorkDayEntity, record => record.payrollGroup),
    __metadata("design:type", Array)
], PayrollGroupEntity.prototype, "payrollGroupWorkDays", void 0);
exports.PayrollGroupEntity = PayrollGroupEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_2.ETableName.PAYROLL_GROUP })
], PayrollGroupEntity);
//# sourceMappingURL=payroll-group.entity.js.map
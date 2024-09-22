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
exports.PayrollGroupWorkDayEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
const enums_2 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
const payroll_group_entity_1 = require("./payroll-group.entity");
let PayrollGroupWorkDayEntity = class PayrollGroupWorkDayEntity extends abstract_entity_1.AbstractEntity {
};
exports.PayrollGroupWorkDayEntity = PayrollGroupWorkDayEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayrollGroupWorkDayEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayrollGroupWorkDayEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_4", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_5", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_6", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_7", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_8", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_9", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_10", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_11", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_12", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_13", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_14", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_15", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_16", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_17", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_18", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_19", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_20", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_21", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_22", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_23", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_24", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_25", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_26", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_27", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_28", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_29", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_30", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_31", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_32", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_33", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_34", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_35", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_36", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_37", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_38", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_39", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_40", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_41", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_42", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_43", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_44", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_45", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_46", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_47", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_48", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_49", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_50", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_51", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_52", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_53", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_54", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_55", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_56", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_57", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_58", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_59", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_60", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_61", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_62", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_63", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_64", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_65", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_66", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_67", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_68", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_69", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_70", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_71", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_72", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_73", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_74", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_75", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_76", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_77", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_78", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_79", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_80", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_81", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_82", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_83", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_84", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_85", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_86", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_87", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_88", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_89", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_90", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_91", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_92", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_93", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_94", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_95", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_96", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_97", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_98", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_99", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_100", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_101", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_102", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_103", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_104", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_105", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_106", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_107", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_108", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_109", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_110", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_111", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_112", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_113", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_114", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_115", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_116", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_117", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_118", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_119", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_120", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_121", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_122", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_123", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_124", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_125", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_126", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_127", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_128", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_129", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_130", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_131", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_132", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_133", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_134", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_135", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_136", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_137", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_138", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_139", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_140", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_141", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_142", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_143", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_144", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_145", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_146", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_147", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_148", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_149", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_150", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_151", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_152", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_153", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_154", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_155", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_156", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_157", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_158", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_159", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_160", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_161", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_162", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_163", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_164", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_165", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_166", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_167", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_168", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_169", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_170", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_171", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_172", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_173", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_174", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_175", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_176", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_177", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_178", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_179", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_180", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_181", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_182", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_183", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_184", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_185", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_186", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_187", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_188", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_189", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_190", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_191", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_192", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_193", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_194", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_195", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_196", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_197", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_198", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_199", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_200", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_201", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_202", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_203", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_204", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_205", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_206", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_207", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_208", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_209", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_210", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_211", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_212", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_213", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_214", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_215", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_216", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_217", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_218", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_219", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_220", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_221", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_222", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_223", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_224", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_225", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_226", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_227", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_228", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_229", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_230", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_231", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_232", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_233", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_234", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_235", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_236", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_237", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_238", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_239", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_240", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_241", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_242", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_243", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_244", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_245", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_246", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_247", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_248", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_249", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_250", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_251", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_252", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_253", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_254", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_255", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_256", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_257", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_258", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_259", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_260", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_261", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_262", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_263", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_264", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_265", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_266", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_267", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_268", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_269", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_270", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_271", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_272", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_273", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_274", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_275", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_276", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_277", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_278", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_279", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_280", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_281", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_282", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_283", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_284", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_285", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_286", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_287", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_288", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_289", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_290", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_291", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_292", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_293", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_294", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_295", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_296", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_297", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_298", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_299", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_300", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_301", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_302", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_303", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_304", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_305", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_306", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_307", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_308", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_309", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_310", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_311", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_312", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_313", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_314", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_315", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_316", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_317", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_318", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_319", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_320", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_321", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_322", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_323", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_324", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_325", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_326", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_327", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_328", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_329", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_330", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_331", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_332", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_333", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_334", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_335", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_336", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_337", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_338", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_339", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_340", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_341", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_342", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_343", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_344", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_345", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_346", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_347", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_348", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_349", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_350", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_351", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_352", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_353", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_354", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_355", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_356", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_357", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_358", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_359", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_360", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_361", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_362", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_363", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_364", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_365", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision' }),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "value_366", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PayrollGroupWorkDayEntity.prototype, "payrollGroupId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payroll_group_entity_1.PayrollGroupEntity),
    (0, typeorm_1.JoinColumn)({ name: 'payroll_group_id' }),
    __metadata("design:type", payroll_group_entity_1.PayrollGroupEntity)
], PayrollGroupWorkDayEntity.prototype, "payrollGroup", void 0);
exports.PayrollGroupWorkDayEntity = PayrollGroupWorkDayEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_2.ETableName.PAYROLL_GROUP_WD })
], PayrollGroupWorkDayEntity);
//# sourceMappingURL=payroll-group-wd.entity.js.map
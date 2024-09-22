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
exports.CyclePeriodHeaderEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const cycle_frequency_entity_1 = require("./cycle-frequency.entity");
const cycle_period_detail_entity_1 = require("./cycle-period-detail.entity");
let CyclePeriodHeaderEntity = class CyclePeriodHeaderEntity {
};
exports.CyclePeriodHeaderEntity = CyclePeriodHeaderEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], CyclePeriodHeaderEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CyclePeriodHeaderEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CyclePeriodHeaderEntity.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CyclePeriodHeaderEntity.prototype, "cycleFrequencyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cycle_frequency_entity_1.CycleFrequencyEntity, record => record.periods),
    (0, typeorm_1.JoinColumn)({ name: 'cycle_frequency_id' }),
    __metadata("design:type", cycle_frequency_entity_1.CycleFrequencyEntity)
], CyclePeriodHeaderEntity.prototype, "frequency", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cycle_period_detail_entity_1.CyclePeriodDetailEntity, record => record.header),
    __metadata("design:type", Array)
], CyclePeriodHeaderEntity.prototype, "details", void 0);
exports.CyclePeriodHeaderEntity = CyclePeriodHeaderEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.CYCLE_PERIOD_HEADER })
], CyclePeriodHeaderEntity);
//# sourceMappingURL=cycle-period-header.entity.js.map
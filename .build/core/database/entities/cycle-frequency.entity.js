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
exports.CycleFrequencyEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const prtrx_hdr_entity_1 = require("./prtrx-hdr.entity");
const cycle_period_header_entity_1 = require("./cycle-period-header.entity");
let CycleFrequencyEntity = class CycleFrequencyEntity {
};
exports.CycleFrequencyEntity = CycleFrequencyEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], CycleFrequencyEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CycleFrequencyEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CycleFrequencyEntity.prototype, "firstDay1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CycleFrequencyEntity.prototype, "lastDay1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CycleFrequencyEntity.prototype, "firstDay2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CycleFrequencyEntity.prototype, "lastDay2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prtrx_hdr_entity_1.PrtrxHdrEntity, record => record.frequency),
    __metadata("design:type", Array)
], CycleFrequencyEntity.prototype, "prtrxHdrs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cycle_period_header_entity_1.CyclePeriodHeaderEntity, record => record.frequency),
    __metadata("design:type", Array)
], CycleFrequencyEntity.prototype, "periods", void 0);
exports.CycleFrequencyEntity = CycleFrequencyEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.CYCLE_FREQUENCY })
], CycleFrequencyEntity);
//# sourceMappingURL=cycle-frequency.entity.js.map
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
exports.CyclePeriodDetailEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const prtrx_hdr_entity_1 = require("./prtrx-hdr.entity");
const cycle_period_header_entity_1 = require("./cycle-period-header.entity");
let CyclePeriodDetailEntity = class CyclePeriodDetailEntity {
};
exports.CyclePeriodDetailEntity = CyclePeriodDetailEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], CyclePeriodDetailEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CyclePeriodDetailEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CyclePeriodDetailEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CyclePeriodDetailEntity.prototype, "cyclePeriodHeaderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_from' }),
    __metadata("design:type", Date)
], CyclePeriodDetailEntity.prototype, "dateFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_to' }),
    __metadata("design:type", Date)
], CyclePeriodDetailEntity.prototype, "dateTo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prtrx_hdr_entity_1.PrtrxHdrEntity, record => record.period),
    __metadata("design:type", Array)
], CyclePeriodDetailEntity.prototype, "prtrxHdrs", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cycle_period_header_entity_1.CyclePeriodHeaderEntity, record => record.details),
    (0, typeorm_1.JoinColumn)({ name: 'cycle_period_header_id' }),
    __metadata("design:type", cycle_period_header_entity_1.CyclePeriodHeaderEntity)
], CyclePeriodDetailEntity.prototype, "header", void 0);
exports.CyclePeriodDetailEntity = CyclePeriodDetailEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.CYCLE_PERIOD_DETAIL })
], CyclePeriodDetailEntity);
//# sourceMappingURL=cycle-period-detail.entity.js.map
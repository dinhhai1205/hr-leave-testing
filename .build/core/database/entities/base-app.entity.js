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
exports.BaseAppEntity = void 0;
const typeorm_1 = require("typeorm");
const utils_1 = require("../utils");
class BaseAppEntity {
}
exports.BaseAppEntity = BaseAppEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], BaseAppEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: (0, utils_1.columnType)('BOOLEAN'),
        default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
    }),
    __metadata("design:type", Boolean)
], BaseAppEntity.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BaseAppEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: (0, utils_1.columnType)('DATETIME'),
        default: (0, utils_1.defaultColumn)({ columnType: 'DATETIME' }),
    }),
    __metadata("design:type", Date)
], BaseAppEntity.prototype, "createdOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BaseAppEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: (0, utils_1.columnType)('DATETIME') }),
    __metadata("design:type", Date)
], BaseAppEntity.prototype, "updatedOn", void 0);
//# sourceMappingURL=base-app.entity.js.map
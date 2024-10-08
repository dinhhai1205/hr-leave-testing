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
exports.AbstractEntity = void 0;
const typeorm_1 = require("typeorm");
const column_type_util_1 = require("../utils/column-type.util");
let AbstractEntity = class AbstractEntity {
};
exports.AbstractEntity = AbstractEntity;
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: (0, column_type_util_1.columnType)('DATETIME') }),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "createdOn", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        nullable: true,
        type: (0, column_type_util_1.columnType)('DATETIME'),
    }),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "updatedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, nullable: true }),
    __metadata("design:type", Boolean)
], AbstractEntity.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AbstractEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AbstractEntity.prototype, "updatedBy", void 0);
exports.AbstractEntity = AbstractEntity = __decorate([
    (0, typeorm_1.Entity)()
], AbstractEntity);
//# sourceMappingURL=abstract.entity.js.map
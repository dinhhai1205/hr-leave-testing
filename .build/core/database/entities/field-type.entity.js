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
exports.FieldTypeEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../modules/e-sign/enums");
const enums_2 = require("../enums");
const utils_1 = require("../utils");
const base_app_entity_1 = require("./base-app.entity");
let FieldTypeEntity = class FieldTypeEntity extends base_app_entity_1.BaseAppEntity {
};
exports.FieldTypeEntity = FieldTypeEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FieldTypeEntity.prototype, "fieldCategory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FieldTypeEntity.prototype, "fieldTypeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: (0, utils_1.columnType)('BOOLEAN') }),
    __metadata("design:type", Boolean)
], FieldTypeEntity.prototype, "isMandatory", void 0);
exports.FieldTypeEntity = FieldTypeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_2.ETableName.FIELD_TYPE }),
    (0, typeorm_1.Index)('idx_field_type_is_deleted', ['isDeleted'])
], FieldTypeEntity);
//# sourceMappingURL=field-type.entity.js.map
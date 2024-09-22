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
exports.GroupMappingEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
let GroupMappingEntity = class GroupMappingEntity extends abstract_entity_1.AbstractEntity {
};
exports.GroupMappingEntity = GroupMappingEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], GroupMappingEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], GroupMappingEntity.prototype, "organizationStructureId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GroupMappingEntity.prototype, "timeTrackerGroupId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], GroupMappingEntity.prototype, "companyId", void 0);
exports.GroupMappingEntity = GroupMappingEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.GROUP_MAPPING })
], GroupMappingEntity);
//# sourceMappingURL=group-mapping.entity.js.map
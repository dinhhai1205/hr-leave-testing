"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const field_type_entity_1 = require("../../../../core/database/entities/field-type.entity");
const field_type_controller_1 = require("./field-type.controller");
const field_type_service_1 = require("./field-type.service");
let FieldTypeModule = class FieldTypeModule {
};
exports.FieldTypeModule = FieldTypeModule;
exports.FieldTypeModule = FieldTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([field_type_entity_1.FieldTypeEntity])],
        controllers: [field_type_controller_1.FieldTypeController],
        providers: [field_type_service_1.FieldTypeService],
        exports: [field_type_service_1.FieldTypeService],
    })
], FieldTypeModule);
//# sourceMappingURL=field-type.module.js.map
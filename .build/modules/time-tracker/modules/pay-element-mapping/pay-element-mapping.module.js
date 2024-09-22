"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayElementMappingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pay_element_mapping_entity_1 = require("../../../../core/database/entities/pay-element-mapping.entity");
const pay_element_mapping_service_1 = require("./pay-element-mapping.service");
let PayElementMappingModule = class PayElementMappingModule {
};
exports.PayElementMappingModule = PayElementMappingModule;
exports.PayElementMappingModule = PayElementMappingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([pay_element_mapping_entity_1.PayElementMappingEntity])],
        providers: [pay_element_mapping_service_1.PayElementMappingService],
        exports: [pay_element_mapping_service_1.PayElementMappingService],
    })
], PayElementMappingModule);
//# sourceMappingURL=pay-element-mapping.module.js.map
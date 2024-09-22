"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeMappingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_mapping_service_1 = require("./employee-mapping.service");
const employee_mapping_entity_1 = require("../../../../core/database/entities/employee-mapping.entity");
let EmployeeMappingModule = class EmployeeMappingModule {
};
exports.EmployeeMappingModule = EmployeeMappingModule;
exports.EmployeeMappingModule = EmployeeMappingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_mapping_entity_1.EmployeeMappingEntity])],
        providers: [employee_mapping_service_1.EmployeeMappingService],
        exports: [employee_mapping_service_1.EmployeeMappingService],
    })
], EmployeeMappingModule);
//# sourceMappingURL=employee-mapping.module.js.map
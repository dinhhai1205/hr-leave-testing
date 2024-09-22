"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationStructureModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../../../core/database/entities");
const organization_structure_service_1 = require("./organization-structure.service");
const group_mapping_module_1 = require("../../../time-tracker/modules/group-mapping/group-mapping.module");
const company_mapping_module_1 = require("../../../time-tracker/modules/company-mapping/company-mapping.module");
const api_module_1 = require("../../../time-tracker/libs/api/api.module");
let OrganizationStructureModule = class OrganizationStructureModule {
};
exports.OrganizationStructureModule = OrganizationStructureModule;
exports.OrganizationStructureModule = OrganizationStructureModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.OrganizationStructureEntity, entities_1.EmployeeEntity]),
            group_mapping_module_1.GroupMappingModule,
            company_mapping_module_1.CompanyMappingModule,
            api_module_1.TimeTrackerApiModule,
        ],
        providers: [organization_structure_service_1.OrganizationStructureService],
        exports: [organization_structure_service_1.OrganizationStructureService],
    })
], OrganizationStructureModule);
//# sourceMappingURL=organization-structure.module.js.map
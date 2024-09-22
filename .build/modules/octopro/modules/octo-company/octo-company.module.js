"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OctoCompanyModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const octo_company_entity_1 = require("../../../../core/database/entities/octo-company.entity");
const company_1 = require("../../../general/modules/company");
const octo_company_service_1 = require("./octo-company.service");
let OctoCompanyModule = class OctoCompanyModule {
};
exports.OctoCompanyModule = OctoCompanyModule;
exports.OctoCompanyModule = OctoCompanyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([octo_company_entity_1.OctoCompanyEntity]),
            company_1.CompanyModule,
            axios_1.HttpModule,
        ],
        providers: [octo_company_service_1.OctoCompanyService],
        exports: [octo_company_service_1.OctoCompanyService],
        controllers: [],
    })
], OctoCompanyModule);
//# sourceMappingURL=octo-company.module.js.map
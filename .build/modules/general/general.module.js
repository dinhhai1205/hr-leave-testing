"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralModule = void 0;
const common_1 = require("@nestjs/common");
const company_1 = require("./modules/company");
const company_parameter_1 = require("./modules/company-parameter");
const currency_1 = require("./modules/currency");
const usd_forex_module_1 = require("./modules/usd-forex/usd-forex.module");
const organization_structure_module_1 = require("./modules/organization-structure/organization-structure.module");
const overtime_module_1 = require("./modules/overtime/overtime.module");
let GeneralModule = class GeneralModule {
};
exports.GeneralModule = GeneralModule;
exports.GeneralModule = GeneralModule = __decorate([
    (0, common_1.Module)({
        imports: [
            company_1.CompanyModule,
            company_parameter_1.CompanyParameterModule,
            currency_1.CurrencyModule,
            usd_forex_module_1.UsdForexModule,
            organization_structure_module_1.OrganizationStructureModule,
            overtime_module_1.OvertimeModule,
        ],
    })
], GeneralModule);
//# sourceMappingURL=general.module.js.map
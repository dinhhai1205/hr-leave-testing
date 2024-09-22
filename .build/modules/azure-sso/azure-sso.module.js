"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureSSOModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("../../config");
const entities_1 = require("../../core/database/entities");
const octo_user_module_1 = require("../octopro/modules/octo-user/octo-user.module");
const company_user_role_module_1 = require("../user/modules/company-user-role/company-user-role.module");
const company_user_role_service_1 = require("../user/modules/company-user-role/company-user-role.service");
const employee_module_1 = require("../user/modules/employee/employee.module");
const azure_sso_controller_1 = require("./azure-sso.controller");
const azure_sso_service_1 = require("./azure-sso.service");
let AzureSSOModule = class AzureSSOModule {
};
exports.AzureSSOModule = AzureSSOModule;
exports.AzureSSOModule = AzureSSOModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forFeature(config_2.jwtConfig),
            axios_1.HttpModule,
            typeorm_1.TypeOrmModule.forFeature([entities_1.AzureSSOEntity, entities_1.CompanyUserRoleEntity]),
            employee_module_1.EmployeeModule,
            company_user_role_module_1.CompanyUserRoleModule,
            octo_user_module_1.OctoUserModule,
        ],
        controllers: [azure_sso_controller_1.AzureSSOController],
        providers: [azure_sso_service_1.AzureSSOService, company_user_role_service_1.CompanyUserRoleService, jwt_1.JwtService],
    })
], AzureSSOModule);
//# sourceMappingURL=azure-sso.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyUserRoleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const company_user_role_entity_1 = require("../../../../core/database/entities/company-user-role.entity");
const company_user_role_service_1 = require("./company-user-role.service");
let CompanyUserRoleModule = class CompanyUserRoleModule {
};
exports.CompanyUserRoleModule = CompanyUserRoleModule;
exports.CompanyUserRoleModule = CompanyUserRoleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_user_role_entity_1.CompanyUserRoleEntity])],
        providers: [company_user_role_service_1.CompanyUserRoleService],
        exports: [company_user_role_service_1.CompanyUserRoleService],
    })
], CompanyUserRoleModule);
//# sourceMappingURL=company-user-role.module.js.map
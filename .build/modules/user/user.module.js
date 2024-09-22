"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const asp_net_users_1 = require("./modules/asp-net-users");
const company_user_role_1 = require("./modules/company-user-role");
const employee_contract_module_1 = require("./modules/employee-contract/employee-contract.module");
const employee_module_1 = require("./modules/employee/employee.module");
const role_detail_module_1 = require("./modules/role-detail/role-detail.module");
const role_header_module_1 = require("./modules/role-header/role-header.module");
const security_module_1 = require("./modules/security/security.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            asp_net_users_1.AspNetUsersModule,
            company_user_role_1.CompanyUserRoleModule,
            employee_module_1.EmployeeModule,
            employee_contract_module_1.EmployeeContractModule,
            role_detail_module_1.RoleDetailModule,
            role_header_module_1.RoleHeaderModule,
            security_module_1.SecurityModule,
        ],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map
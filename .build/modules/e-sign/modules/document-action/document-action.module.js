"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentActionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const document_action_entity_1 = require("../../../../core/database/entities/document-action.entity");
const company_user_role_module_1 = require("../../../user/modules/company-user-role/company-user-role.module");
const employee_module_1 = require("../../../user/modules/employee/employee.module");
const document_action_field_module_1 = require("../document-action-field/document-action-field.module");
const document_action_service_1 = require("./document-action.service");
let DocumentActionModule = class DocumentActionModule {
};
exports.DocumentActionModule = DocumentActionModule;
exports.DocumentActionModule = DocumentActionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([document_action_entity_1.DocumentActionEntity]),
            document_action_field_module_1.DocumentActionFieldModule,
            company_user_role_module_1.CompanyUserRoleModule,
            employee_module_1.EmployeeModule,
        ],
        providers: [document_action_service_1.DocumentActionService],
        exports: [document_action_service_1.DocumentActionService],
    })
], DocumentActionModule);
//# sourceMappingURL=document-action.module.js.map
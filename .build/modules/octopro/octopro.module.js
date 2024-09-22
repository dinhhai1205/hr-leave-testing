"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OctoproModule = void 0;
const common_1 = require("@nestjs/common");
const octo_client_user_module_1 = require("./modules/octo-client-user/octo-client-user.module");
const octo_company_module_1 = require("./modules/octo-company/octo-company.module");
const octo_dashboard_module_1 = require("./modules/octo-dashboard/octo-dashboard.module");
const octo_task_module_1 = require("./modules/octo-task/octo-task.module");
const octo_user_module_1 = require("./modules/octo-user/octo-user.module");
let OctoproModule = class OctoproModule {
};
exports.OctoproModule = OctoproModule;
exports.OctoproModule = OctoproModule = __decorate([
    (0, common_1.Module)({
        imports: [
            octo_dashboard_module_1.OctoDashboardModule,
            octo_client_user_module_1.OctoClientUserModule,
            octo_company_module_1.OctoCompanyModule,
            octo_task_module_1.OctoTaskModule,
            octo_user_module_1.OctoUserModule,
        ],
    })
], OctoproModule);
//# sourceMappingURL=octopro.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HourEntryModule = void 0;
const common_1 = require("@nestjs/common");
const api_module_1 = require("../../libs/api/api.module");
const employee_mapping_module_1 = require("../employee-mapping/employee-mapping.module");
const company_mapping_module_1 = require("../company-mapping/company-mapping.module");
const group_mapping_module_1 = require("../group-mapping/group-mapping.module");
const services_1 = require("./services");
const hour_entry_controller_1 = require("./hour-entry.controller");
let HourEntryModule = class HourEntryModule {
};
exports.HourEntryModule = HourEntryModule;
exports.HourEntryModule = HourEntryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.TimeTrackerApiModule,
            employee_mapping_module_1.EmployeeMappingModule,
            company_mapping_module_1.CompanyMappingModule,
            group_mapping_module_1.GroupMappingModule,
        ],
        controllers: [hour_entry_controller_1.HourEntryController],
        providers: [services_1.HourEntryService],
        exports: [],
    })
], HourEntryModule);
//# sourceMappingURL=hour-entry.module.js.map
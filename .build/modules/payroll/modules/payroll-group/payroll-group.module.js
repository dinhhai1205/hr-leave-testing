"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollGroupModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payroll_group_entity_1 = require("../../../../core/database/entities/payroll-group.entity");
const payroll_group_wd_module_1 = require("../payroll-group-wd/payroll-group-wd.module");
const payroll_group_service_1 = require("./payroll-group.service");
let PayrollGroupModule = class PayrollGroupModule {
};
exports.PayrollGroupModule = PayrollGroupModule;
exports.PayrollGroupModule = PayrollGroupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([payroll_group_entity_1.PayrollGroupEntity]),
            payroll_group_wd_module_1.PayrollGroupWdModule,
        ],
        providers: [payroll_group_service_1.PayRollGroupService],
        exports: [payroll_group_service_1.PayRollGroupService],
    })
], PayrollGroupModule);
//# sourceMappingURL=payroll-group.module.js.map
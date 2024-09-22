"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypeBalanceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const leave_type_balance_entity_1 = require("../../../../core/database/entities/leave-type-balance.entity");
const leave_trx_module_1 = require("../leave-trx/leave-trx.module");
const leave_type_module_1 = require("../leave-type/leave-type.module");
const leave_type_balance_controller_1 = require("./leave-type-balance.controller");
const leave_type_balance_service_1 = require("./leave-type-balance.service");
let LeaveTypeBalanceModule = class LeaveTypeBalanceModule {
};
exports.LeaveTypeBalanceModule = LeaveTypeBalanceModule;
exports.LeaveTypeBalanceModule = LeaveTypeBalanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([leave_type_balance_entity_1.LeaveTypeBalanceEntity]),
            leave_trx_module_1.LeaveTrxModule,
            (0, common_1.forwardRef)(() => leave_type_module_1.LeaveTypeModule),
        ],
        providers: [leave_type_balance_service_1.LeaveTypeBalanceService],
        exports: [leave_type_balance_service_1.LeaveTypeBalanceService],
        controllers: [leave_type_balance_controller_1.LeaveTypeBalanceController],
    })
], LeaveTypeBalanceModule);
//# sourceMappingURL=leave-type-balance.module.js.map
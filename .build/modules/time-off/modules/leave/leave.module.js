"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LeaveModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const enums_1 = require("../../../../common/enums");
const config_2 = require("../../../../config");
const entities_1 = require("../../../../core/database/entities");
const queue_1 = require("../../../../core/queue");
const aws_1 = require("../../../../libs/aws");
const hrforte_1 = require("../../../../libs/hrforte");
const approval_user_1 = require("../../../approval/modules/approval-user");
const trx_approval_user_module_1 = require("../../../approval/modules/trx-approval-user/trx-approval-user.module");
const payroll_group_wd_module_1 = require("../../../payroll/modules/payroll-group-wd/payroll-group-wd.module");
const payroll_group_module_1 = require("../../../payroll/modules/payroll-group/payroll-group.module");
const employee_module_1 = require("../../../user/modules/employee/employee.module");
const leave_trx_module_1 = require("../leave-trx/leave-trx.module");
const leave_type_assigment_module_1 = require("../leave-type-assigment/leave-type-assigment.module");
const leave_type_balance_module_1 = require("../leave-type-balance/leave-type-balance.module");
const leave_type_module_1 = require("../leave-type/leave-type.module");
const public_holiday_module_1 = require("../public-holiday/public-holiday.module");
const leave_v2_controller_1 = require("./controllers/leave-v2.controller");
const leave_controller_1 = require("./controllers/leave.controller");
const leave_helper_1 = require("./helpers/leave.helper");
const leave_v2_service_1 = require("./services/leave-v2.service");
const leave_service_1 = require("./services/leave.service");
const leave_subscribers_1 = require("./subscribers/leave.subscribers");
const payroll_timesheet_module_1 = require("../../../time-tracker/modules/payroll-timesheet/payroll-timesheet.module");
let LeaveModule = LeaveModule_1 = class LeaveModule {
    static async forRootAsync() {
        await config_1.ConfigModule.envVariablesLoaded;
        const providers = process.env.DB_TYPE === 'mssql' ? [leave_subscribers_1.LeaveEntitySubscriber] : [];
        return { module: LeaveModule_1, providers };
    }
};
exports.LeaveModule = LeaveModule;
exports.LeaveModule = LeaveModule = LeaveModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.LeaveEntity]),
            config_1.ConfigModule.forFeature(config_2.databaseConfig),
            queue_1.QueueModule.register({
                queues: ['HRFORTE_NOTIFICATION', 'LEAVE_TYPE_POLICY'],
            }),
            hrforte_1.HrforteNotificationModule,
            employee_module_1.EmployeeModule,
            payroll_group_module_1.PayrollGroupModule,
            payroll_timesheet_module_1.PayrollTimeSheetModule,
            trx_approval_user_module_1.TrxApprovalUserModule,
            public_holiday_module_1.PublicHolidayModule,
            leave_type_module_1.LeaveTypeModule,
            leave_type_balance_module_1.LeaveTypeBalanceModule,
            leave_trx_module_1.LeaveTrxModule,
            leave_type_assigment_module_1.LeaveTypeAssignmentModule,
            approval_user_1.ApprovalUserModule,
            payroll_group_wd_module_1.PayrollGroupWdModule,
            aws_1.AwsS3Module.registerAsync({
                useFactory(config) {
                    const { nodeEnv } = config;
                    return {
                        bucketName: nodeEnv === enums_1.ENodeEnv.PRODUCTION
                            ? aws_1.EAwsS3BucketServiceName.Leave
                            : `${aws_1.EAwsS3BucketServiceName.Leave}.stg`,
                    };
                },
                inject: [config_2.appConfig.KEY],
            }),
        ],
        providers: [leave_service_1.LeaveService, leave_helper_1.LeaveHelper, leave_v2_service_1.LeaveV2Service],
        exports: [leave_service_1.LeaveService],
        controllers: [leave_controller_1.LeaveController, leave_v2_controller_1.LeaveV2Controller],
    })
], LeaveModule);
//# sourceMappingURL=leave.module.js.map
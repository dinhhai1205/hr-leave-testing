"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveAttachmentModule = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../../../common/enums");
const config_1 = require("../../../../config");
const aws_1 = require("../../../../libs/aws");
const company_parameter_module_1 = require("../../../general/modules/company-parameter/company-parameter.module");
const leave_module_1 = require("../leave/leave.module");
const leave_attachment_controller_1 = require("./leave-attachment.controller");
const leave_attachment_service_1 = require("./leave-attachment.service");
let LeaveAttachmentModule = class LeaveAttachmentModule {
};
exports.LeaveAttachmentModule = LeaveAttachmentModule;
exports.LeaveAttachmentModule = LeaveAttachmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            leave_module_1.LeaveModule,
            company_parameter_module_1.CompanyParameterModule,
            aws_1.AwsS3Module.registerAsync({
                useFactory(config) {
                    const { nodeEnv } = config;
                    return {
                        bucketName: nodeEnv === enums_1.ENodeEnv.PRODUCTION
                            ? aws_1.EAwsS3BucketServiceName.Leave
                            : `${aws_1.EAwsS3BucketServiceName.Leave}.stg`,
                    };
                },
                inject: [config_1.appConfig.KEY],
            }),
        ],
        providers: [leave_attachment_service_1.LeaveAttachmentService],
        exports: [leave_attachment_service_1.LeaveAttachmentService],
        controllers: [leave_attachment_controller_1.LeaveAttachmentController],
    })
], LeaveAttachmentModule);
//# sourceMappingURL=leave-attachment.module.js.map
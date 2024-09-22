"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveV2Controller = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../../../common/enums");
const iam_1 = require("../../../../../core/iam");
const dto_1 = require("../dto");
const leave_v2_service_1 = require("../services/leave-v2.service");
let LeaveV2Controller = class LeaveV2Controller {
    constructor(leaveV2Service) {
        this.leaveV2Service = leaveV2Service;
    }
    async createLeaveBySlackBot(companyId, body) {
        return this.leaveV2Service.createLeaveBySlackBot(companyId, enums_1.EDefaultEmail.SLACK_BOT, body);
    }
};
exports.LeaveV2Controller = LeaveV2Controller;
__decorate([
    (0, common_1.Post)(':companyId/slack-bot'),
    (0, swagger_1.ApiOperation)({ summary: 'Create leave record using slack bot' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: dto_1.LeaveDto }),
    (0, iam_1.Auth)(iam_1.AuthType.SlackBot),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.CreateLeaveABySlackBotBodyDto]),
    __metadata("design:returntype", Promise)
], LeaveV2Controller.prototype, "createLeaveBySlackBot", null);
exports.LeaveV2Controller = LeaveV2Controller = __decorate([
    (0, swagger_1.ApiTags)('leave v2'),
    (0, common_1.Controller)({ path: 'leave', version: '2' }),
    (0, iam_1.ModuleMode)(enums_1.EApiModuleMode.Leave),
    __metadata("design:paramtypes", [leave_v2_service_1.LeaveV2Service])
], LeaveV2Controller);
//# sourceMappingURL=leave-v2.controller.js.map
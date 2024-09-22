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
exports.TimeTrackerSyncRemovalController = void 0;
const common_1 = require("@nestjs/common");
const time_tracker_sync_removal_service_1 = require("./time-tracker-sync-removal.service");
const iam_1 = require("../../../../core/iam");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
const common_2 = require("../../common");
const swagger_1 = require("@nestjs/swagger");
let TimeTrackerSyncRemovalController = class TimeTrackerSyncRemovalController {
    constructor(timeTrackerSyncRemovalService) {
        this.timeTrackerSyncRemovalService = timeTrackerSyncRemovalService;
    }
    async deleteLinkedTTDataByCompanyId(companyId, { timeTrackerCompanyId }) {
        return this.timeTrackerSyncRemovalService.deleteLinkedTTData(companyId, timeTrackerCompanyId);
    }
};
exports.TimeTrackerSyncRemovalController = TimeTrackerSyncRemovalController;
__decorate([
    (0, common_1.Delete)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TimeTrackerSyncRemovalController.prototype, "deleteLinkedTTDataByCompanyId", null);
exports.TimeTrackerSyncRemovalController = TimeTrackerSyncRemovalController = __decorate([
    (0, common_1.Controller)({ path: common_2.SYNC_COMPANY_REMOVAL_API_PATH }),
    (0, swagger_1.ApiTags)(common_2.SYNC_COMPANY_REMOVAL_API_TAG),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    __metadata("design:paramtypes", [time_tracker_sync_removal_service_1.TimeTrackerSyncRemovalService])
], TimeTrackerSyncRemovalController);
//# sourceMappingURL=time-tracker-sync-removal.controller.js.map
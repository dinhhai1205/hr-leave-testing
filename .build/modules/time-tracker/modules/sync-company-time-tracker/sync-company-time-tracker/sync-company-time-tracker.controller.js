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
exports.SyncCompanyTimeTrackerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../../common");
const sync_company_time_tracker_service_1 = require("./sync-company-time-tracker.service");
const time_tracker_emp_guard_1 = require("../../../common/guards/time-tracker-emp.guard");
const iam_1 = require("../../../../../core/iam");
let SyncCompanyTimeTrackerController = class SyncCompanyTimeTrackerController {
    constructor(syncCompanyTimeTrackerService) {
        this.syncCompanyTimeTrackerService = syncCompanyTimeTrackerService;
    }
    async syncTimeTrackerCompanyInfo(companyId) {
        return this.syncCompanyTimeTrackerService.syncTimeTrackerCompanyInfo(companyId);
    }
};
exports.SyncCompanyTimeTrackerController = SyncCompanyTimeTrackerController;
__decorate([
    (0, common_1.Post)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    __param(0, (0, common_1.Param)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SyncCompanyTimeTrackerController.prototype, "syncTimeTrackerCompanyInfo", null);
exports.SyncCompanyTimeTrackerController = SyncCompanyTimeTrackerController = __decorate([
    (0, swagger_1.ApiTags)(common_2.SYNC_COMPANY_API_TAG),
    (0, common_1.Controller)({ path: common_2.SYNC_COMPANY_API_PATH }),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    __metadata("design:paramtypes", [sync_company_time_tracker_service_1.SyncCompanyTimeTrackerService])
], SyncCompanyTimeTrackerController);
//# sourceMappingURL=sync-company-time-tracker.controller.js.map
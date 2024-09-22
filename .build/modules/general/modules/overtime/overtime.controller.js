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
exports.OvertimeController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const iam_1 = require("../../../../core/iam");
const enums_1 = require("../../../../common/enums");
const overtime_service_1 = require("./overtime.service");
const day_to_prorate_dto_1 = require("./dtos/day-to-prorate.dto");
let OvertimeController = class OvertimeController {
    constructor(overtimeService) {
        this.overtimeService = overtimeService;
    }
    async getDayToProrate(payload, userEmail, companyId, headerId) {
        const data = await this.overtimeService.getDayToProrate(payload || [], companyId);
        return { data };
    }
    async getOvertimeHeaderEmployees(companyId, headerId, overtimeDetailIds = []) {
        const data = await this.overtimeService.getDayToProrateOfEmployeeOvertimeHeader(companyId, headerId, overtimeDetailIds);
        return { data };
    }
};
exports.OvertimeController = OvertimeController;
__decorate([
    (0, common_1.Post)('/headers/:headerId/day-to-prorate'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get day to prorate of employee',
        description: 'Get day to prorate of employee',
    }),
    (0, swagger_1.ApiResponse)({ type: day_to_prorate_dto_1.DayToProrateResponse }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, iam_1.ActiveUser)('userEmail')),
    __param(2, (0, common_1.Param)('companyId')),
    __param(3, (0, common_1.Param)('headerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String, Number, Number]),
    __metadata("design:returntype", Promise)
], OvertimeController.prototype, "getDayToProrate", null);
__decorate([
    (0, common_1.Get)('/headers/:headerId/day-to-prorate-emp'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get days to prorate of employees in overtime header',
        description: 'Get days to prorate of employees in overtime header',
    }),
    (0, swagger_1.ApiResponse)({ type: day_to_prorate_dto_1.DayToProrateResponse }),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, common_1.Param)('headerId')),
    __param(2, (0, common_1.Query)('overtimeDetailIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array]),
    __metadata("design:returntype", Promise)
], OvertimeController.prototype, "getOvertimeHeaderEmployees", null);
exports.OvertimeController = OvertimeController = __decorate([
    (0, swagger_1.ApiTags)('overtime-details'),
    (0, common_1.Controller)({ path: 'v1/OvertimeDetails/:companyId' }),
    __metadata("design:paramtypes", [overtime_service_1.OvertimeService])
], OvertimeController);
//# sourceMappingURL=overtime.controller.js.map
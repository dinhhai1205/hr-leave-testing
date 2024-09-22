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
exports.TawiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../../common/enums");
const iam_1 = require("../../../../core/iam");
const get_statutory_tawi_report_query_dto_1 = require("./dtos/get-statutory-tawi-report-query.dto");
const tawi_service_1 = require("./tawi.service");
let TawiController = class TawiController {
    constructor(tawiService) {
        this.tawiService = tawiService;
    }
    async getStatutoryPdfReport(companyId, { language, year }, req) {
        return this.tawiService.getStatutoryPdfReport({
            companyId,
            req,
            lang: language,
            year,
        });
    }
};
exports.TawiController = TawiController;
__decorate([
    (0, common_1.Get)('th/statutory/:companyId/tawi'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EXPORT),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, get_statutory_tawi_report_query_dto_1.GetStatutoryTawiReportQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TawiController.prototype, "getStatutoryPdfReport", null);
exports.TawiController = TawiController = __decorate([
    (0, swagger_1.ApiTags)('pdf-report'),
    (0, common_1.Controller)('pdf-report'),
    (0, iam_1.ModuleMode)(enums_1.EApiModuleMode.StatutoryReport),
    __metadata("design:paramtypes", [tawi_service_1.TawiService])
], TawiController);
//# sourceMappingURL=tawi.controller.js.map
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
exports.CompanyMappingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const time_tracker_path_constant_1 = require("../../common/constants/time-tracker-path.constant");
const time_tracker_emp_info_decorator_1 = require("../../common/decorators/time-tracker-emp-info.decorator");
const company_mapping_service_1 = require("./company-mapping.service");
const create_company_mapping_dto_1 = require("./dtos/create-company-mapping.dto");
let CompanyMappingController = class CompanyMappingController {
    constructor(companyMappingService) {
        this.companyMappingService = companyMappingService;
    }
    async create(companyId, { apiKey }, { timeTrackerCompanyId }) {
        return this.companyMappingService.createManyCompanyMappings([
            { apiKey, companyId, timeTrackerCompanyId },
        ]);
    }
};
exports.CompanyMappingController = CompanyMappingController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_company_mapping_dto_1.CreateCompanyMappingDto }),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_company_mapping_dto_1.CreateCompanyMappingDto, Object]),
    __metadata("design:returntype", Promise)
], CompanyMappingController.prototype, "create", null);
exports.CompanyMappingController = CompanyMappingController = __decorate([
    (0, swagger_1.ApiTags)(time_tracker_path_constant_1.PROJECT_API_TAG),
    (0, common_1.Controller)({ path: 'time-tracker/company-mapping' }),
    __metadata("design:paramtypes", [company_mapping_service_1.CompanyMappingService])
], CompanyMappingController);
//# sourceMappingURL=company-mapping.controller.js.map
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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../common/decorators");
const enums_1 = require("../../../../common/enums");
const utils_1 = require("../../../../common/utils");
const iam_1 = require("../../../../core/iam");
const enums_2 = require("../../../../core/iam/enums");
const file_support_constant_1 = require("../../common/constants/file-support.constant");
const time_tracker_path_constant_1 = require("../../common/constants/time-tracker-path.constant");
const company_service_1 = require("./company.service");
const dtos_1 = require("./dtos");
const time_tracker_emp_info_decorator_1 = require("../../common/decorators/time-tracker-emp-info.decorator");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async isExistedCompanyMapping(companyId) {
        return this.companyService.isExistedCompanyMapping(companyId);
    }
    createSyncCompany(companyId) {
        return this.companyService.createSyncCompanyService(companyId);
    }
    findOneCompany(companyId, { timeTrackerCompanyId, timeTrackerGroupId }) {
        return this.companyService.getCompanyById({
            companyId: timeTrackerCompanyId,
        });
    }
    updateCompany(companyId, file, body, { timeTrackerCompanyId }) {
        return this.companyService.updateCompany({
            body,
            file,
        }, {
            companyId: timeTrackerCompanyId,
        });
    }
    removeCompany(companyId, { timeTrackerCompanyId }) {
        return this.companyService.deleteCompany({
            companyId: timeTrackerCompanyId,
        });
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.Get)(':companyId/is-existed-company-mapping'),
    __param(0, (0, common_1.Param)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "isExistedCompanyMapping", null);
__decorate([
    (0, common_1.Post)('/:companyId/sync-company-data'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create new company',
    }),
    (0, iam_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiResponse)({ type: dtos_1.CompanyResponseDto }),
    __param(0, (0, common_1.Param)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "createSyncCompany", null);
__decorate([
    (0, common_1.Get)(':companyId'),
    (0, iam_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get company detail',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.CompanyResponseDto }),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "findOneCompany", null);
__decorate([
    (0, common_1.Patch)(':companyId'),
    (0, iam_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Edit company',
    }),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        multerOptions: {
            limits: { fileSize: 25 * enums_1.StorageUnitInByte.OneMb },
            fileFilter: (0, utils_1.filesSupportedFilter)(file_support_constant_1.FILES_SUPPORTED),
        },
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.UpdateCompanyDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.CompanyResponseDto }),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, common_1.UploadedFile)('file')),
    __param(2, (0, common_1.UploadedFile)('body')),
    __param(3, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, dtos_1.UpdateCompanyDto, Object]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "updateCompany", null);
__decorate([
    (0, common_1.Delete)(':companyId'),
    (0, iam_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete company',
    }),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "removeCompany", null);
exports.CompanyController = CompanyController = __decorate([
    (0, swagger_1.ApiTags)(time_tracker_path_constant_1.COMPANY_API_TAG),
    (0, common_1.Controller)({ path: time_tracker_path_constant_1.COMPANY_API_PATH }),
    __metadata("design:paramtypes", [company_service_1.TimeTrackerCompanyService])
], CompanyController);
//# sourceMappingURL=company.controller.js.map
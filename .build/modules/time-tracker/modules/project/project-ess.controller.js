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
exports.ProjectEssController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../../common/dto");
const enums_1 = require("../../../../common/enums");
const common_2 = require("../../common");
const project_service_1 = require("./project.service");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
const iam_1 = require("../../../../core/iam");
let ProjectEssController = class ProjectEssController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    getListProjectOfEmployee({ companyId }, employeeId) {
        console.log('employeeId', employeeId);
        return this.projectService.getProjectByEmployeeId({
            companyId,
            employeeId,
        });
    }
};
exports.ProjectEssController = ProjectEssController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({
        summary: 'Get list project employee',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, iam_1.ActiveEss)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Number]),
    __metadata("design:returntype", void 0)
], ProjectEssController.prototype, "getListProjectOfEmployee", null);
exports.ProjectEssController = ProjectEssController = __decorate([
    (0, swagger_1.ApiTags)(common_2.PROJECT_ESS_API_TAG),
    (0, common_1.Controller)({ path: common_2.PROJECT_ESS_API_PATH }),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectEssController);
//# sourceMappingURL=project-ess.controller.js.map
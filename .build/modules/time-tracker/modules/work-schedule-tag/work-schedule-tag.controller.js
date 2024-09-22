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
exports.WorkScheduleTagController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../../common");
const common_2 = require("@nestjs/common");
const work_schedule_tag_service_1 = require("./work-schedule-tag.service");
const dtos_1 = require("./dtos");
const iam_1 = require("../../../../core/iam");
const enums_1 = require("../../../../common/enums");
let WorkScheduleTagController = class WorkScheduleTagController {
    constructor(workScheduleTagService) {
        this.workScheduleTagService = workScheduleTagService;
    }
    getTagsOfWorkSchedule(WorkScheduleId, companyId) {
        return this.workScheduleTagService.getTagsOfWorkSchedule(WorkScheduleId, companyId);
    }
    assignTagsForWorkSchedule(createWorkScheduleTagDtos, companyId, userEmail) {
        return this.workScheduleTagService.assignMultipleTagForWorkSchedules(createWorkScheduleTagDtos, companyId, userEmail);
    }
    restoreWorkScheduleTag(removeWorkScheduleTagDtos, companyId, userEmail) {
        return this.workScheduleTagService.updateMultipleWorkScheduleTag(removeWorkScheduleTagDtos.map(removeWorkScheduleTagDto => ({
            ...removeWorkScheduleTagDto,
            isDeleted: false,
        })), companyId, userEmail);
    }
    removeWorkScheduleTag(removeWorkScheduleTagDto, companyId, isArchived, userEmail) {
        const { tagId, workScheduleId } = removeWorkScheduleTagDto;
        return isArchived
            ? this.workScheduleTagService.archiveWorkScheduleTag(tagId, workScheduleId, companyId, userEmail)
            : this.workScheduleTagService.removeWorkScheduleTag(tagId, workScheduleId, companyId);
    }
};
exports.WorkScheduleTagController = WorkScheduleTagController;
__decorate([
    (0, common_2.Get)('/:WorkScheduleId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all tags of Work Schedule',
        description: 'Get all tags of Work Schedule',
    }),
    (0, swagger_1.ApiResponse)({ type: [dtos_1.WorkScheduleTagDto] }),
    __param(0, (0, common_2.Param)('WorkScheduleId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], WorkScheduleTagController.prototype, "getTagsOfWorkSchedule", null);
__decorate([
    (0, common_2.Post)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiOperation)({
        summary: 'Assign tags for Work Schedule',
        description: 'Assign tags for Work Schedule',
    }),
    (0, swagger_1.ApiBody)({ type: [dtos_1.CreateWorkScheduleTagDto] }),
    (0, swagger_1.ApiResponse)({ type: [dtos_1.WorkScheduleTagDto] }),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Query)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, String]),
    __metadata("design:returntype", Promise)
], WorkScheduleTagController.prototype, "assignTagsForWorkSchedule", null);
__decorate([
    (0, common_2.Patch)('/restore'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Restore Work Schedule Tag',
        description: 'Restore Work Schedule Tag',
    }),
    (0, swagger_1.ApiBody)({ type: [dtos_1.RemoveWorkScheduleTagDto] }),
    (0, swagger_1.ApiResponse)({ type: [dtos_1.WorkScheduleTagDto] }),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Query)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, String]),
    __metadata("design:returntype", Promise)
], WorkScheduleTagController.prototype, "restoreWorkScheduleTag", null);
__decorate([
    (0, common_2.Delete)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove or archive a Work Schedule Tag',
        description: 'Remove or archive a Work Schedule Tag',
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.RemoveWorkScheduleTagDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.WorkScheduleTagDto }),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Query)('isArchived', common_2.ParseBoolPipe)),
    __param(3, (0, common_2.Query)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.RemoveWorkScheduleTagDto, Number, Boolean, String]),
    __metadata("design:returntype", Promise)
], WorkScheduleTagController.prototype, "removeWorkScheduleTag", null);
exports.WorkScheduleTagController = WorkScheduleTagController = __decorate([
    (0, swagger_1.ApiTags)(common_1.WORK_SCHEDULE_TAG_API_TAG),
    (0, common_2.Controller)({ path: common_1.WORK_SCHEDULE_TAG_API_PATH }),
    __metadata("design:paramtypes", [work_schedule_tag_service_1.WorkScheduleTagService])
], WorkScheduleTagController);
//# sourceMappingURL=work-schedule-tag.controller.js.map
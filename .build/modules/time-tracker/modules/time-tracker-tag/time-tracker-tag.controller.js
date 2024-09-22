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
exports.TimeTrackerTagController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../../common");
const common_2 = require("@nestjs/common");
const dto_1 = require("../../../../common/dto");
const tag_query_dto_1 = require("./dtos/tag-query.dto");
const iam_1 = require("../../../../core/iam");
const enums_1 = require("../../../../common/enums");
const time_tracker_tag_service_1 = require("./time-tracker-tag.service");
const dtos_1 = require("./dtos");
let TimeTrackerTagController = class TimeTrackerTagController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    getTag(tagId, companyId) {
        return this.tagService.getTagById(tagId, companyId);
    }
    getAllTags(companyId, query) {
        const { keywords, ...paginationQuery } = query;
        return this.tagService.getAllTags(companyId, paginationQuery, keywords);
    }
    createTag(companyId, createTagDto) {
        return this.tagService.createTag(createTagDto, companyId);
    }
    restoreTag(tagId, companyId, userEmail) {
        return this.tagService.restoreTag(tagId, companyId, userEmail);
    }
    updateTag(tagId, companyId, updateTagDto) {
        return this.tagService.updateTag(tagId, updateTagDto, companyId);
    }
    removeTag(tagId, companyId, isArchived, userEmail) {
        return isArchived
            ? this.tagService.archiveTag(tagId, companyId, userEmail)
            : this.tagService.removeTag(tagId, companyId);
    }
};
exports.TimeTrackerTagController = TimeTrackerTagController;
__decorate([
    (0, common_2.Get)('/:tagId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a tag with id',
        description: 'Get a tag with id',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.TagResponseDto }),
    __param(0, (0, common_2.Param)('tagId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TimeTrackerTagController.prototype, "getTag", null);
__decorate([
    (0, common_2.Get)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all tags',
        description: 'Get all tags',
    }),
    (0, swagger_1.ApiResponse)({ type: (dto_1.PaginationResponseDto) }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, tag_query_dto_1.TagQueryDto]),
    __metadata("design:returntype", Promise)
], TimeTrackerTagController.prototype, "getAllTags", null);
__decorate([
    (0, common_2.Post)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new tag',
        description: 'Create a new tag',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.TagResponseDto }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.CreateTagDto]),
    __metadata("design:returntype", void 0)
], TimeTrackerTagController.prototype, "createTag", null);
__decorate([
    (0, common_2.Patch)('/restore/:tagId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Restore a tag',
        description: 'Restore a tag',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.TagResponseDto }),
    __param(0, (0, common_2.Param)('tagId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Query)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], TimeTrackerTagController.prototype, "restoreTag", null);
__decorate([
    (0, common_2.Patch)('/:tagId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Update an existing tag',
        description: 'Update an existing tag',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.TagResponseDto }),
    __param(0, (0, common_2.Param)('tagId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, dtos_1.UpdateTagDto]),
    __metadata("design:returntype", void 0)
], TimeTrackerTagController.prototype, "updateTag", null);
__decorate([
    (0, common_2.Delete)('/:tagId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove or archive a tag',
        description: 'Remove or archive a tag',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.TagResponseDto }),
    __param(0, (0, common_2.Param)('tagId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Query)('isArchived', common_2.ParseBoolPipe)),
    __param(3, (0, common_2.Query)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Boolean, String]),
    __metadata("design:returntype", Promise)
], TimeTrackerTagController.prototype, "removeTag", null);
exports.TimeTrackerTagController = TimeTrackerTagController = __decorate([
    (0, swagger_1.ApiTags)(common_1.TAG_API_TAG),
    (0, common_2.Controller)({ path: common_1.TAG_API_PATH }),
    __metadata("design:paramtypes", [time_tracker_tag_service_1.TimeTrackerTagService])
], TimeTrackerTagController);
//# sourceMappingURL=time-tracker-tag.controller.js.map
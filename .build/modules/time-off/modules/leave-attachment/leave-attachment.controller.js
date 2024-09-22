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
exports.LeaveAttachmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../common/decorators");
const set_authorize_decorator_1 = require("../../../../common/decorators/set-authorize.decorator");
const enums_1 = require("../../../../common/enums");
const file_deldoc_dto_1 = require("./dto/file-deldoc.dto");
const file_encryption_infomation_dto_1 = require("./dto/file-encryption-infomation.dto");
const leave_attachment_query_dto_1 = require("./dto/leave-attachment-query.dto");
const leave_attachment_service_1 = require("./leave-attachment.service");
let LeaveAttachmentController = class LeaveAttachmentController {
    constructor(leaveAttachmentService) {
        this.leaveAttachmentService = leaveAttachmentService;
    }
    async uploadLeaveAttachment(companyId, leaveId, files, body) {
        return this.leaveAttachmentService.uploadLeaveAttachment({ companyId, leaveId, files }, body);
    }
    async deleteLeaveAttachment(companyId, filenames, leaveId) {
        return this.leaveAttachmentService.deleteLeaveAttachment(companyId, filenames, leaveId);
    }
    async getLeaveAttachment(companyId, query, fileNames = []) {
        return this.leaveAttachmentService.getAttachmentContents(companyId, {
            ...query,
            fileNames,
        });
    }
};
exports.LeaveAttachmentController = LeaveAttachmentController;
__decorate([
    (0, common_1.Post)(':companyId/updoc'),
    (0, decorators_1.FilesUpload)({
        singleUpload: false,
        multerOptions: {
            limits: { fileSize: 8 * enums_1.EStorageUnits.MB },
        },
    }),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EDIT, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('leaveId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.UploadedFiles)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array, file_encryption_infomation_dto_1.FileEncryptionInformationDto]),
    __metadata("design:returntype", Promise)
], LeaveAttachmentController.prototype, "uploadLeaveAttachment", null);
__decorate([
    (0, common_1.Delete)(':companyId/deldoc'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a leave supporting document' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiBody)({ type: file_deldoc_dto_1.FileDelDocBodyDto }),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.DELETE, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('fileNames', new common_1.ParseArrayPipe({ items: String, separator: ',' }))),
    __param(2, (0, common_1.Query)('leaveId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Number]),
    __metadata("design:returntype", Promise)
], LeaveAttachmentController.prototype, "deleteLeaveAttachment", null);
__decorate([
    (0, common_1.Get)(':companyId/downdoc'),
    (0, swagger_1.ApiOperation)({ summary: 'Download a claim supporting document' }),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)('fileNames', new common_1.ParseArrayPipe({ items: String, separator: ',', optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, leave_attachment_query_dto_1.LeaveAttachmentQueryDto, Array]),
    __metadata("design:returntype", Promise)
], LeaveAttachmentController.prototype, "getLeaveAttachment", null);
exports.LeaveAttachmentController = LeaveAttachmentController = __decorate([
    (0, swagger_1.ApiTags)('leave-attachment'),
    (0, common_1.Controller)('leave-attachment'),
    __metadata("design:paramtypes", [leave_attachment_service_1.LeaveAttachmentService])
], LeaveAttachmentController);
//# sourceMappingURL=leave-attachment.controller.js.map
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
exports.FolderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../common/decorators");
const dto_1 = require("../../../../common/dto");
const enums_1 = require("../../../../common/enums");
const authentication_1 = require("../../../../core/iam/authentication");
const decorators_2 = require("../../../../core/iam/decorators");
const enums_2 = require("../../../../core/iam/enums");
const constants_1 = require("../../constants");
const create_folder_body_dto_1 = require("./dtos/create-folder-body.dto");
const folder_response_dto_1 = require("./dtos/folder-response.dto");
const folder_service_1 = require("./folder.service");
let FolderController = class FolderController {
    constructor(folderService) {
        this.folderService = folderService;
    }
    async createFolder({ companyId }, body, { userEmail }) {
        return this.folderService.createFolder({ ...body, companyId, userEmail });
    }
    async getAllFolders({ companyId }, query) {
        return this.folderService.getAllFolders({ ...query, companyId });
    }
};
exports.FolderController = FolderController;
__decorate([
    (0, common_1.Post)(),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiResponse)({ type: folder_response_dto_1.FolderResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        create_folder_body_dto_1.CreateFolderBodyDto, Object]),
    __metadata("design:returntype", Promise)
], FolderController.prototype, "createFolder", null);
__decorate([
    (0, common_1.Get)(),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, decorators_1.ApiOkResponsePaginated)(folder_response_dto_1.FolderResponseDto),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], FolderController.prototype, "getAllFolders", null);
exports.FolderController = FolderController = __decorate([
    (0, swagger_1.ApiTags)(constants_1.FOLDER_API_TAG_V1),
    (0, common_1.Controller)(constants_1.FOLDER_API_PATH_V1),
    (0, decorators_2.ModuleMode)(enums_1.EApiModuleMode.ESign),
    __metadata("design:paramtypes", [folder_service_1.FolderService])
], FolderController);
//# sourceMappingURL=folder.controller.js.map
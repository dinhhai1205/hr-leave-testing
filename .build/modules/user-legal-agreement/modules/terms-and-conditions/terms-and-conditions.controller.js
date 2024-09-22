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
exports.TermsAndConditionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../common/decorators");
const enums_1 = require("../../../../common/enums");
const iam_1 = require("../../../../core/iam");
const terms_and_conditions_create_dto_1 = require("./dto/terms-and-conditions-create.dto");
const terms_and_conditions_update_dto_1 = require("./dto/terms-and-conditions-update.dto");
const terms_and_conditions_service_1 = require("./terms-and-conditions.service");
let TermsAndConditionsController = class TermsAndConditionsController {
    constructor(termsAndConditionsService) {
        this.termsAndConditionsService = termsAndConditionsService;
    }
    async getLatestTermsAndConditions() {
        const result = await this.termsAndConditionsService.getLatestTermsAndConditions();
        return result?.version;
    }
    async getLatestTermsAndConditionsContent() {
        return this.termsAndConditionsService.getLatestTermsAndConditionsContent();
    }
    async uploadTermsAndConditions(file) {
        return this.termsAndConditionsService.uploadTermsAndConditions(file);
    }
    async createTermAndConditions(body) {
        return this.termsAndConditionsService.createTermAndConditions(body);
    }
    async updateTermAndConditions(id, body) {
        return this.termsAndConditionsService.updateTermsAndConditions(id, body);
    }
    async deleteTermAndConditions(id) {
        return this.termsAndConditionsService.deleteTermsAndConditions(id);
    }
};
exports.TermsAndConditionsController = TermsAndConditionsController;
__decorate([
    (0, common_1.Get)('/version'),
    (0, iam_1.Auth)(iam_1.AuthType.None),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TermsAndConditionsController.prototype, "getLatestTermsAndConditions", null);
__decorate([
    (0, common_1.Get)(),
    (0, iam_1.Auth)(iam_1.AuthType.None),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TermsAndConditionsController.prototype, "getLatestTermsAndConditionsContent", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        multerOptions: { limits: { fileSize: 5 * enums_1.EStorageUnits.MB } },
        summary: 'Upload Terms And Conditions supporting document as attachment',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.ApiKey),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TermsAndConditionsController.prototype, "uploadTermsAndConditions", null);
__decorate([
    (0, common_1.Post)(),
    (0, iam_1.Auth)(iam_1.AuthType.ApiKey),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [terms_and_conditions_create_dto_1.TermsAndConditionsCreateDto]),
    __metadata("design:returntype", Promise)
], TermsAndConditionsController.prototype, "createTermAndConditions", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, iam_1.Auth)(iam_1.AuthType.ApiKey),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, terms_and_conditions_update_dto_1.TermsAndConditionsUpdateDto]),
    __metadata("design:returntype", Promise)
], TermsAndConditionsController.prototype, "updateTermAndConditions", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, iam_1.Auth)(iam_1.AuthType.ApiKey),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TermsAndConditionsController.prototype, "deleteTermAndConditions", null);
exports.TermsAndConditionsController = TermsAndConditionsController = __decorate([
    (0, common_1.Controller)('terms-and-conditions'),
    (0, swagger_1.ApiTags)('terms-and-conditions'),
    __metadata("design:paramtypes", [terms_and_conditions_service_1.TermsAndConditionsService])
], TermsAndConditionsController);
//# sourceMappingURL=terms-and-conditions.controller.js.map
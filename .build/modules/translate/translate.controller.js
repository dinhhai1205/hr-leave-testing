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
exports.TranslateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../common/constants");
const decorators_1 = require("../../common/decorators");
const iam_1 = require("../../core/iam");
const get_translated_file_dto_1 = require("./dto/get-translated-file.dto");
const translate_service_1 = require("./translate.service");
let TranslateController = class TranslateController {
    constructor(translateService) {
        this.translateService = translateService;
    }
    async getTranslatedFile(file, query) {
        return this.translateService.getTranslatedFile(file, query);
    }
    async getTranslatedText(text, query) {
        return this.translateService.translateText(text, query);
    }
    async compareChanges(files) {
        return this.translateService.compareChanges(files);
    }
};
exports.TranslateController = TranslateController;
__decorate([
    (0, common_1.Post)('document'),
    (0, iam_1.Auth)(iam_1.AuthType.ApiKey),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        multerOptions: {
            fileFilter(_, file, callback) {
                if (!file || file.mimetype !== constants_1.CONTENT_TYPE.JSON) {
                    callback(new common_1.BadRequestException('Uploaded file must be JSON'), false);
                }
                callback(null, true);
            },
        },
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_translated_file_dto_1.GetTranslatedFileDto]),
    __metadata("design:returntype", Promise)
], TranslateController.prototype, "getTranslatedFile", null);
__decorate([
    (0, common_1.Post)('text'),
    (0, iam_1.Auth)(iam_1.AuthType.ApiKey),
    __param(0, (0, common_1.Query)('text')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_translated_file_dto_1.GetTranslatedFileDto]),
    __metadata("design:returntype", Promise)
], TranslateController.prototype, "getTranslatedText", null);
__decorate([
    (0, common_1.Post)('compare-changes'),
    (0, iam_1.Auth)(iam_1.AuthType.ApiKey),
    (0, decorators_1.FilesUpload)({
        singleUpload: false,
        maxFileCount: 2,
        summary: 'The first file will be old file',
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], TranslateController.prototype, "compareChanges", null);
exports.TranslateController = TranslateController = __decorate([
    (0, swagger_1.ApiTags)('translate'),
    (0, common_1.Controller)('translate'),
    __metadata("design:paramtypes", [translate_service_1.TranslateService])
], TranslateController);
//# sourceMappingURL=translate.controller.js.map
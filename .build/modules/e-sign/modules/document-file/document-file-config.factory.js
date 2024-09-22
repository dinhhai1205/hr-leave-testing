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
exports.DocumentFileConfigFactory = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../../../common/enums");
const config_1 = require("../../../../config");
const aws_1 = require("../../../../libs/aws");
const constants_1 = require("./constants");
let DocumentFileConfigFactory = class DocumentFileConfigFactory {
    constructor(appConfig, documentFileModuleOptions) {
        this.appConfig = appConfig;
        this.documentFileModuleOptions = documentFileModuleOptions;
    }
    createAwsS3Options() {
        const { nodeEnv } = this.appConfig;
        const options = this.documentFileModuleOptions;
        const isProd = nodeEnv === enums_1.ENodeEnv.PRODUCTION;
        let bucketName = options.bucketName || aws_1.EAwsS3BucketServiceName.UserObjectsPrivate;
        bucketName = isProd ? bucketName : `${bucketName}.dev`;
        const objectKeyPrefix = options.objectKeyPrefix || aws_1.AWS_S3_MODULE_FOLDER_NAME.E_SIGN_DOCUMENT_FILE;
        return { bucketName, objectKeyPrefix };
    }
};
exports.DocumentFileConfigFactory = DocumentFileConfigFactory;
exports.DocumentFileConfigFactory = DocumentFileConfigFactory = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, config_1.InjectAppConfig)()),
    __param(1, (0, common_1.Inject)(constants_1.DOCUMENT_FILE_MODULE_OPTIONS_KEY)),
    __metadata("design:paramtypes", [Object, Object])
], DocumentFileConfigFactory);
//# sourceMappingURL=document-file-config.factory.js.map
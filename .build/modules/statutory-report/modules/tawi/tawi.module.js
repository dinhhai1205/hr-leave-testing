"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TawiModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const enums_1 = require("../../../../common/enums");
const config_2 = require("../../../../config");
const aws_1 = require("../../../../libs/aws");
const tawi_controller_1 = require("./tawi.controller");
const tawi_service_1 = require("./tawi.service");
const tawi_tax_certificate_template_util_1 = require("./utils/tawi-tax-certificate-template.util");
let TawiModule = class TawiModule {
};
exports.TawiModule = TawiModule;
exports.TawiModule = TawiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            config_1.ConfigModule.forFeature(config_2.hrforteApiConfig),
            aws_1.AwsS3Module.registerAsync({
                useFactory: (config) => {
                    const { nodeEnv } = config;
                    return {
                        bucketName: nodeEnv === enums_1.ENodeEnv.PRODUCTION
                            ? aws_1.EAwsS3BucketServiceName.SystemObjects
                            : `${aws_1.EAwsS3BucketServiceName.SystemObjects}.dev`,
                        objectKeyPrefix: aws_1.AWS_S3_MODULE_FOLDER_NAME.FONT,
                    };
                },
                inject: [config_2.appConfig.KEY],
            }),
        ],
        providers: [tawi_service_1.TawiService, tawi_tax_certificate_template_util_1.TawiTaxCertificateTemplateUtil],
        controllers: [tawi_controller_1.TawiController],
    })
], TawiModule);
//# sourceMappingURL=tawi.module.js.map
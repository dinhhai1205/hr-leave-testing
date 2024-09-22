"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsTranslateModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const aws_config_1 = require("../../../config/aws.config");
const aws_translate_service_1 = require("./aws-translate.service");
let AwsTranslateModule = class AwsTranslateModule {
};
exports.AwsTranslateModule = AwsTranslateModule;
exports.AwsTranslateModule = AwsTranslateModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forFeature(aws_config_1.awsConfig)],
        providers: [aws_translate_service_1.AwsTranslateService],
        exports: [aws_translate_service_1.AwsTranslateService],
    })
], AwsTranslateModule);
//# sourceMappingURL=aws-translate.module.js.map
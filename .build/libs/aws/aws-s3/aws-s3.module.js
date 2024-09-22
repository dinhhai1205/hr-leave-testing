"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AwsS3Module_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3Module = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const aws_config_1 = require("../../../config/aws.config");
const aws_s3_provider_1 = require("./aws-s3.provider");
const aws_s3_service_1 = require("./aws-s3.service");
const aws_s3_module_definition_1 = require("./constants/aws-s3-module.definition");
const aws_s3_options_key_constant_1 = require("./constants/aws-s3-options-key.constant");
let AwsS3Module = AwsS3Module_1 = class AwsS3Module extends aws_s3_module_definition_1.ConfigurableModuleClass {
    static register(options) {
        return {
            module: AwsS3Module_1,
            providers: [...(0, aws_s3_provider_1.createAwsS3Provider)(options || {})],
        };
    }
    static registerAsync(options) {
        const registerAsyncImports = [];
        if (options.imports) {
            registerAsyncImports.push(...options.imports);
        }
        return {
            module: AwsS3Module_1,
            imports: registerAsyncImports,
            providers: [...this.createAsyncProviders(options)],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const providers = [this.createAsyncOptionsProvider(options)];
        if (options.provideInjectionTokensFrom) {
            providers.push(...options.provideInjectionTokensFrom);
        }
        if (options.useClass) {
            providers.push({
                provide: options.useClass,
                useClass: options.useClass,
            });
        }
        return providers;
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: aws_s3_options_key_constant_1.AWS_S3_OPTIONS_KEY,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const injectOptionsFactory = [];
        const classOptions = options.useExisting || options.useClass;
        if (classOptions) {
            injectOptionsFactory.push(classOptions);
        }
        return {
            provide: aws_s3_options_key_constant_1.AWS_S3_OPTIONS_KEY,
            useFactory: async (optionsFactory) => optionsFactory.createAwsS3Options(),
            inject: injectOptionsFactory,
        };
    }
};
exports.AwsS3Module = AwsS3Module;
exports.AwsS3Module = AwsS3Module = AwsS3Module_1 = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forFeature(aws_config_1.awsConfig)],
        providers: [aws_s3_service_1.AwsS3Service],
        exports: [aws_s3_service_1.AwsS3Service],
    })
], AwsS3Module);
//# sourceMappingURL=aws-s3.module.js.map
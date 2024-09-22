"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermsAndConditionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../../../core/database/entities");
const aws_1 = require("../../../../libs/aws");
const terms_and_conditions_controller_1 = require("./terms-and-conditions.controller");
const terms_and_conditions_service_1 = require("./terms-and-conditions.service");
let TermsAndConditionsModule = class TermsAndConditionsModule {
};
exports.TermsAndConditionsModule = TermsAndConditionsModule;
exports.TermsAndConditionsModule = TermsAndConditionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.TermsAndConditionsEntity]),
            aws_1.AwsS3Module.register({ bucketName: aws_1.EAwsS3BucketServiceName.General }),
        ],
        providers: [terms_and_conditions_service_1.TermsAndConditionsService],
        controllers: [terms_and_conditions_controller_1.TermsAndConditionsController],
        exports: [terms_and_conditions_service_1.TermsAndConditionsService],
    })
], TermsAndConditionsModule);
//# sourceMappingURL=terms-and-conditions.module.js.map
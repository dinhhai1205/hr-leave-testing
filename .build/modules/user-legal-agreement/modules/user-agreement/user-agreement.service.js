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
exports.UserAgreementService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enums_1 = require("../../../../common/enums");
const entities_1 = require("../../../../core/database/entities");
const terms_and_conditions_service_1 = require("../terms-and-conditions/terms-and-conditions.service");
let UserAgreementService = class UserAgreementService {
    constructor(repo, termsAndConditionsService) {
        this.repo = repo;
        this.termsAndConditionsService = termsAndConditionsService;
    }
    async getUserAgreement(email) {
        const { id } = await this.termsAndConditionsService.getLatestTermsAndConditions();
        const userAgreement = await this.repo.findOne({
            where: { email, termsAndConditionsId: id, isDeleted: false },
            select: { id: true, agreeAt: true },
        });
        if (!userAgreement)
            return false;
        return userAgreement?.agreeAt ? true : false;
    }
    async update(action, email) {
        const { id } = await this.termsAndConditionsService.getLatestTermsAndConditions();
        const userAgreement = await this.repo.findOne({
            where: { email, termsAndConditionsId: id, isDeleted: false },
        });
        const input = { email, termsAndConditionsId: id };
        if (userAgreement) {
            input.id = userAgreement.id;
        }
        switch (action) {
            case enums_1.EUserAgreementActions.AGREE:
                input.isDeleted = false;
                input.createdBy = enums_1.EDefaultEmail.HRF_LEAVE;
                input.createdOn = new Date();
                input.agreeAt = new Date();
                break;
            case enums_1.EUserAgreementActions.DECLINE:
                input.updatedBy = enums_1.EDefaultEmail.HRF_LEAVE;
                input.updatedOn = new Date();
                break;
            default:
                break;
        }
        return this.repo.save(input);
    }
};
exports.UserAgreementService = UserAgreementService;
exports.UserAgreementService = UserAgreementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.UserAgreementEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        terms_and_conditions_service_1.TermsAndConditionsService])
], UserAgreementService);
//# sourceMappingURL=user-agreement.service.js.map
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
exports.UserAgreementController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../common/decorators");
const enums_1 = require("../../../../common/enums");
const update_user_agreement_dto_1 = require("./dto/update-user-agreement.dto");
const user_agreement_service_1 = require("./user-agreement.service");
let UserAgreementController = class UserAgreementController {
    constructor(userAgreementService) {
        this.userAgreementService = userAgreementService;
    }
    async getUserAgreement(email) {
        return this.userAgreementService.getUserAgreement(email);
    }
    async updateUserAgreement({ action }, { email }) {
        return this.userAgreementService.update(action, email);
    }
};
exports.UserAgreementController = UserAgreementController;
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.SkipFlag)(enums_1.ESkipFlag.AUTHORIZATION),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserAgreementController.prototype, "getUserAgreement", null);
__decorate([
    (0, common_1.Post)('/:action'),
    (0, decorators_1.SkipFlag)(enums_1.ESkipFlag.AUTHORIZATION),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_agreement_dto_1.UpdateUserAgreementActionDto,
        update_user_agreement_dto_1.UpdateUserAgreementBodyDto]),
    __metadata("design:returntype", Promise)
], UserAgreementController.prototype, "updateUserAgreement", null);
exports.UserAgreementController = UserAgreementController = __decorate([
    (0, swagger_1.ApiTags)('user-agreement'),
    (0, common_1.Controller)('user-agreement'),
    __metadata("design:paramtypes", [user_agreement_service_1.UserAgreementService])
], UserAgreementController);
//# sourceMappingURL=user-agreement.controller.js.map
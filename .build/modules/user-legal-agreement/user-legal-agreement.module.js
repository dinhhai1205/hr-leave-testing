"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLegalAgreement = void 0;
const common_1 = require("@nestjs/common");
const terms_and_conditions_module_1 = require("./modules/terms-and-conditions/terms-and-conditions.module");
const user_agreement_module_1 = require("./modules/user-agreement/user-agreement.module");
let UserLegalAgreement = class UserLegalAgreement {
};
exports.UserLegalAgreement = UserLegalAgreement;
exports.UserLegalAgreement = UserLegalAgreement = __decorate([
    (0, common_1.Module)({
        imports: [terms_and_conditions_module_1.TermsAndConditionsModule, user_agreement_module_1.UserAgreementModule],
    })
], UserLegalAgreement);
//# sourceMappingURL=user-legal-agreement.module.js.map
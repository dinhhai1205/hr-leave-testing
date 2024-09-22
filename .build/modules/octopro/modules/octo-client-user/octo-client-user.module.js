"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OctoClientUserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const octo_client_user_enttity_1 = require("../../../../core/database/entities/octo-client-user.enttity");
const octo_client_user_service_1 = require("./octo-client-user.service");
let OctoClientUserModule = class OctoClientUserModule {
};
exports.OctoClientUserModule = OctoClientUserModule;
exports.OctoClientUserModule = OctoClientUserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([octo_client_user_enttity_1.OctoClientUserEntity])],
        providers: [octo_client_user_service_1.OctoClientUserService],
        exports: [octo_client_user_service_1.OctoClientUserService],
    })
], OctoClientUserModule);
//# sourceMappingURL=octo-client-user.module.js.map
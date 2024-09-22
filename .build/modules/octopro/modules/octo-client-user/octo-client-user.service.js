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
exports.OctoClientUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const octo_client_user_enttity_1 = require("../../../../core/database/entities/octo-client-user.enttity");
const services_1 = require("../../../../core/database/services");
let OctoClientUserService = class OctoClientUserService extends services_1.LegacyBaseService {
    constructor(octoClientUserRepository) {
        super(octoClientUserRepository);
        this.octoClientUserRepository = octoClientUserRepository;
    }
};
exports.OctoClientUserService = OctoClientUserService;
exports.OctoClientUserService = OctoClientUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(octo_client_user_enttity_1.OctoClientUserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OctoClientUserService);
//# sourceMappingURL=octo-client-user.service.js.map
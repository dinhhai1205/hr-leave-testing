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
exports.UsdForexService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usd_forex_entity_1 = require("../../../../core/database/entities/usd-forex.entity");
const services_1 = require("../../../../core/database/services");
let UsdForexService = class UsdForexService extends services_1.LegacyBaseService {
    constructor(usdForexRepository) {
        super(usdForexRepository);
        this.usdForexRepository = usdForexRepository;
    }
    async getExchangeRate(currencyCode) {
        const exchangeRate = await this.usdForexRepository.findOne({
            where: { currencyCode },
            select: { rate: true },
        });
        if (!exchangeRate || !exchangeRate.rate) {
            throw new common_1.NotFoundException(`Exchange rate #${currencyCode} not found`);
        }
        return exchangeRate.rate;
    }
    async getExchangeRates(currencyCodes) {
        return this.usdForexRepository.find({
            where: { currencyCode: (0, typeorm_2.In)(currencyCodes) },
            select: { rate: true, currencyCode: true },
        });
    }
};
exports.UsdForexService = UsdForexService;
exports.UsdForexService = UsdForexService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usd_forex_entity_1.UsdForexEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsdForexService);
//# sourceMappingURL=usd-forex.service.js.map
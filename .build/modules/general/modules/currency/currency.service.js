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
exports.CurrencyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const currency_entity_1 = require("../../../../core/database/entities/currency.entity");
let CurrencyService = class CurrencyService {
    constructor(currencyRepository) {
        this.currencyRepository = currencyRepository;
    }
    async setCurrencyCodeForPayrollReport(payrollReports) {
        const currencyIds = [];
        for (const payrollReport of payrollReports) {
            if (payrollReport?.Employee?.ContractCurrencyId) {
                currencyIds.push(payrollReport.Employee.ContractCurrencyId);
            }
        }
        const currencies = await this.currencyRepository.find({
            where: {
                isDeleted: false,
                id: (0, typeorm_2.In)(currencyIds),
            },
            select: { id: true, code: true },
        });
        if (!currencies.length)
            return;
        const currenciesTable = currencies.reduce((table, currency) => {
            Object.assign(table, { [currency.id]: currency.code });
            return table;
        }, {});
        for (let i = 0; i < payrollReports.length; i++) {
            const payrollReport = payrollReports[i];
            const contactCurrencyId = payrollReport?.Employee?.ContractCurrencyId;
            if (!contactCurrencyId)
                continue;
            const currencyCode = currenciesTable[contactCurrencyId];
            payrollReports[i].Employee.ContractCurrencyId = currencyCode;
        }
    }
};
exports.CurrencyService = CurrencyService;
exports.CurrencyService = CurrencyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(currency_entity_1.CurrencyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CurrencyService);
//# sourceMappingURL=currency.service.js.map
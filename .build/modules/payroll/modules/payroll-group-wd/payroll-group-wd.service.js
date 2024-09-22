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
exports.PayRollGroupWorkDayService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payroll_group_wd_entity_1 = require("../../../../core/database/entities/payroll-group-wd.entity");
const services_1 = require("../../../../core/database/services");
let PayRollGroupWorkDayService = class PayRollGroupWorkDayService extends services_1.LegacyBaseService {
    constructor(payrollGroupWorkDayRepository) {
        super(payrollGroupWorkDayRepository);
        this.payrollGroupWorkDayRepository = payrollGroupWorkDayRepository;
    }
    async getPayrollGroupWorkDayTable(payload) {
        const payrollGroupWorkDays = payload.payrollGroupWorkDays?.length
            ? payload.payrollGroupWorkDays
            : await this.getPayrollGroupWordDayIfNotProvided(payload);
        const payrollGroupWorkDaysTable = payrollGroupWorkDays.reduce((result, payrollGroupWorkDay) => {
            if (payrollGroupWorkDay) {
                Object.assign(result, {
                    [payrollGroupWorkDay.year]: payrollGroupWorkDay,
                });
            }
            return result;
        }, {});
        return payrollGroupWorkDaysTable;
    }
    async getPayrollGroupWordDayIfNotProvided(payload) {
        const { dateFromMoment, dateToMoment, payrollGroupId } = payload;
        const payrollGroupWorkDayQueriesTable = {};
        for (let fromMoment = dateFromMoment.clone(); fromMoment.isSameOrBefore(dateToMoment); fromMoment.add(1, 'day')) {
            const currentYear = fromMoment.year();
            const currentDayOfYear = fromMoment.dayOfYear();
            let query = payrollGroupWorkDayQueriesTable[currentYear];
            if (query) {
                Object.assign(query.select, { [`value_${currentDayOfYear}`]: true });
            }
            else {
                query = {
                    where: { year: currentYear, payrollGroupId, isDeleted: false },
                    select: { id: true, year: true, [`value_${currentDayOfYear}`]: true },
                };
            }
            payrollGroupWorkDayQueriesTable[currentYear] = query;
        }
        const payrollGroupWorkDayPromises = [];
        for (const [, query] of Object.entries(payrollGroupWorkDayQueriesTable)) {
            payrollGroupWorkDayPromises.push(this.payrollGroupWorkDayRepository.findOne({
                where: query.where,
                select: query.select,
            }));
        }
        return Promise.all(payrollGroupWorkDayPromises);
    }
};
exports.PayRollGroupWorkDayService = PayRollGroupWorkDayService;
exports.PayRollGroupWorkDayService = PayRollGroupWorkDayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payroll_group_wd_entity_1.PayrollGroupWorkDayEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PayRollGroupWorkDayService);
//# sourceMappingURL=payroll-group-wd.service.js.map
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
exports.PublicHolidayService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../common/constants");
const utils_1 = require("../../../../common/utils");
const database_1 = require("../../../../core/database");
const public_holiday_entity_1 = require("../../../../core/database/entities/public-holiday.entity");
const services_1 = require("../../../../core/database/services");
let PublicHolidayService = class PublicHolidayService extends services_1.LegacyBaseService {
    constructor(publicHolidayRepository) {
        super(publicHolidayRepository);
        this.publicHolidayRepository = publicHolidayRepository;
    }
    async getAllPublicHolidaysTableInDateRange(payload) {
        let { publicHolidays } = payload;
        if (!publicHolidays) {
            publicHolidays = await this.getAllPublicHolidaysInDateRange(payload);
        }
        return publicHolidays.reduce((table, holiday) => {
            const { year, date } = holiday;
            const dateString = moment.utc(date).format(constants_1.DATE_STRING);
            const currentHoliday = table[year];
            if (currentHoliday) {
                Object.assign(table[year], { [dateString]: holiday });
            }
            else {
                Object.assign(table, {
                    [year]: { [dateString]: holiday },
                });
            }
            return table;
        }, {});
    }
    async getAllPublicHolidaysInDateRange(payload) {
        const { companyId, dateFromString, dateToString } = payload;
        const publicHolidayAlias = (0, utils_1.aliasEntity)(public_holiday_entity_1.PublicHolidayEntity);
        const queryBuilder = (0, database_1.createPluginQueryBuilder)(publicHolidayAlias, this.publicHolidayRepository);
        const publicHolidays = await queryBuilder
            .andDeletedIs(false)
            .andActiveIs(true)
            .andCompanyIdIs(companyId)
            .getQueryBuilder()
            .andWhere(`${publicHolidayAlias}.date >= :dateFromString`, {
            dateFromString,
        })
            .andWhere(`${publicHolidayAlias}.date <= :dateToString`, {
            dateToString,
        })
            .select([
            `${publicHolidayAlias}.id`,
            `${publicHolidayAlias}.date`,
            `${publicHolidayAlias}.year`,
        ])
            .getMany();
        return publicHolidays;
    }
};
exports.PublicHolidayService = PublicHolidayService;
exports.PublicHolidayService = PublicHolidayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(public_holiday_entity_1.PublicHolidayEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PublicHolidayService);
//# sourceMappingURL=public-holiday.service.js.map
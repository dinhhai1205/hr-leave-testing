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
exports.PrtrxHdrService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../common/constants");
const enums_1 = require("../../../../common/enums");
const database_1 = require("../../../../core/database");
const prtrx_hdr_entity_1 = require("../../../../core/database/entities/prtrx-hdr.entity");
let PrtrxHdrService = class PrtrxHdrService {
    constructor(prTrxHdrRepo) {
        this.prTrxHdrRepo = prTrxHdrRepo;
    }
    async getLatestPreviousPayrollTrxHeader(currentPayrollHeaderId, previousPayrollHeaderId = 0) {
        const currentPayrollTrxHeader = await this.prTrxHdrRepo.findOne({
            where: { id: currentPayrollHeaderId, specialRun: false },
            select: {
                id: true,
                payrollFrequencyId: true,
                cntInMonth: true,
                dateTo: true,
            },
        });
        if (!currentPayrollTrxHeader) {
            throw new common_1.NotFoundException(constants_1.ERR_MSG.NOT_FOUND('Payroll header', `id ${currentPayrollHeaderId}`));
        }
        const prtrxHdrAlias = prtrx_hdr_entity_1.PrtrxHdrEntity.name;
        const queryBuilder = this.prTrxHdrRepo
            .createQueryBuilder(prtrxHdrAlias)
            .select([`${prtrxHdrAlias}.id`, `${prtrxHdrAlias}.payrollPeriodId`])
            .innerJoinAndSelect(`${prtrxHdrAlias}.cyclePeriodDetail`, 'cycle')
            .where(`${prtrxHdrAlias}.isDeleted = :isDeleted`, { isDeleted: false });
        if (previousPayrollHeaderId) {
            queryBuilder.andWhere(`${prtrxHdrAlias}.id = :id`, {
                id: previousPayrollHeaderId,
            });
        }
        else {
            queryBuilder
                .andWhere(`${prtrxHdrAlias}.payrollFrequencyId = :payrollFrequencyId
          AND ${prtrxHdrAlias}.cntInMonth = :cntInMonth
          AND ${prtrxHdrAlias}.dateTo < :dateTo
          `, {
                payrollFrequencyId: currentPayrollTrxHeader.payrollFrequencyId,
                cntInMonth: currentPayrollTrxHeader.cntInMonth,
                dateTo: currentPayrollTrxHeader.dateTo,
            })
                .orderBy(`${prtrxHdrAlias}.dateTo`, 'DESC')
                .addOrderBy(`${prtrxHdrAlias}.id`, 'DESC');
        }
        const lastPayrollTrxHeader = await queryBuilder.getOne();
        if (!lastPayrollTrxHeader) {
            return {
                id: 0,
                cyclePeriodDetail: { id: 0, code: null },
            };
        }
        return lastPayrollTrxHeader;
    }
    async getTotalPayrollFinalized(companyIds, filter = {}) {
        return this.prTrxHdrRepo.countBy({
            companyId: (0, typeorm_2.In)(companyIds),
            isDeleted: false,
            statusId: enums_1.EPayrollHeaderStatus.FINALIZED,
            ...filter,
        });
    }
    async getTotalPayrollIsDeleted() {
        return this.prTrxHdrRepo.countBy({ isDeleted: true });
    }
    async getPayrollHeaderById(id) {
        return this.prTrxHdrRepo.findOne({ where: { isDeleted: false, id } });
    }
    async getPayrollHeaderByPayrollTimesheetId(id) {
        const hdrAlias = database_1.ETableName.PRTRX_HDR;
        const payrollTimesheetAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const queryBuilder = await this.prTrxHdrRepo
            .createQueryBuilder(hdrAlias)
            .leftJoinAndSelect(`${hdrAlias}.payrollTimeSheets`, payrollTimesheetAlias, `${payrollTimesheetAlias}.prtrx_hdr_id = ${hdrAlias}.id AND ${payrollTimesheetAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${payrollTimesheetAlias}.id = :payrollTimesheetId AND ${hdrAlias}.is_deleted = :isDeleted`, { payrollTimesheetId: id, isDeleted: false })
            .getOne();
        return queryBuilder;
    }
    async getEmployeesOfPrtrxHdr(id) {
        const hdrAlias = database_1.ETableName.PRTRX_HDR;
        const empAlias = database_1.ETableName.PRTRX_EMP;
        const queryBuilder = await this.prTrxHdrRepo
            .createQueryBuilder(hdrAlias)
            .leftJoinAndSelect(`${hdrAlias}.prtrxEmps`, empAlias, `${empAlias}.payroll_trx_header_id = ${hdrAlias}.id AND ${empAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${hdrAlias}.id = :hdrId AND ${hdrAlias}.is_deleted = :isDeleted`, { hdrId: id, isDeleted: false })
            .getMany();
        const employeeIds = queryBuilder.flatMap(entity => entity.prtrxEmps.map(employee => employee.employeeId));
        return employeeIds;
    }
    async getAllPayrollReportIsDeleted(args) {
        const { skip, take } = args;
        return (await this.prTrxHdrRepo.find({
            where: { isDeleted: true },
            take,
            skip,
            select: { id: true },
        })).map(payroll => payroll.id);
    }
};
exports.PrtrxHdrService = PrtrxHdrService;
exports.PrtrxHdrService = PrtrxHdrService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prtrx_hdr_entity_1.PrtrxHdrEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PrtrxHdrService);
//# sourceMappingURL=prtrx-hdr.service.js.map
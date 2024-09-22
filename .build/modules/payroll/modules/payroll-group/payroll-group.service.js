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
exports.PayRollGroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../common/constants");
const enums_1 = require("../../../../common/enums");
const payroll_group_entity_1 = require("../../../../core/database/entities/payroll-group.entity");
const services_1 = require("../../../../core/database/services");
const payroll_group_wd_service_1 = require("../payroll-group-wd/payroll-group-wd.service");
const payroll_group_type_enum_1 = require("./enums/payroll-group-type.enum");
let PayRollGroupService = class PayRollGroupService extends services_1.LegacyBaseService {
    constructor(payrollGroupRepository, payrollGroupWorkdayService) {
        super(payrollGroupRepository);
        this.payrollGroupRepository = payrollGroupRepository;
        this.payrollGroupWorkdayService = payrollGroupWorkdayService;
    }
    async getPayrollGroupById(companyId, payrollGroupId) {
        const payrollGroup = await this.payrollGroupRepository.findOne({
            where: {
                companyId,
                isDeleted: false,
                id: payrollGroupId,
            },
        });
        if (payrollGroup)
            return payrollGroup;
        throw new common_1.NotFoundException('Not found payroll group');
    }
    async getWorkingDay(currentDate, payrollGroup) {
        if (!payrollGroup)
            return 0;
        currentDate = moment(currentDate).clone();
        let workingDay = null;
        const currentYear = currentDate.year();
        const payrollGroupWorkDays = await this.payrollGroupWorkdayService.getPayrollGroupWorkDayTable({
            dateFromMoment: currentDate,
            dateToMoment: currentDate,
            payrollGroupId: payrollGroup.id,
        });
        if (payrollGroupWorkDays[currentYear]) {
            const currentDayOfYear = currentDate.dayOfYear();
            const wd = payrollGroupWorkDays[currentYear][`value_${currentDayOfYear}`];
            if (typeof wd === 'number' && !Number.isNaN(wd)) {
                workingDay = wd;
                return workingDay;
            }
        }
        const dayOfTheWeek = currentDate
            .format(constants_1.DAY_OF_WEEK)
            .toLowerCase();
        workingDay = payrollGroup[dayOfTheWeek];
        if (payrollGroup?.pgType === payroll_group_type_enum_1.EPayrollGroupType.HOURLY && workingDay > 0) {
            workingDay = enums_1.EWorkDay.WORKING_DAY;
        }
        return workingDay;
    }
};
exports.PayRollGroupService = PayRollGroupService;
exports.PayRollGroupService = PayRollGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payroll_group_entity_1.PayrollGroupEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        payroll_group_wd_service_1.PayRollGroupWorkDayService])
], PayRollGroupService);
//# sourceMappingURL=payroll-group.service.js.map
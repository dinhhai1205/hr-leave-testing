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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypePolicyHelper = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const moment = require("moment");
const enums_1 = require("../../../../../common/enums");
const contract_type_enum_1 = require("../../../../../common/enums/contract-type.enum");
const utils_1 = require("../../../../../common/utils");
const get_moment_date_from_day_month_year_util_1 = require("../../../../../common/utils/get-moment-date-from-day-month-year.util");
const leave_type_assigment_service_1 = require("../../leave-type-assigment/leave-type-assigment.service");
const policy_expire_type_enum_1 = require("../enums/policy-expire-type.enum");
const policy_renew_type_enum_1 = require("../enums/policy-renew-type.enum");
let LeaveTypePolicyHelper = class LeaveTypePolicyHelper {
    constructor(leaveTypeAssignmentService) {
        this.leaveTypeAssignmentService = leaveTypeAssignmentService;
    }
    isProratePolicyAndIsValid(policy) {
        if (policy.prorateEntitlement &&
            (!policy.prorateUnit ||
                !policy.creditOnDay ||
                policy.creditOnDay < 1 ||
                policy.creditOnDay > enums_1.ELastDayOfMonth.EACH_MONTH)) {
            return false;
        }
        return true;
    }
    calculateEffectiveDate(effective) {
        const { effAfterType, effAfterUOM, effAfterUnit, joinDate = undefined, seniorityDate = undefined, utcOffset = 0, contractType, empContracts, } = effective;
        let dateFromType = joinDate;
        if (effAfterType === enums_1.EPolicyEffectiveType.CONFIRMATION_DATE) {
            if (contractType &&
                (contractType === contract_type_enum_1.EContractType.DEFINITE ||
                    contractType === contract_type_enum_1.EContractType.INDEFINITE)) {
                if (!empContracts.length) {
                    dateFromType = null;
                }
                else {
                    dateFromType = empContracts[0].dateFrom;
                    for (const contract of empContracts) {
                        if (moment(contract.dateFrom).isBefore(dateFromType)) {
                            dateFromType = contract.dateFrom;
                        }
                    }
                }
            }
            else {
                dateFromType = null;
            }
        }
        else if (effAfterType === enums_1.EPolicyEffectiveType.SENIORITY_DATE) {
            dateFromType = seniorityDate;
        }
        if (!dateFromType)
            return undefined;
        const momentDate = moment
            .utc(dateFromType)
            .clone()
            .utcOffset(utcOffset, true);
        switch (effAfterUOM) {
            case enums_1.EPolicyEffectiveUOM.DAY:
                momentDate.add(effAfterUnit, 'days');
                break;
            case enums_1.EPolicyEffectiveUOM.MONTH:
                momentDate.add(effAfterUnit, 'months');
                break;
            case enums_1.EPolicyEffectiveUOM.YEAR:
                momentDate.add(effAfterUnit, 'years');
                break;
            default:
                return undefined;
        }
        return momentDate;
    }
    findPossiblePoliciesWithEmployee(args) {
        const { employee, policies, utcOffset, currentDate } = args;
        const { possiblePolicy = {} } = employee;
        for (const policy of policies) {
            if (policy.companyId !== employee.companyId)
                continue;
            if (!this.isProratePolicyAndIsValid(policy)) {
                continue;
            }
            const assignment = policy.leaveType?.leaveTypeAssignment;
            if (assignment &&
                !this.leaveTypeAssignmentService.isEmpValidAssignment(employee, assignment)) {
                continue;
            }
            const effectiveDate = this.calculateEffectiveDate({
                effAfterUnit: policy.effAfterUnit,
                effAfterType: policy.effAfterType,
                effAfterUOM: policy.effAfterUOM,
                joinDate: employee?.joinDate,
                contractDateFrom: employee?.contractDateFrom,
                seniorityDate: employee?.seniorityDate,
                utcOffset,
                contractType: employee.contractType,
                empContracts: employee['empContracts'],
            });
            if (!effectiveDate)
                continue;
            const { ltId } = policy;
            const closestEffectiveDate = possiblePolicy[ltId]?.closestEffectiveDate;
            if (effectiveDate.isSameOrBefore(currentDate) &&
                (!closestEffectiveDate || closestEffectiveDate.isBefore(effectiveDate))) {
                if (!possiblePolicy[ltId])
                    possiblePolicy[ltId] = {};
                possiblePolicy[ltId].closestEffectiveDate = effectiveDate;
                possiblePolicy[ltId].closestPolicy = policy;
            }
        }
        return possiblePolicy;
    }
    policyHasCarryForwardSetting(policy) {
        if (policy.renewYearly &&
            policy.cfLtId &&
            policy.cfLtId !== policy.ltId &&
            policy.cfType &&
            Object.values(enums_1.EPolicyCarryForwardType).includes(policy.cfType) &&
            policy.cfType !== enums_1.EPolicyCarryForwardType.NONE) {
            if (policy.cfType === enums_1.EPolicyCarryForwardType.ALL)
                return true;
            return policy.cfUnit && policy.cfUnit > 0 ? true : false;
        }
        return false;
    }
    findBalanceAndCreditOfEmployeeForPossiblePolicy(args) {
        const { employee, possiblePolicy, authMail = enums_1.EDefaultEmail.CRON_JOB, } = args;
        const leaveTypeBalances = employee?.leaveTypeBalances ?? [];
        const leaveTypePolicyCredits = employee?.leaveTypePolicyCredits ?? [];
        const balanceNeedInitial = [];
        const creditNeedInitial = [];
        Object.entries(possiblePolicy).forEach(([leaveTypeId, policy]) => {
            if ((0, utils_1.isEmptyObject)(policy))
                return;
            const closestPolicy = policy.closestPolicy;
            policy.leaveTypeBalance = leaveTypeBalances.find(ltBalance => ltBalance.companyId === employee.companyId &&
                ltBalance.leaveTypeId === closestPolicy.ltId);
            if (!policy.leaveTypeBalance) {
                balanceNeedInitial.push({
                    companyId: employee.companyId,
                    employeeId: employee.id,
                    leaveTypeId: closestPolicy.ltId,
                    balance: 0,
                    createdBy: authMail,
                });
            }
            policy.leaveTypePolicyCredit = leaveTypePolicyCredits.find(ltPolicyCredit => ltPolicyCredit.companyId === employee.companyId &&
                ltPolicyCredit.leavePolicyId === closestPolicy.id);
            if (!policy.leaveTypePolicyCredit) {
                creditNeedInitial.push({
                    uuid: (0, crypto_1.randomUUID)(),
                    companyId: employee.companyId,
                    employeeId: employee.id,
                    leavePolicyId: closestPolicy.id,
                    credit: 0,
                    creditRemaining: 0,
                    carryForwardRemaining: 0,
                    createdBy: authMail,
                });
            }
            if (this.policyHasCarryForwardSetting(closestPolicy)) {
                policy.cfLeaveTypeBalance = leaveTypeBalances.find(ltBalance => ltBalance.companyId === employee.companyId &&
                    ltBalance.leaveTypeId === closestPolicy.cfLtId);
                if (!policy.cfLeaveTypeBalance) {
                    balanceNeedInitial.push({
                        companyId: employee.companyId,
                        employeeId: employee.id,
                        leaveTypeId: closestPolicy.cfLtId,
                        balance: 0,
                        createdBy: authMail,
                    });
                }
            }
        });
        return { possiblePolicy, balanceNeedInitial, creditNeedInitial };
    }
    reFindBalanceAndCredit(args) {
        let { cfLeaveTypeBalance, leaveTypeBalance, leaveTypePolicyCredit } = args;
        const { initiatedBalances, initiatedCredits, employee, leaveTypePolicy } = args;
        if (!leaveTypeBalance) {
            leaveTypeBalance = initiatedBalances.find(record => record.employeeId === employee.id &&
                record.companyId === employee.companyId &&
                record.leaveTypeId === leaveTypePolicy.ltId);
        }
        if (!cfLeaveTypeBalance &&
            this.policyHasCarryForwardSetting(leaveTypePolicy)) {
            cfLeaveTypeBalance = initiatedBalances.find(record => record.employeeId === employee.id &&
                record.companyId === employee.companyId &&
                record.leaveTypeId === leaveTypePolicy.cfLtId);
        }
        if (!leaveTypePolicyCredit) {
            leaveTypePolicyCredit = initiatedCredits.find(record => record.employeeId === employee.id &&
                record.companyId === employee.companyId &&
                record.leavePolicyId === leaveTypePolicy.id);
        }
        return { leaveTypeBalance, cfLeaveTypeBalance, leaveTypePolicyCredit };
    }
    isCreditThisMonth(args) {
        if (!args?.creditedOn) {
            return false;
        }
        const cloneCreditedOn = moment
            .utc(args.creditedOn)
            .clone()
            .utcOffset(args.utcOffset);
        return (args.currentDate.isSame(cloneCreditedOn, 'month') &&
            args.currentDate.isSame(cloneCreditedOn, 'year'));
    }
    todayIsNotACreditDayYet(args) {
        const currentDate = args.currentDate.clone();
        const creditDate = moment
            .utc([
            currentDate.year(),
            currentDate.month(),
            args.creditOnDay,
            0,
            0,
            0,
            0,
            0,
        ])
            .utcOffset(args.utcOffset);
        return currentDate.isBefore(creditDate);
    }
    prorateLeaveMonthByMonth(args) {
        const { utcOffset, leaveTypePolicy, leaveTypePolicyCredit } = args;
        const currentDate = args.currentDate.clone().utcOffset(args.utcOffset);
        if (leaveTypePolicy.prorateUnit <= 0 ||
            leaveTypePolicy.creditOnDay < 1 ||
            leaveTypePolicy.creditOnDay > enums_1.ELastDayOfMonth.EACH_MONTH) {
            return leaveTypePolicyCredit.creditRemaining;
        }
        const isCreditedThisMonth = this.isCreditThisMonth({
            currentDate,
            creditedOn: leaveTypePolicyCredit.creditedOn,
            utcOffset,
        });
        if (isCreditedThisMonth)
            return leaveTypePolicyCredit.creditRemaining;
        const lastDayOfMonth = currentDate.clone().endOf('month');
        const todayIsLastDayOfMonth = currentDate.isSame(lastDayOfMonth, 'date');
        if (leaveTypePolicy.creditOnDay === enums_1.ELastDayOfMonth.EACH_MONTH &&
            !todayIsLastDayOfMonth) {
            return leaveTypePolicyCredit.creditRemaining;
        }
        const todayIsNotACreditDayYet = this.todayIsNotACreditDayYet({
            creditOnDay: leaveTypePolicy.creditOnDay,
            currentDate,
            utcOffset,
        });
        if (todayIsNotACreditDayYet)
            return leaveTypePolicyCredit.creditRemaining;
        return Number((leaveTypePolicyCredit.creditRemaining + leaveTypePolicy.prorateUnit).toFixed(2));
    }
    getRenewalMoment(args) {
        const { currentYear, utcOffset, renewYearly, renewType, renewOnDay = 0, renewOnMonth = 0, contractStartDate, } = args;
        if (!renewYearly)
            return null;
        let hrforteDay = new Number(renewOnDay).valueOf();
        let hrforteMonth = new Number(renewOnMonth).valueOf();
        const getDayMonth = (d) => {
            const dMoment = moment.utc(d);
            return { day: dMoment.date(), month: dMoment.month() + 1 };
        };
        if (renewType === policy_renew_type_enum_1.EPolicyRenewType.CONTRACT_START_DATE) {
            if (!contractStartDate)
                return null;
            const { day, month } = getDayMonth(contractStartDate);
            hrforteDay = day;
            hrforteMonth = month;
        }
        return (0, get_moment_date_from_day_month_year_util_1.getMomentDateFromDayMonthYear)({
            year: currentYear,
            month: hrforteMonth,
            day: hrforteDay,
            utcOffset,
        });
    }
    getExpiresMoment(args) {
        const { currentYear, utcOffset, expireType, expireOnDay, expireOnMonth, expireInDays, renewalMoment, } = args;
        switch (expireType) {
            case policy_expire_type_enum_1.EPolicyExpireType.EXPIRE_ON:
                return (0, get_moment_date_from_day_month_year_util_1.getMomentDateFromDayMonthYear)({
                    year: currentYear,
                    month: expireOnMonth,
                    day: expireOnDay,
                    utcOffset,
                });
            case policy_expire_type_enum_1.EPolicyExpireType.EXPIRE_IN:
                return this.getExpiresInMoment(expireInDays, renewalMoment);
            case policy_expire_type_enum_1.EPolicyExpireType.NEVER:
            default:
                return null;
        }
    }
    getExpiresInMoment(expireInDays, momentFromInput, utcOffset = 0) {
        return momentFromInput
            .clone()
            .utc()
            .add(expireInDays, 'day')
            .utcOffset(utcOffset);
    }
    getCarryForwardBalance(args) {
        const { cfType = undefined, cfUnit, maxEntitlement, unusedLeaves } = args;
        if (!cfType || unusedLeaves <= 0 || !maxEntitlement) {
            return 0;
        }
        let carryForwardBalance = 0;
        switch (cfType) {
            case enums_1.EPolicyCarryForwardType.ALL:
                carryForwardBalance = unusedLeaves;
                break;
            case enums_1.EPolicyCarryForwardType.DAYS:
                carryForwardBalance = Math.min(unusedLeaves, cfUnit);
                break;
            case enums_1.EPolicyCarryForwardType.PERCENTAGE:
                carryForwardBalance = (cfUnit / 100) * unusedLeaves;
                break;
            default:
                carryForwardBalance = 0;
                break;
        }
        return carryForwardBalance;
    }
    deduction(remaining, amountDeduct) {
        if (remaining < 0)
            remaining = 0;
        if (amountDeduct < 0)
            amountDeduct = 0;
        const deduction = Math.min(remaining, amountDeduct);
        let cloneRemaining = Number(remaining).valueOf();
        let cloneAmountDeduct = Number(amountDeduct).valueOf();
        cloneRemaining -= deduction;
        cloneAmountDeduct -= deduction;
        return { remaining: cloneRemaining, amountDeduct: cloneAmountDeduct };
    }
    validProratePolicy(policy) {
        if (policy.prorateEntitlement &&
            (!policy.prorateUnit ||
                !policy.creditOnDay ||
                policy.creditOnDay > enums_1.ELastDayOfMonth.EACH_MONTH)) {
            return false;
        }
        return true;
    }
};
exports.LeaveTypePolicyHelper = LeaveTypePolicyHelper;
exports.LeaveTypePolicyHelper = LeaveTypePolicyHelper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [leave_type_assigment_service_1.LeaveTypeAssignmentService])
], LeaveTypePolicyHelper);
//# sourceMappingURL=leave-type-policy.helper.js.map
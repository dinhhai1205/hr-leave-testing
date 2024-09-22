"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveHelper = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const typeorm_1 = require("typeorm");
const constants_1 = require("../../../../../common/constants");
const enums_1 = require("../../../../../common/enums");
let LeaveHelper = class LeaveHelper {
    leaveRecordHaveValidLeaveType(leaveType) {
        if (!leaveType) {
            throw new common_1.NotFoundException('Leave Type Not Found!');
        }
        if (leaveType.isDeleted === true || leaveType.active === false) {
            throw new common_1.NotFoundException('Leave Type Not Found!');
        }
    }
    allowDateRangeOfLeave(leave, leaveType) {
        const leaveStart = moment.utc(leave.dateFrom);
        const leaveEnd = moment.utc(leave.dateTo);
        const typeStart = moment.utc(leaveType.startDate);
        const typeEnd = moment.utc(leaveType.endDate);
        if (leaveStart.isBefore(typeStart) || leaveEnd.isAfter(typeEnd)) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE_TYPE.DATE_FROM_TO_ERROR);
        }
    }
    allowToApplyHalfDayLeave(leave, leaveType) {
        if (!leaveType.allowApplyHalfDay &&
            (leave.toFdHd === 0.5 || leave.fromFdHd === 0.5)) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE_TYPE.HALF_DAY_ERROR);
        }
    }
    leaveApplicationShouldBeSubmittedBefore(currentDate, leave, leaveType) {
        const daysInAdvance = leaveType?.daysInAdvance ?? 0;
        const submissionDate = moment(currentDate).startOf('dates');
        const leaveStart = moment(leave.dateFrom);
        const daysDifference = leaveStart.clone().diff(submissionDate, 'days');
        if (daysInAdvance && !(daysDifference > daysInAdvance)) {
            throw new common_1.BadRequestException(`Please submit your request at least ${daysInAdvance} days in advance of the starting date.`);
        }
    }
    allowToApplyLeaveInTheFuture(currentDate, leave, leaveType) {
        const today = moment(currentDate).startOf('dates');
        const dateFromDiffToday = moment(leave.dateFrom)
            .clone()
            .diff(today, 'days');
        const dateToDiffToday = moment(leave.dateTo).clone().diff(today, 'days');
        const { allowFutureDates, daysFromNow } = leaveType;
        const errMsg = `Leave application is too far in advance. You can only apply for leave up to ${daysFromNow} days in advance.`;
        if (!allowFutureDates) {
            if (dateFromDiffToday > 0 || dateToDiffToday > 0) {
                throw new common_1.BadRequestException(errMsg);
            }
        }
        if (allowFutureDates && daysFromNow) {
            if (dateFromDiffToday > daysFromNow) {
                throw new common_1.BadRequestException(errMsg);
            }
            if (dateToDiffToday > daysFromNow) {
                throw new common_1.BadRequestException(errMsg);
            }
        }
    }
    allowToApplyLeaveInThePast(currentDate, leave, leaveType) {
        const today = moment(currentDate).startOf('dates');
        const dateFromDiffToday = moment(leave.dateFrom)
            .clone()
            .diff(today, 'days');
        const dateToDiffToday = moment(leave.dateTo).clone().diff(today, 'days');
        const { allowPastDates, daysAgo } = leaveType;
        const errMsg = `Leave application is too far in the past. You can only apply for leave within the last ${daysAgo} days.`;
        if (!allowPastDates) {
            if (dateFromDiffToday < 0 || dateToDiffToday < 0) {
                throw new common_1.BadRequestException(errMsg);
            }
        }
        if (allowPastDates && daysAgo) {
            if (dateFromDiffToday < -daysAgo) {
                throw new common_1.BadRequestException(errMsg);
            }
            if (dateToDiffToday < -daysAgo) {
                throw new common_1.BadRequestException(errMsg);
            }
        }
    }
    maximumLeaveThatCanBeAppliedPerApplication(effectiveDays, leaveType) {
        if (leaveType.maxDayApply && effectiveDays > leaveType.maxDayApply) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE_TYPE.MAX_EFFECT_DAYS_ERROR);
        }
    }
    allowUserToApplyEvenLeaveExceedBalance(effectiveDays, leaveTypeBalance, leaveType) {
        if (!leaveType.allowApplyExceed && effectiveDays > leaveTypeBalance) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE_TYPE.EXCEED_BALANCE_ERROR);
        }
    }
    async duplicateLeaveRecordInDateRange(companyId, leave, leaveRepo) {
        const dateFromClone = moment(leave.dateFrom).clone().format('YYYY-MM-DD');
        const dateToClone = moment(leave.dateTo).clone().format('YYYY-MM-DD');
        const whereOperator = {
            companyId,
            employeeId: leave.employeeId,
            leaveTypeId: leave.leaveTypeId,
            isDeleted: false,
            dateFrom: (0, typeorm_1.LessThanOrEqual)(new Date(`${dateFromClone}T00:00:00.000Z`)),
            dateTo: (0, typeorm_1.MoreThanOrEqual)(new Date(`${dateToClone}T00:00:00.000Z`)),
            statusId: (0, typeorm_1.Not)((0, typeorm_1.In)([enums_1.ELeaveStatusId.CANCELLED, enums_1.ELeaveStatusId.DECLINE])),
        };
        if (leave?.id) {
            whereOperator.id = (0, typeorm_1.Not)(leave.id);
        }
        const [leaveRecord, count] = await Promise.all([
            leaveRepo.findOne({
                where: whereOperator,
                select: {
                    id: true,
                    dateFrom: true,
                    dateTo: true,
                    fromFdHd: true,
                    toFdHd: true,
                },
            }),
            leaveRepo.count({ where: whereOperator }),
        ]);
        if (leaveRecord) {
            const leaveDateFrom = moment
                .utc(leaveRecord.dateFrom)
                .format(constants_1.DATE_STRING);
            const leaveDateTo = moment.utc(leaveRecord.dateTo).format(constants_1.DATE_STRING);
            const leaveFromFdHd = leaveRecord.fromFdHd;
            const leaveToFdHd = leaveRecord.toFdHd;
            if (leaveDateFrom === dateFromClone && leaveDateTo === dateToClone) {
                if (count < 2 &&
                    leave.fromFdHd !== leaveFromFdHd &&
                    leave.toFdHd !== leaveToFdHd) {
                    return;
                }
            }
            throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE_TYPE.DUPLICATE_DATE_ERROR);
        }
    }
    validateUpdateLeaveRecord(authInfo, leaveRecord) {
        if (!leaveRecord || !leaveRecord.employee || !leaveRecord.leaveType) {
            throw new common_1.NotFoundException(`[Leave] Not found`);
        }
        if (authInfo.appMode === enums_1.EApiAppMode.ESS) {
            if (leaveRecord.statusId !== enums_1.ELeaveStatusId.DRAFT) {
                throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE.NOT_ALLOW_UPDATE_LEAVE_IS_NOT_DRAFT);
            }
            if (authInfo.ranking !== enums_1.EUserRanking.GOLD &&
                leaveRecord.employeeId !== authInfo.authEmployeeId) {
                throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE.NOT_OWN_LEAVE_RECORD);
            }
        }
    }
};
exports.LeaveHelper = LeaveHelper;
exports.LeaveHelper = LeaveHelper = __decorate([
    (0, common_1.Injectable)()
], LeaveHelper);
//# sourceMappingURL=leave.helper.js.map
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
exports.LeaveService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../../common/constants");
const dto_1 = require("../../../../../common/dto");
const enums_1 = require("../../../../../common/enums");
const utils_1 = require("../../../../../common/utils");
const config_1 = require("../../../../../config");
const database_1 = require("../../../../../core/database");
const entities_1 = require("../../../../../core/database/entities");
const services_1 = require("../../../../../core/database/services");
const producers_1 = require("../../../../../core/queue/producers");
const aws_1 = require("../../../../../libs/aws");
const trx_approval_user_service_1 = require("../../../../approval/modules/trx-approval-user/trx-approval-user.service");
const approver_trx_for_common_info_util_1 = require("../../../../approval/modules/trx-approval-user/utils/approver-trx-for-common-info.util");
const payroll_group_wd_service_1 = require("../../../../payroll/modules/payroll-group-wd/payroll-group-wd.service");
const payroll_group_type_enum_1 = require("../../../../payroll/modules/payroll-group/enums/payroll-group-type.enum");
const payroll_group_service_1 = require("../../../../payroll/modules/payroll-group/payroll-group.service");
const payroll_group_fieds_for_calculate_day_leaveutil_1 = require("../../../../payroll/modules/payroll-group/utils/payroll-group-fieds-for-calculate-day-leaveutil");
const employee_service_1 = require("../../../../user/modules/employee/employee.service");
const employee_fields_for_assignment_util_1 = require("../../../../user/modules/employee/utils/employee-fields-for-assignment.util");
const employee_fields_for_common_info_util_1 = require("../../../../user/modules/employee/utils/employee-fields-for-common-info.util");
const leave_trx_service_1 = require("../../leave-trx/leave-trx.service");
const leave_type_assigment_service_1 = require("../../leave-type-assigment/leave-type-assigment.service");
const assignment_fields_for_leave_validate_util_1 = require("../../leave-type-assigment/utils/assignment-fields-for-leave-validate.util");
const leave_type_balance_service_1 = require("../../leave-type-balance/leave-type-balance.service");
const leave_type_service_1 = require("../../leave-type/leave-type.service");
const sub_leave_type_service_1 = require("../../leave-type/sub-leave-type/sub-leave-type.service");
const fields_seletion_util_1 = require("../../leave-type/utils/fields-seletion.util");
const get_lt_querybuilder_for_leave_record_action_util_1 = require("../../leave-type/utils/get-lt-querybuilder-for-leave-record-action.util");
const leave_type_fields_for_get_leave_util_1 = require("../../leave-type/utils/leave-type-fields-for-get-leave.util");
const public_holiday_service_1 = require("../../public-holiday/public-holiday.service");
const leave_helper_1 = require("../helpers/leave.helper");
const mapper_1 = require("../mapper");
let LeaveService = class LeaveService extends services_1.LegacyBaseService {
    constructor(leaveRepository, leaveHelper, employeeService, payRollGroupService, payRollGroupWorkDayService, trxApprovalUserService, publicHolidayService, awsS3Service, leaveTypeService, subLeaveTypeService, leaveTypeBalanceService, leaveTrxService, leaveTypeAssignmentService, hrforteNotificationProducer, leaveTypePolicyProducer, appConfig, dbConfig) {
        super(leaveRepository);
        this.leaveRepository = leaveRepository;
        this.leaveHelper = leaveHelper;
        this.employeeService = employeeService;
        this.payRollGroupService = payRollGroupService;
        this.payRollGroupWorkDayService = payRollGroupWorkDayService;
        this.trxApprovalUserService = trxApprovalUserService;
        this.publicHolidayService = publicHolidayService;
        this.awsS3Service = awsS3Service;
        this.leaveTypeService = leaveTypeService;
        this.subLeaveTypeService = subLeaveTypeService;
        this.leaveTypeBalanceService = leaveTypeBalanceService;
        this.leaveTrxService = leaveTrxService;
        this.leaveTypeAssignmentService = leaveTypeAssignmentService;
        this.hrforteNotificationProducer = hrforteNotificationProducer;
        this.leaveTypePolicyProducer = leaveTypePolicyProducer;
        this.appConfig = appConfig;
        this.dbConfig = dbConfig;
    }
    async createLeaveRecord(companyId, authInfo, body) {
        if ((0, utils_1.isGoldUserAccessEssWithoutEmp)(authInfo)) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.GOLD_USER_MISSING_EMPLOYEE('create a leave record.'));
        }
        const { leaveTypeId } = body;
        let employeeId = body.employeeId;
        const { authEmployeeId, authEmail, appMode, utcOffset } = authInfo;
        const currentDate = new Date(new Date().setMinutes(utcOffset));
        if (appMode === enums_1.EApiAppMode.ADMIN && !employeeId) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE.MISSING_EMPLOYEE_WHEN_CREATE);
        }
        if (appMode === enums_1.EApiAppMode.ESS) {
            if (!authEmployeeId) {
                throw new common_1.BadRequestException(`Cannot determine employee when create leave record.`);
            }
            employeeId = authEmployeeId;
        }
        const [employee, leaveTypeEntity] = await Promise.all([
            this.employeeService.getEmployeeWithApprovalUsers(companyId, body.employeeId),
            (0, get_lt_querybuilder_for_leave_record_action_util_1.buildQueryBuilderForActionLeaveRecord)({
                ltQueryBuilder: this.leaveTypeService.repository.createQueryBuilder(database_1.ETableName.LEAVE_TYPE),
                ltId: leaveTypeId,
            }).getOne(),
        ]);
        if (!employee) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE.MISSING_EMPLOYEE_WHEN_CREATE);
        }
        if (!leaveTypeEntity) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE.MISSING_LEAVE_TYPE_WHEN_CREATE);
        }
        let leaveType = leaveTypeEntity;
        if (leaveType.parentId) {
            leaveType =
                await this.subLeaveTypeService.replaceConfigIfLeaveTypeHaveParent(leaveType);
            Object.assign(body, { parentLeaveTypeId: leaveType.parentId });
        }
        await this.checkValidateForCreateLeave({
            currentDate,
            companyId,
            leave: body,
            leaveType,
            employee,
            payrollGroup: employee.payrollGroups,
        });
        this.leaveTypeAssignmentService.checkValidateForCreateLeave(employee, leaveType.leaveTypeAssignment);
        const newLeaveRecord = await this.repository.save({
            ...body,
            companyId,
            isDeleted: false,
            createdBy: authEmail,
            createdOn: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
            allMustApprove: employee?.approvalUsers?.allMustApprove || false,
        });
        if (employee?.approvalUsers) {
            const { userEmail1, userEmail2, userEmail3 } = employee.approvalUsers;
            const createTrxRecords = [];
            const arr = [userEmail1, userEmail2, userEmail3];
            for (let i = 0; i < arr.length; i++) {
                if (!arr[i])
                    continue;
                createTrxRecords.push({
                    createdOn: new Date(),
                    recordId: newLeaveRecord.id,
                    companyId: companyId,
                    moduleId: enums_1.EMainModuleNumber.LEAVE,
                    createdBy: authEmail,
                    userEmail: arr[i],
                    approverLevel: enums_1.ELeaveStatusId.AWAIT_APPROVAL,
                });
            }
            await this.trxApprovalUserService.repository.save(createTrxRecords);
        }
        return newLeaveRecord;
    }
    async getLeaveRecordsByQuery(companyId, query, authInfo, action) {
        if ((0, utils_1.isGoldUserAccessEssWithoutEmp)(authInfo)) {
            return new dto_1.PaginationResponseDto({
                paginationDto: query,
                data: [],
                itemCount: 0,
            });
        }
        const { leaveTypeIds, employeeIds, statusId: stsId, q, approveBy, startDate, endDate, statusIds, } = query;
        const { authEmployeeId, appMode, organizationPaths } = authInfo;
        let statusId = stsId;
        if (appMode === enums_1.EApiAppMode.ESS && authEmployeeId) {
            if (!employeeIds || !employeeIds?.length)
                statusId = enums_1.ELeaveStatusId.APPROVED;
        }
        const newQuery = {
            ...query,
            isSelectAll: action === enums_1.EPermissionActions.EXPORT ? true : query.isSelectAll,
            skip: query.skip,
        };
        const baseQueryBuilder = this.createBaseQueryBuilder(newQuery);
        const leaveAlias = baseQueryBuilder.alias;
        const employeeAlias = 'employee';
        const leaveTypeAlias = 'leaveType';
        const approverTrxAlias = database_1.ETableName.TRX_APPROVAL_USER;
        const pagination = await this.getEntitiesByQuery({ ...newQuery }, () => {
            baseQueryBuilder
                .innerJoin(`${leaveAlias}.employee`, employeeAlias, `${employeeAlias}.isDeleted = :isDeleted` +
                this.employeeService.startWithOrgPathCondition(employeeAlias, organizationPaths), { isDeleted: false })
                .addSelect((0, employee_fields_for_common_info_util_1.employeeFieldsForCommonInfo)(employeeAlias));
            baseQueryBuilder
                .leftJoin(`${leaveAlias}.leaveType`, leaveTypeAlias, `${leaveTypeAlias}.isDeleted = :isDeleted
            AND ${leaveTypeAlias}.companyId = :companyId`, { companyId, isDeleted: false })
                .addSelect((0, leave_type_fields_for_get_leave_util_1.leaveTypeFieldsForGetLeave)(leaveTypeAlias));
            baseQueryBuilder
                .leftJoin(`${leaveAlias}.approverTrx`, approverTrxAlias, `${approverTrxAlias}.moduleId = :moduleId 
            AND ${approverTrxAlias}.companyId = :companyId
          `, { moduleId: enums_1.EMainModuleNumber.LEAVE, companyId })
                .addSelect((0, approver_trx_for_common_info_util_1.approverTrxFieldsForCommonInfo)(approverTrxAlias));
            baseQueryBuilder.andWhere(`${leaveAlias}.isDeleted = :isDeleted
            AND ${leaveAlias}.companyId = :companyId
            `, { isDeleted: false, companyId });
            if (q) {
                baseQueryBuilder.andWhere(`(${leaveAlias}.reason LIKE :q
            OR latestCompletedVersion.title LIKE :q )`, { q: `%${q}%` });
            }
            if (employeeIds?.length) {
                baseQueryBuilder.andWhere(`${leaveAlias}.employeeId IN (:...employeeIds)`, { employeeIds });
            }
            (0, utils_1.filterEmployeeQueryBuilderInEssMode)(authInfo, baseQueryBuilder, {
                field: 'employeeId',
                value: authEmployeeId,
                customVariable: 'authEmployeeId',
            });
            if (leaveTypeIds?.length) {
                baseQueryBuilder.andWhere(`${leaveAlias}.leaveTypeId IN (:...leaveTypeIds)`, { leaveTypeIds });
            }
            if (statusIds?.length) {
                baseQueryBuilder.andWhere(`${leaveAlias}.statusId IN (:...statusIds)`, { statusIds });
            }
            else if (typeof statusId === 'number' && statusId >= 0) {
                baseQueryBuilder.andWhere(`${leaveAlias}.statusId = :statusId`, {
                    statusId,
                });
            }
            if (startDate && endDate) {
                baseQueryBuilder
                    .andWhere(`${leaveAlias}.dateFrom <= :endDate`, { endDate })
                    .andWhere(`${leaveAlias}.dateTo >= :startDate`, { startDate });
            }
            if (approveBy) {
                baseQueryBuilder.andWhere(`approverTrx.userEmail = :approveBy`, {
                    approveBy,
                });
            }
            return baseQueryBuilder;
        });
        if (!pagination.data?.length)
            return pagination;
        const arrayIndex = [];
        const arrayBatch = [];
        for (let i = 0; i < pagination.data.length; i++) {
            const record = pagination.data[i];
            if (record?.statusId === enums_1.ELeaveStatusId.DRAFT) {
                arrayIndex.push(i);
                arrayBatch.push(this.getTotalDayLeaves(record.companyId, record));
            }
        }
        const arrayPromise = await Promise.all(arrayBatch);
        arrayPromise.forEach(({ totalDayLeaves: effectiveDays }, index) => {
            pagination.data[arrayIndex[index]].effDayOfLeave = effectiveDays;
        });
        return pagination;
    }
    async getLeaveRecordDetail(companyId, leaveId, authInfo = { organizationPaths: [] }) {
        const { organizationPaths } = authInfo;
        const leaveAlias = entities_1.LeaveEntity.name;
        const employeeAlias = entities_1.EmployeeEntity.name;
        const leaveTypeAlias = entities_1.LeaveTypeEntity.name;
        const approverTrxAlias = database_1.ETableName.TRX_APPROVAL_USER;
        const aspUserAlias = database_1.ETableName.ASP_NET_USER;
        const queryBuilder = this.leaveRepository.createQueryBuilder(leaveAlias);
        queryBuilder
            .innerJoin(`${leaveAlias}.employee`, employeeAlias, `${employeeAlias}.isDeleted = :isDeleted
          AND ${employeeAlias}.companyId = :companyId` +
            this.employeeService.startWithOrgPathCondition(employeeAlias, organizationPaths), { companyId, isDeleted: false })
            .addSelect((0, employee_fields_for_common_info_util_1.employeeFieldsForCommonInfo)(employeeAlias))
            .leftJoin(`${leaveAlias}.leaveType`, leaveTypeAlias, `${leaveTypeAlias}.isDeleted = :isDeleted
        AND ${leaveTypeAlias}.companyId = :companyId`, { companyId, isDeleted: false })
            .addSelect((0, leave_type_fields_for_get_leave_util_1.leaveTypeFieldsForGetLeave)(leaveTypeAlias))
            .leftJoin(`${leaveAlias}.approverTrx`, approverTrxAlias, `${approverTrxAlias}.moduleId = :moduleId 
        AND ${approverTrxAlias}.companyId = :companyId`, { moduleId: 2, companyId })
            .addSelect((0, approver_trx_for_common_info_util_1.approverTrxFieldsForCommonInfo)(approverTrxAlias))
            .leftJoinAndMapOne(`${approverTrxAlias}.aspUser`, entities_1.AspNetUsersEntity, aspUserAlias, `${approverTrxAlias}.userEmail = ${aspUserAlias}.email`, { moduleId: enums_1.EMainModuleNumber.LEAVE, companyId })
            .andWhere(`${leaveAlias}.id = :leaveId 
        AND ${leaveAlias}.isDeleted = :isDeleted
        AND ${leaveAlias}.companyId = :companyId
        `, { leaveId, isDeleted: false, companyId });
        const record = await queryBuilder.getOne();
        if (!record) {
            throw new common_1.NotFoundException(constants_1.ERR_MSG.NOT_FOUND('Leave', `id ${leaveId}`));
        }
        if (record?.statusId === enums_1.ELeaveStatusId.DRAFT) {
            const effectiveDays = await this.getTotalDayLeaves(companyId, record, {
                leaveType: record.leaveType,
                employee: record.employee,
            });
            record.effDayOfLeave = effectiveDays.totalDayLeaves;
        }
        Object.assign(record, { attachments: [] });
        if (record.fileCount) {
            const prefix = `${companyId}/${leaveId}/`;
            const listObjectRes = await this.awsS3Service.getListObject({
                Delimiter: '/',
                Prefix: prefix,
            });
            const contents = (listObjectRes.Contents || []).sort((a, b) => {
                const aLastModified = a?.LastModified || new Date();
                const bLastModified = b?.LastModified || new Date();
                return bLastModified.getTime() - aLastModified.getTime();
            });
            if (listObjectRes.KeyCount) {
                const attachments = [];
                for (const content of contents) {
                    const { Key = undefined, Size = undefined } = content;
                    if (Key && Size) {
                        const splitKey = Key.split('/');
                        attachments.push({
                            folderName: prefix,
                            fileName: splitKey[splitKey.length - 1],
                            objectKey: Key,
                            sizeInBytes: Size,
                        });
                    }
                }
                Object.assign(record, { attachments });
            }
        }
        return record;
    }
    async updateLeaveRecordStatus(payload) {
        const { companyId, body, authInfo, action } = payload;
        const { ids, remark } = body;
        const { authEmployeeId, authEmail, appMode } = authInfo;
        const statusId = enums_1.ELeaveStatusId[enums_1.ELeaveApprovalActions[action]];
        const leaveAlias = database_1.ETableName.LEAVE;
        const employeeAlias = database_1.ETableName.EMPLOYEE;
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const leaveTypeAlias = database_1.ETableName.LEAVE_TYPE;
        const approverTrxAlias = database_1.ETableName.TRX_APPROVAL_USER;
        const leaveRecords = await this.leaveRepository
            .createQueryBuilder(leaveAlias)
            .innerJoin(`${leaveAlias}.employee`, employeeAlias)
            .addSelect([
            ...(0, employee_fields_for_common_info_util_1.employeeFieldsForCommonInfo)(employeeAlias),
            ...(0, employee_fields_for_assignment_util_1.employeeFieldsForAssignment)(employeeAlias),
        ])
            .leftJoin(`${employeeAlias}.payrollGroups`, payrollGroupAlias)
            .addSelect((0, payroll_group_fieds_for_calculate_day_leaveutil_1.payrollGroupFieldsForCalculateDayLeave)(payrollGroupAlias))
            .innerJoin(`${leaveAlias}.leaveType`, leaveTypeAlias)
            .addSelect((0, fields_seletion_util_1.leaveTypeFieldsSelectForLeaveValidate)(leaveTypeAlias))
            .leftJoin(`${leaveAlias}.approverTrx`, approverTrxAlias, `${approverTrxAlias}.moduleId = :moduleId 
        AND ${approverTrxAlias}.companyId = :companyId
        `, { moduleId: enums_1.EMainModuleNumber.LEAVE, companyId })
            .addSelect((0, approver_trx_for_common_info_util_1.approverTrxFieldsForCommonInfo)(approverTrxAlias))
            .andWhere(`${leaveAlias}.isDeleted = :isDeleted
        AND ${leaveAlias}.id IN (:...ids)
        AND ${leaveAlias}.companyId = :companyId
        `, { isDeleted: false, ids, companyId })
            .orderBy(`${leaveAlias}.id`, 'DESC')
            .getMany();
        if (!leaveRecords.length) {
            return { records: [], errorIds: [], errorMessage: '' };
        }
        let farthestDateFrom = leaveRecords[0].dateFrom;
        let farthestDateTo = leaveRecords[0].dateTo;
        leaveRecords.forEach(leave => {
            if (moment(leave.dateFrom).isBefore(farthestDateFrom)) {
                farthestDateFrom = leave.dateFrom;
            }
            if (moment(leave.dateTo).isAfter(farthestDateTo)) {
                farthestDateTo = leave.dateTo;
            }
        });
        const publicHolidays = await this.publicHolidayService.getAllPublicHolidaysInDateRange({
            companyId,
            dateFromString: moment(farthestDateFrom).format(constants_1.DATE_STRING),
            dateToString: moment(farthestDateTo).format(constants_1.DATE_STRING),
        });
        const newRecords = [];
        const errorRecords = [];
        const today = moment().utc().startOf('date');
        for (let i = 0; i < leaveRecords.length; i++) {
            const record = leaveRecords[i];
            let newStatusId = record.statusId;
            const { daysInAdvance, allowPastDates, parentId } = record.leaveType;
            if (daysInAdvance && statusId === enums_1.ELeaveStatusId.AWAIT_APPROVAL) {
                if (!allowPastDates ||
                    moment(record.dateFrom).diff(today, 'days') >= 0) {
                    const isValid = moment(record.dateFrom).diff(today, 'days') >= daysInAdvance;
                    if (!isValid)
                        throw new common_1.BadRequestException({
                            statusCode: common_1.HttpStatus.BAD_REQUEST,
                            message: `LeaveNo #${record.leaveNo}! Please submit your request at least ${daysInAdvance} days in advance of the starting date.`,
                        });
                }
            }
            let approvedBy = record.approvedBy || '';
            let approvedOn = record.approvedOn?.toString();
            const hasNoApprover = !record?.approverTrx?.length;
            const essActor = (authEmployeeId === record.employeeId ||
                authEmail === record.createdBy) &&
                appMode === enums_1.EApiAppMode.ESS;
            const adminActor = appMode === enums_1.EApiAppMode.ADMIN;
            if (hasNoApprover) {
                if (statusId === enums_1.ELeaveStatusId.AWAIT_APPROVAL &&
                    record.statusId === enums_1.ELeaveStatusId.DRAFT) {
                    newStatusId = enums_1.ELeaveStatusId.APPROVED;
                    approvedBy = `${authEmail},${approvedBy}`;
                    approvedOn = new Date().toUTCString();
                }
                else if (statusId === enums_1.ELeaveStatusId.DRAFT &&
                    record.statusId === enums_1.ELeaveStatusId.AWAIT_APPROVAL) {
                    newStatusId = statusId;
                }
                else if (statusId === enums_1.ELeaveStatusId.CANCELLED &&
                    record.statusId === enums_1.ELeaveStatusId.APPROVED) {
                    if (essActor && statusId === enums_1.ELeaveStatusId.CANCELLED) {
                        const { dateFrom, dateTo } = record;
                        if (today.isAfter(moment(dateFrom)) ||
                            today.isAfter(moment(dateTo))) {
                            throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE.DISALLOW_EMPLOYEE_CANCEL_PASS_LEAVE_DATE);
                        }
                    }
                    if (!remark) {
                        throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE.CANCELLATION_MISSING_REMARK);
                    }
                    else {
                        Object.assign(record, { remark });
                    }
                    newStatusId = statusId;
                }
            }
            else if ((essActor || adminActor) &&
                [enums_1.ELeaveStatusId.DRAFT, enums_1.ELeaveStatusId.AWAIT_APPROVAL].includes(record.statusId) &&
                [enums_1.ELeaveStatusId.DRAFT, enums_1.ELeaveStatusId.AWAIT_APPROVAL].includes(statusId)) {
                newStatusId = statusId;
                approvedBy = '';
                approvedOn = undefined;
            }
            else if ([enums_1.ELeaveStatusId.AWAIT_APPROVAL].includes(record.statusId)) {
                const approver = [];
                const approverTrx = record?.approverTrx || [];
                for (let i = 0; i < approverTrx.length; i++) {
                    const element = approverTrx[i];
                    approver.push(element.userEmail);
                }
                if (!approver.includes(authEmail))
                    throw new common_1.ForbiddenException({
                        statusCode: common_1.HttpStatus.FORBIDDEN,
                        message: `LeaveNo #${record.leaveNo}! Attempt to approve the leave is not allowed`,
                    });
                if (statusId === enums_1.ELeaveStatusId.APPROVED) {
                    if (!record.allMustApprove) {
                        newStatusId = statusId;
                        if (!record.approvedBy?.includes(authEmail)) {
                            approvedBy = `${authEmail},${approvedBy}`;
                            approvedOn = moment().utc().format('YYYY-MM-DD HH:mm:ss');
                        }
                    }
                    else {
                        const otherApprover = approver.filter(e => e !== authEmail && e !== '');
                        let isApprove = true;
                        for (let index = 0; index < otherApprover.length; index++) {
                            const approverEmail = otherApprover[index];
                            if (!record.approvedBy?.includes(approverEmail))
                                isApprove = false;
                        }
                        if (isApprove) {
                            newStatusId = statusId;
                        }
                        if (!record.approvedBy?.includes(authEmail)) {
                            approvedBy = `${authEmail},${record.approvedBy}`;
                            approvedOn = moment().utc().format('YYYY-MM-DD HH:mm:ss');
                        }
                    }
                }
                else if (statusId === enums_1.ELeaveStatusId.DECLINE) {
                    newStatusId = statusId;
                    approvedBy = '';
                    approvedOn = undefined;
                }
            }
            else if ([enums_1.ELeaveStatusId.APPROVED].includes(record.statusId)) {
                if (statusId === enums_1.ELeaveStatusId.CANCELLED) {
                    if (essActor && statusId === enums_1.ELeaveStatusId.CANCELLED) {
                        const { dateFrom, dateTo } = record;
                        if (today.isAfter(moment(dateFrom)) ||
                            today.isAfter(moment(dateTo))) {
                            throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE.DISALLOW_EMPLOYEE_CANCEL_PASS_LEAVE_DATE);
                        }
                    }
                    if (!remark) {
                        throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE.CANCELLATION_MISSING_REMARK);
                    }
                    else {
                        Object.assign(record, { remark });
                    }
                    newStatusId = statusId;
                }
            }
            const cloneApproverTrx = structuredClone(record?.approverTrx || []);
            delete record.approverTrx;
            let effDayOfLeave = record.effDayOfLeave;
            if (newStatusId === enums_1.ELeaveStatusId.AWAIT_APPROVAL) {
                const { totalDayLeaves } = await this.getTotalDayLeaves(record.companyId, record, {
                    employee: record.employee,
                    leaveType: record.leaveType,
                    payrollGroup: record.employee?.payrollGroups,
                    publicHolidays,
                });
                effDayOfLeave = totalDayLeaves;
            }
            record.parentLeaveTypeId = parentId ? parentId : null;
            const newRcd = {
                ...record,
                statusId: newStatusId,
                updatedBy: authEmail,
                approvedBy,
                approvedOn: approvedOn ? new Date(approvedOn) : undefined,
                declinedBy: newStatusId === enums_1.ELeaveStatusId.DECLINE ? authEmail : undefined,
                declinedOn: newStatusId === enums_1.ELeaveStatusId.DECLINE ? new Date() : undefined,
                cancelledBy: newStatusId === enums_1.ELeaveStatusId.CANCELLED ? authEmail : undefined,
                cancelledOn: newStatusId === enums_1.ELeaveStatusId.CANCELLED ? new Date() : undefined,
                effDayOfLeave,
                employee: record.employee,
            };
            let leaveSaved = null;
            if (newRcd.statusId !== enums_1.ELeaveStatusId.APPROVED &&
                newRcd.statusId !== enums_1.ELeaveStatusId.CANCELLED) {
                leaveSaved = await this.repository.save(newRcd);
            }
            else {
                try {
                    const result = await this.calculateBalanceAndUpdate({
                        authEmail,
                        newStatusId,
                        leaveRecordId: newRcd.id,
                        approveBy: newRcd.approvedBy,
                        approveOn: newRcd?.approvedOn,
                        leaveType: newRcd.leaveType,
                        cancelledBy: newRcd?.cancelledBy,
                        cancelledOn: newRcd?.cancelledOn,
                        declinedBy: newRcd?.declinedBy,
                        declinedOn: newRcd?.declinedOn,
                        leaveRecord: record,
                    });
                    if (result && result[0])
                        leaveSaved = result[0];
                }
                catch (error) {
                    errorRecords.push(newRcd.id);
                }
            }
            if (leaveSaved) {
                newRecords.push({ ...leaveSaved, approverTrx: cloneApproverTrx });
            }
        }
        const records = newRecords.filter(r => !errorRecords.includes(r.id));
        if (records.length && !errorRecords.length) {
            await Promise.all([
                this.sendNotifications(companyId, action, authEmail, records),
                this.deductCreditPolicy(action, authEmail, records),
            ]);
        }
        return {
            records,
            errorIds: errorRecords,
            errorMessage: errorRecords?.length
                ? constants_1.ERR_MSG.LEAVE.EXCEED_BALANCE_WHEN_APPROVE
                : '',
        };
    }
    async sendNotifications(companyId, approvalAction, authEmail, leaveRecords) {
        const params = mapper_1.LeaveHrforteNotificationMapper.toParams(approvalAction, authEmail, leaveRecords, this.appConfig.clientUrl);
        await this.hrforteNotificationProducer.addSendBulkJob({
            companyId,
            params,
        });
    }
    async deductCreditPolicy(approvalAction, authEmail, leaveRecords) {
        const actionUpper = approvalAction?.toUpperCase();
        if (enums_1.EApprovalActions[actionUpper] === enums_1.EApprovalActions.APPROVE ||
            enums_1.EApprovalActions[actionUpper] === enums_1.EApprovalActions.SUBMIT) {
            await this.deduction(authEmail, leaveRecords);
        }
        else if (enums_1.EApprovalActions[actionUpper] === enums_1.EApprovalActions.CANCEL) {
            await this.reverting(authEmail, leaveRecords);
        }
    }
    async deduction(authMail, records = []) {
        for (const leave of records) {
            const { effDayOfLeave: amountLeaveDeduct = 0, id: leaveId = undefined, companyId = undefined, employeeId = undefined, leaveTypeId = undefined, statusId = undefined, parentLeaveTypeId = undefined, } = leave;
            if (statusId &&
                statusId === enums_1.ELeaveStatusId.APPROVED &&
                amountLeaveDeduct > 0) {
                await this.leaveTypePolicyProducer.addDeductionJob({
                    amountLeaveDeduct,
                    authMail: authMail,
                    companyId,
                    employeeId,
                    leaveId,
                    leaveTypeId: parentLeaveTypeId || leaveTypeId,
                });
            }
        }
    }
    async reverting(authMail, records = []) {
        for (const leave of records) {
            const { companyId = undefined, employeeId = undefined, id: leaveId = undefined, statusId = undefined, } = leave;
            if (statusId && statusId === enums_1.ELeaveStatusId.CANCELLED) {
                await this.leaveTypePolicyProducer.addRevertingJob({
                    leaveId,
                    companyId,
                    employeeId,
                    authMail,
                });
            }
        }
    }
    async updateLeaveRecord(payload) {
        const { companyId, leaveId, body, authInfo } = payload;
        const { authEmail, utcOffset } = authInfo;
        const currentDate = new Date(new Date().setMinutes(utcOffset));
        const leaveAlias = database_1.ETableName.LEAVE;
        const employeeAlias = database_1.ETableName.EMPLOYEE;
        const prGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const leaveTypeAlias = database_1.ETableName.LEAVE_TYPE;
        const parentLtAlias = `parent_${leaveTypeAlias}`;
        const assignmentAlias = database_1.ETableName.LEAVE_TYPE_ASSIGNMENT;
        const leaveRecord = await this.repository
            .createQueryBuilder(leaveAlias)
            .andWhere(`${leaveAlias}.isDeleted = :isDeleted
        AND ${leaveAlias}.companyId = :companyId
        AND ${leaveAlias}.id = :leaveId
      `, { isDeleted: false, companyId, leaveId })
            .leftJoin(`${leaveAlias}.employee`, employeeAlias)
            .addSelect((0, utils_1.uniqueArray)([
            ...(0, employee_fields_for_common_info_util_1.employeeFieldsForCommonInfo)(employeeAlias),
            ...(0, employee_fields_for_assignment_util_1.employeeFieldsForAssignment)(employeeAlias),
        ]))
            .leftJoin(`${employeeAlias}.payrollGroups`, prGroupAlias)
            .addSelect((0, payroll_group_fieds_for_calculate_day_leaveutil_1.payrollGroupFieldsForCalculateDayLeave)(prGroupAlias))
            .leftJoin(`${leaveAlias}.leaveType`, leaveTypeAlias)
            .addSelect((0, leave_type_fields_for_get_leave_util_1.leaveTypeFieldsForGetLeave)(leaveTypeAlias))
            .leftJoin(`${leaveTypeAlias}.parent`, parentLtAlias)
            .addSelect((0, leave_type_fields_for_get_leave_util_1.leaveTypeFieldsForGetLeave)(parentLtAlias))
            .leftJoin(`${leaveTypeAlias}.leaveTypeAssignment`, assignmentAlias)
            .addSelect((0, assignment_fields_for_leave_validate_util_1.assignmentFieldsForLeaveValidate)(assignmentAlias))
            .getOne();
        this.leaveHelper.validateUpdateLeaveRecord(authInfo, leaveRecord);
        if (body.leaveTypeId && body.leaveTypeId !== leaveRecord.leaveTypeId) {
            const leaveType = await this.leaveTypeService.repository
                .createQueryBuilder(leaveTypeAlias)
                .andWhere(`${leaveTypeAlias}.isDeleted = :isDeleted
          AND ${leaveTypeAlias}.id = :leaveTypeId
          `, { isDeleted: false, leaveTypeId: body.leaveTypeId })
                .select((0, leave_type_fields_for_get_leave_util_1.leaveTypeFieldsForGetLeave)(leaveTypeAlias))
                .leftJoin(`${leaveTypeAlias}.parent`, parentLtAlias)
                .addSelect((0, leave_type_fields_for_get_leave_util_1.leaveTypeFieldsForGetLeave)(parentLtAlias))
                .leftJoin(`${leaveTypeAlias}.leaveTypeAssignment`, assignmentAlias)
                .addSelect((0, assignment_fields_for_leave_validate_util_1.assignmentFieldsForLeaveValidate)(assignmentAlias))
                .getOne();
            if (!leaveType) {
                throw new common_1.NotFoundException(`Not found leave type with id ${body.leaveTypeId}`);
            }
            leaveRecord.leaveTypeId = leaveType.id;
            leaveRecord.leaveType = leaveType;
        }
        await this.checkValidateForCreateLeave({
            currentDate,
            companyId,
            leave: { ...body, employeeId: leaveRecord.employeeId, id: leaveId },
            leaveType: leaveRecord.leaveType,
            employee: leaveRecord.employee,
            payrollGroup: leaveRecord.employee.payrollGroups,
        });
        this.leaveTypeAssignmentService.checkValidateForCreateLeave(leaveRecord.employee, leaveRecord.leaveType?.leaveTypeAssignment);
        return this.repository.save({
            ...(0, utils_1.copyObjectWithExclusion)(leaveRecord, ['leaveType', 'employee']),
            ...body,
            updatedBy: authEmail,
            updatedOn: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
        });
    }
    async deleteLeaveRecord(payload) {
        const { companyId, body, authInfo: { authEmployeeId, appMode }, } = payload;
        const { ids } = body;
        const leaveRecords = await this.repository.find({
            where: { id: (0, typeorm_2.In)(ids), companyId },
        });
        for (let i = 0; i < leaveRecords.length; i++) {
            const record = leaveRecords[i];
            if (record.statusId !== enums_1.ELeaveStatusId.DRAFT ||
                (record.employeeId !== authEmployeeId && appMode === enums_1.EApiAppMode.ESS))
                throw new common_1.ForbiddenException({
                    statusCode: common_1.HttpStatus.FORBIDDEN,
                    message: 'Access Denied',
                });
        }
        const deletedLeaveRecords = leaveRecords.map(record => ({
            ...record,
            deletedOn: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
            isDeleted: true,
        }));
        await this.repository.save(deletedLeaveRecords);
        return true;
    }
    async getLeaveDashboard(companyId, authInfo) {
        const { authEmployeeId: employeeId, ranking } = authInfo;
        if (!employeeId) {
            if (ranking === enums_1.EUserRanking.GOLD) {
                return {
                    annualBalance: 0,
                    numPaidLeaveOnMonth: 0,
                    numUnPaidLeaveOnMonth: 0,
                    numAwaitApprovalPaidDays: 0,
                    numAwaitApprovalUnPaidDays: 0,
                };
            }
            throw new common_1.NotFoundException('[Employee] Not found');
        }
        const ltAlias = database_1.ETableName.LEAVE_TYPE;
        const ltbAlias = `ltb`;
        const [leaveTypeSqlRawResult, numPaidLeaveOnMonth, numUnPaidLeaveOnMonth, numAwaitApprovalPaidDays, numAwaitApprovalUnPaidDays,] = await Promise.all([
            this.leaveTypeService.repository
                .createQueryBuilder(ltAlias)
                .where(`${ltAlias}.isDeleted = :isDeleted
          AND ${ltAlias}.companyId = :companyId
          AND ${ltAlias}.code = :code
          `, { isDeleted: false, companyId, code: 'AL' })
                .innerJoinAndMapOne(`${ltAlias}.employeeLeaveTypeBalance`, entities_1.LeaveTypeBalanceEntity, ltbAlias, `${ltbAlias}.leaveTypeId = ${ltAlias}.id
        AND ${ltbAlias}.employeeId = :employeeId
        AND ${ltbAlias}.isDeleted = :isDeleted
        `, { employeeId, isDeleted: false })
                .select([`${ltAlias}.id`, `${ltbAlias}.id`, `${ltbAlias}.balance`])
                .getRawOne(),
            this.getTotalEffectDayOfLeaveByKind({
                kind: 'APPROVED_PAID',
                companyId,
                employeeId,
            }),
            this.getTotalEffectDayOfLeaveByKind({
                kind: 'APPROVED_UNPAID',
                companyId,
                employeeId,
            }),
            this.getTotalEffectDayOfLeaveByKind({
                kind: 'AWAIT_PAID',
                companyId,
                employeeId,
            }),
            this.getTotalEffectDayOfLeaveByKind({
                kind: 'AWAIT_UNPAID',
                companyId,
                employeeId,
            }),
        ]);
        return {
            annualBalance: Number(leaveTypeSqlRawResult?.ltb_balance ?? 0),
            numPaidLeaveOnMonth,
            numUnPaidLeaveOnMonth,
            numAwaitApprovalPaidDays,
            numAwaitApprovalUnPaidDays,
        };
    }
    async getTotalEffectDayOfLeaveByKind(args) {
        const { kind, companyId, employeeId } = args;
        const [statusKind, paidKind] = kind.split('_');
        const leaveAlias = entities_1.LeaveEntity.name;
        const queryBuilder = this.leaveRepository.createQueryBuilder(leaveAlias);
        queryBuilder.innerJoin(`${leaveAlias}.leaveType`, entities_1.LeaveTypeEntity.name, `${entities_1.LeaveTypeEntity.name}.paidLeave = :paidKind`, { paidKind: paidKind === 'UNPAID' ? false : true });
        queryBuilder
            .andWhere(`${leaveAlias}.isDeleted = :isDeleted`, { isDeleted: false })
            .andWhere(`${leaveAlias}.companyId = :companyId`, { companyId })
            .andWhere(`${leaveAlias}.employeeId = :employeeId`, { employeeId })
            .andWhere(`${leaveAlias}.statusId = :statusKind`, {
            statusKind: statusKind === 'APPROVED'
                ? enums_1.ELeaveStatusId.APPROVED
                : enums_1.ELeaveStatusId.AWAIT_APPROVAL,
        });
        if (statusKind === 'APPROVED') {
            const startOfMonth = moment().utc().startOf('month').toISOString();
            const endOfMonth = moment().utc().endOf('month').toISOString();
            queryBuilder.andWhere(`${leaveAlias}.dateFrom >= :startOfMonth`, {
                startOfMonth,
            });
            queryBuilder.andWhere(`${leaveAlias}.dateTo <= :endOfMonth`, {
                endOfMonth,
            });
        }
        queryBuilder.select(`SUM(${leaveAlias}.effDayOfLeave)`, 'totalDays');
        const { totalDays } = await queryBuilder.getRawOne();
        return totalDays ?? 0;
    }
    async getLeaveHistoriesByQuery(payload) {
        const { authInfo, companyId, query } = payload;
        const { authEmployeeId } = authInfo;
        const { employeeIds, leaveTypeIds, policyIds, types, startDate, endDate, sort, } = query;
        if ((0, utils_1.isGoldUserAccessEssWithoutEmp)(authInfo)) {
            return new dto_1.PaginationResponseDto({
                paginationDto: query,
                itemCount: 0,
                data: [],
            });
        }
        const listEmployeeIds = employeeIds?.length
            ? employeeIds
            : [authEmployeeId];
        const baseQueryBuilder = this.leaveTrxService.createBaseQueryBuilder(query);
        const trxEntityName = this.leaveTrxService.entityName;
        const pagination = await this.leaveTrxService.getEntitiesByQuery({ ...query }, () => {
            baseQueryBuilder
                .andWhere(`${trxEntityName}.companyId = :companyId`, {
                companyId,
            })
                .andWhere(`${trxEntityName}.employeeId IN (:...employeeIds)`, {
                employeeIds: listEmployeeIds,
            });
            (0, utils_1.filterEmployeeQueryBuilderInEssMode)(authInfo, baseQueryBuilder, {
                field: 'employeeId',
                value: authEmployeeId,
                customVariable: 'authEmployeeId',
            });
            if (leaveTypeIds?.length) {
                baseQueryBuilder.andWhere(`${trxEntityName}.leaveTypeId IN (:...leaveTypeIds)`, { leaveTypeIds });
            }
            if (policyIds?.length) {
                baseQueryBuilder.andWhere(`${trxEntityName}.policyId IN (:...policyIds)`, { policyIds });
            }
            if (types?.length) {
                baseQueryBuilder.andWhere(`${trxEntityName}.type IN (:...types)`, {
                    types,
                });
            }
            if (startDate || endDate) {
                baseQueryBuilder
                    .andWhere(`${trxEntityName}.date >= :startDate`, {
                    startDate: startDate ? new Date(startDate) : new Date(1945, 1, 1),
                })
                    .andWhere(`${trxEntityName}.date <= :endDate`, {
                    endDate: endDate ? new Date(endDate) : new Date(),
                });
            }
            if (!sort) {
                baseQueryBuilder.addOrderBy(`${trxEntityName}.date`, 'ASC');
                baseQueryBuilder.addOrderBy(`${trxEntityName}.id`, 'ASC');
            }
            return baseQueryBuilder;
        });
        return pagination;
    }
    async calculateBalanceAndUpdate(payload) {
        const { authEmail, leaveRecordId, newStatusId, approveOn = undefined, approveBy, leaveType, cancelledBy = null, cancelledOn = null, declinedBy = null, declinedOn = null, } = payload;
        const leaveRecord = payload.leaveRecord
            ? payload.leaveRecord
            : await this.leaveRepository.findOneBy({ id: leaveRecordId });
        if (!leaveRecord)
            return undefined;
        const { statusId, companyId, leaveTypeId, employeeId, parentLeaveTypeId } = leaveRecord;
        const isApproved = newStatusId === enums_1.ELeaveStatusId.APPROVED &&
            [enums_1.ELeaveStatusId.DRAFT, enums_1.ELeaveStatusId.AWAIT_APPROVAL].includes(statusId);
        const isCancelled = newStatusId === enums_1.ELeaveStatusId.CANCELLED &&
            statusId === enums_1.ELeaveStatusId.APPROVED;
        if (!(isApproved || isCancelled))
            return;
        const leaveTypeIdForBalance = parentLeaveTypeId || leaveTypeId;
        const [latestLeaveTrx, { totalDayLeaves: effectiveDays }, leaveTypeBalance,] = await Promise.all([
            this.leaveTrxService.repository.findOne({
                where: {
                    employeeId,
                    companyId,
                    leaveTypeId: leaveTypeIdForBalance,
                    isDeleted: false,
                },
                order: { date: 'DESC', id: 'DESC' },
                select: { id: true, balance: true },
            }),
            this.getTotalDayLeaves(leaveRecord.companyId, leaveRecord),
            this.leaveTypeBalanceService.repository.findOneBy({
                companyId,
                leaveTypeId: leaveTypeIdForBalance,
                employeeId,
                isDeleted: false,
            }),
        ]);
        let balance = latestLeaveTrx ? parseFloat(`${latestLeaveTrx.balance}`) : 0;
        if (isApproved) {
            balance = balance - effectiveDays;
            if (balance < 0) {
                if (!leaveType?.allowApplyExceed) {
                    throw new common_1.BadRequestException(`LeaveNo #${leaveRecord.leaveNo} No exceed balance allow`);
                }
            }
        }
        else {
            balance = balance + effectiveDays;
        }
        const promiseResolveWorks = [];
        const leaveRecordUpdated = this.repository.save({
            ...leaveRecord,
            statusId: newStatusId,
            updatedBy: authEmail,
            effDayOfLeave: effectiveDays,
            approvedBy: approveBy,
            approvedOn: approveOn || undefined,
            cancelledBy: cancelledBy || undefined,
            cancelledOn: cancelledOn || undefined,
            declinedBy: declinedBy || undefined,
            declinedOn: declinedOn || undefined,
        });
        promiseResolveWorks.push(leaveRecordUpdated);
        const createOrUpdateLeaveTypeBalance = leaveTypeBalance
            ?
                this.leaveTypeBalanceService.repository.save({
                    ...leaveTypeBalance,
                    balance,
                })
            :
                this.leaveTypeBalanceService.repository.save({
                    companyId,
                    leaveTypeId: leaveTypeIdForBalance,
                    employeeId,
                    createdBy: authEmail,
                    balance,
                });
        promiseResolveWorks.push(createOrUpdateLeaveTypeBalance);
        const newLeaveTrxCreated = this.leaveTrxService.repository.save({
            companyId,
            employeeId,
            leaveTypeId: leaveTypeIdForBalance,
            sign: isApproved ? -1 : 1,
            unit: effectiveDays,
            balance,
            type: isApproved ? enums_1.EHistoryType.USE : enums_1.EHistoryType.REVERT,
            createdBy: authEmail,
            date: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
            createdOn: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
        });
        promiseResolveWorks.push(newLeaveTrxCreated);
        return Promise.all(promiseResolveWorks);
    }
    async calculateEffectiveDays(args) {
        const companyId = args.companyId;
        const { dateFrom, fromFdHd, dateTo, toFdHd, employeeId, leaveTypeId } = args.leaveRecord;
        const dateTimeFrom = moment(dateFrom);
        const dateTimeTo = moment(dateTo);
        const focusYearFrom = dateTimeFrom.year();
        const focusYearTo = dateTimeTo.year();
        const focusYears = [];
        for (let year = focusYearFrom; year <= focusYearTo; year++) {
            focusYears.push(year);
        }
        const [leaveType, employee, publicHolidays] = await Promise.all([
            args?.leaveType ??
                this.leaveTypeService.checkExist({
                    where: { id: leaveTypeId, companyId, isDeleted: false },
                    select: {
                        id: true,
                        includePublicHoliday: true,
                        includeNonWorkingDay: true,
                    },
                }),
            args?.employee ??
                this.employeeService.checkExist({
                    where: { id: employeeId },
                    select: { id: true, payrollGroupId: true },
                }),
            args?.publicHolidays ??
                this.publicHolidayService.repository.find({
                    where: {
                        companyId,
                        year: (0, typeorm_2.In)(focusYears),
                        isDeleted: false,
                        active: true,
                    },
                    select: { id: true, date: true },
                }),
        ]);
        const { includePublicHoliday, includeNonWorkingDay } = leaveType;
        const payrollGroup = args?.payrollGroup ??
            (await this.payRollGroupService.repository.findOne({
                where: { companyId, isDeleted: false, id: employee.payrollGroupId },
                relations: ['payrollGroupWorkDays'],
                select: {
                    id: true,
                    mon: true,
                    tue: true,
                    wed: true,
                    thu: true,
                    fri: true,
                    sat: true,
                    sun: true,
                    payrollGroupWorkDays: true,
                },
            }));
        const totalDayLeave = dateTimeTo.diff(moment(dateFrom), 'd') + 1;
        let subtractInactiveDays = 0;
        const MOMENT_FORMAT = 'L';
        const dateFormatHolidays = publicHolidays.map(item => moment(item.date).format(MOMENT_FORMAT));
        let subtractHalfDayFrom = 1 - fromFdHd;
        let subtractHalfDayTo = 1 - toFdHd;
        const focusPayrollWorkDays = payrollGroup?.payrollGroupWorkDays?.filter(item => focusYears.includes(item.year));
        focusYears.forEach(focusYear => {
            const focusPayrollWorkDay = focusPayrollWorkDays?.find(item => item.year === focusYear);
            if (focusPayrollWorkDay) {
                const workDayPayrollInfo = {};
                const startDatePayroll = moment(`${focusYear}-01-01`);
                for (let j = 1; j <= 366; j += 1) {
                    const stepDatePayroll = startDatePayroll.clone().add(j - 1, 'days');
                    if (stepDatePayroll.year() === focusYear) {
                        const stepDateFormatPayroll = stepDatePayroll.format(MOMENT_FORMAT);
                        workDayPayrollInfo[stepDateFormatPayroll] =
                            focusPayrollWorkDay?.[`value_${j}`];
                    }
                }
                for (let i = 0; i < totalDayLeave; i += 1) {
                    const stepDate = dateTimeFrom.clone().add(i, 'days');
                    if (stepDate.year() !== focusYear)
                        continue;
                    const stepDateFormat = stepDate.format(MOMENT_FORMAT);
                    if (dateFormatHolidays.includes(stepDateFormat) &&
                        !includePublicHoliday) {
                        subtractInactiveDays = subtractInactiveDays + 1;
                    }
                    else {
                        const dayStr = stepDate.format(MOMENT_FORMAT);
                        if (workDayPayrollInfo[dayStr] < 1) {
                            if (!(workDayPayrollInfo[dayStr] === 0 && includeNonWorkingDay)) {
                                subtractInactiveDays =
                                    subtractInactiveDays + (1 - workDayPayrollInfo[dayStr]);
                            }
                        }
                    }
                }
                const dateFromFormat = dateTimeFrom.format(MOMENT_FORMAT);
                if ([enums_1.ELeaveDayOff.FULL_DAY_OFF, enums_1.ELeaveDayOff.HALF_DAY_OFF].includes(workDayPayrollInfo[dateFromFormat]) ||
                    dateFormatHolidays.includes(dateFromFormat))
                    subtractHalfDayFrom = 0;
                const dateToFormat = dateTimeTo.format(MOMENT_FORMAT);
                if ([enums_1.ELeaveDayOff.FULL_DAY_OFF, enums_1.ELeaveDayOff.HALF_DAY_OFF].includes(workDayPayrollInfo[dateToFormat]) ||
                    dateFormatHolidays.includes(dateToFormat))
                    subtractHalfDayTo = 0;
            }
            else {
                const { mon, tue, wed, thu, fri, sat, sun } = payrollGroup || {};
                const datePayroll = {
                    Monday: mon,
                    Tuesday: tue,
                    Wednesday: wed,
                    Thursday: thu,
                    Friday: fri,
                    Saturday: sat,
                    Sunday: sun,
                };
                for (let i = 0; i < totalDayLeave; i += 1) {
                    const stepDate = dateTimeFrom.clone().add(i, 'days');
                    if (stepDate.year() !== focusYear)
                        continue;
                    const stepDateFormat = stepDate.format(MOMENT_FORMAT);
                    if (dateFormatHolidays.includes(stepDateFormat) &&
                        !includePublicHoliday) {
                        subtractInactiveDays = subtractInactiveDays + 1;
                    }
                    else if (stepDate.year() === focusYear) {
                        const dayStr = stepDate.format('dddd');
                        const datePayrollValue = Number(datePayroll[dayStr]);
                        if (datePayrollValue < 1) {
                            if (!(datePayroll[dayStr] === 0 && includeNonWorkingDay)) {
                                subtractInactiveDays =
                                    subtractInactiveDays + (1 - datePayrollValue);
                            }
                        }
                    }
                }
                const dateFromFormat = dateTimeFrom.format('dddd');
                const dateFromHolidayFormat = dateTimeFrom.format(MOMENT_FORMAT);
                if ((dateFormatHolidays.includes(dateFromHolidayFormat) &&
                    !includePublicHoliday) ||
                    datePayroll[dateFromFormat] === enums_1.ELeaveDayOff.HALF_DAY_OFF ||
                    (datePayroll[dateFromFormat] === enums_1.ELeaveDayOff.FULL_DAY_OFF &&
                        !includeNonWorkingDay))
                    subtractHalfDayFrom = 0;
                const dateToFormat = dateTimeTo.format('dddd');
                const dateToHolidayFormat = dateTimeTo.format(MOMENT_FORMAT);
                if ((dateFormatHolidays.includes(dateToHolidayFormat) &&
                    !includePublicHoliday) ||
                    datePayroll[dateToFormat] === enums_1.ELeaveDayOff.HALF_DAY_OFF ||
                    (datePayroll[dateToFormat] === enums_1.ELeaveDayOff.FULL_DAY_OFF &&
                        !includeNonWorkingDay))
                    subtractHalfDayTo = 0;
            }
        });
        subtractInactiveDays =
            subtractInactiveDays + subtractHalfDayFrom + subtractHalfDayTo;
        const effectiveDays = totalDayLeave - subtractInactiveDays;
        return effectiveDays;
    }
    async groupByLeaveRecordByLeaveType(companyId, query, authInfo) {
        const { leaveTypeIds, employeeIds, statusId, year, statusIds } = query;
        if ((0, utils_1.isGoldUserAccessEssWithoutEmp)(authInfo))
            return { records: {} };
        const momentYear = moment(`${year}-01-01`);
        const startDate = momentYear.startOf('year').format('YYYY-MM-DD');
        const endDate = momentYear.endOf('year').format('YYYY-MM-DD');
        const baseQueryBuilder = this.repository.createQueryBuilder(`${this.entityName}`);
        const dbType = this.dbConfig.type;
        baseQueryBuilder
            .select(`${dbType === 'postgres' ? 'to_char' : 'format'}(${this.entityName}.dateFrom, \'YYYY-MM\')`, `start_month`)
            .addSelect(`${dbType === 'postgres' ? 'to_char' : 'format'}(${this.entityName}.dateTo, \'YYYY-MM\')`, 'end_month')
            .addSelect(`${this.entityName}.leaveTypeId`, 'leaveTypeId')
            .addSelect('COUNT(*)', 'count')
            .addSelect(`leaveType.id AS leaveTypeId`)
            .addSelect(`leaveType.name AS name`)
            .addSelect(`leaveType.color AS color`)
            .addSelect(`leaveType.code AS code`)
            .leftJoin(`${this.entityName}.leaveType`, 'leaveType')
            .where(`${this.entityName}.dateFrom <= ${this.entityName}.dateTo`)
            .andWhere(`${this.entityName}.companyId = :companyId`, { companyId })
            .andWhere(`${this.entityName}.isDeleted = :isDeleted`, {
            isDeleted: false,
        })
            .andWhere(`${this.entityName}.dateFrom <= :endDate`, {
            endDate,
        })
            .andWhere(`${this.entityName}.dateTo >= :startDate`, {
            startDate,
        })
            .andWhere(`${this.entityName}.statusId = :statusId`, { statusId: 3 })
            .groupBy(dbType === 'postgres'
            ? `start_month, end_month, ${this.entityName}.leaveTypeId, leaveType.id`
            : `format(${this.entityName}.dateFrom, \'YYYY-MM\'), 
            format(${this.entityName}.dateTo, \'YYYY-MM\'), 
            ${this.entityName}.leaveTypeId, leaveType.id, leaveType.name, leaveType.color, leaveType.code`)
            .orderBy(dbType === 'postgres'
            ? 'start_month'
            : `format(${this.entityName}.dateFrom, \'YYYY-MM\')`)
            .addOrderBy(dbType === 'postgres'
            ? 'end_month'
            : `format(${this.entityName}.dateTo, \'YYYY-MM\')`)
            .addOrderBy(`${this.entityName}.leaveTypeId`);
        if (employeeIds?.length) {
            baseQueryBuilder.andWhere(`${this.entityName}.employeeId IN (:...employeeIds)`, { employeeIds });
        }
        if (leaveTypeIds?.length) {
            baseQueryBuilder.andWhere(`${this.entityName}.leaveTypeId IN (:...leaveTypeIds)`, { leaveTypeIds });
        }
        if (statusIds?.length) {
            baseQueryBuilder.andWhere(`${this.entityName}.statusId IN (:...statusIds)`, { statusIds });
        }
        else if (typeof statusId === 'number' && statusId >= 0) {
            baseQueryBuilder.andWhere(`${this.entityName}.statusId = :statusId`, {
                statusId,
            });
        }
        else {
            baseQueryBuilder.andWhere(`${this.entityName}.statusId = :statusId`, {
                statusId: enums_1.ELeaveStatusId.APPROVED,
            });
        }
        const records = await baseQueryBuilder.getRawMany();
        const groupBy = {
            records: {
                '1': [],
                '2': [],
                '3': [],
                '4': [],
                '5': [],
                '6': [],
                '7': [],
                '8': [],
                '9': [],
                '10': [],
                '11': [],
                '12': [],
            },
        };
        for (let i = 0; i < records.length; i++) {
            const r = records[i];
            let step = 0;
            let start = moment(r.start_month).format('M');
            while (+start <= +moment(r.end_month).format('M') &&
                moment(r.start_month).add(step, 'months').format('YYYY') ===
                    moment(r.end_month).format('YYYY')) {
                const index = groupBy.records[start].findIndex(record => record?.leaveTypeId === +r.leavetypeid);
                if (index >= 0) {
                    groupBy.records[start][index].count += +r.count;
                }
                else {
                    groupBy.records[start].push({
                        leaveTypeId: +r.leavetypeid,
                        count: +r.count,
                        color: r.color,
                        name: r.name,
                        code: r.code,
                    });
                }
                step += 1;
                start = moment(r.start_month).add(step, 'months').format('M');
            }
        }
        return groupBy;
    }
    async checkValidateForCreateLeave({ currentDate, companyId, employee, leave, leaveType, payrollGroup, }) {
        this.leaveHelper.leaveRecordHaveValidLeaveType(leaveType);
        this.leaveHelper.allowDateRangeOfLeave(leave, leaveType);
        this.leaveHelper.allowToApplyHalfDayLeave(leave, leaveType);
        this.leaveHelper.leaveApplicationShouldBeSubmittedBefore(currentDate, leave, leaveType);
        this.leaveHelper.allowToApplyLeaveInTheFuture(currentDate, leave, leaveType);
        this.leaveHelper.allowToApplyLeaveInThePast(currentDate, leave, leaveType);
        await this.leaveHelper.duplicateLeaveRecordInDateRange(companyId, leave, this.leaveRepository);
        const [{ totalDayLeaves: efftiveDays }, leaveTypeBalance] = await Promise.all([
            this.getTotalDayLeaves(companyId, leave, {
                leaveType,
                employee,
                payrollGroup: employee.payrollGroups,
            }),
            this.leaveTypeBalanceService.repository.findOne({
                where: {
                    leaveTypeId: leaveType.parentId || leaveType.id,
                    companyId,
                    employeeId: employee.id,
                },
                select: { id: true, balance: true },
            }),
        ]);
        this.leaveHelper.allowUserToApplyEvenLeaveExceedBalance(efftiveDays, leaveTypeBalance?.balance || 0, leaveType);
        this.leaveHelper.maximumLeaveThatCanBeAppliedPerApplication(efftiveDays, leaveType);
        await this.maximumConsecutiveDaysOfLeavesAllowed({ ...leave, companyId }, leaveType, employee, payrollGroup);
        return { efftiveDays, leaveTypeBalance };
    }
    async maximumConsecutiveDaysOfLeavesAllowed(leave, leaveType, employee, payrollGroup) {
        if (!leaveType.maxConsecutive)
            return;
        const [{ leaveDuration: fromFdHd, dateOut: dateFrom }, { leaveDuration: toFdHd, dateOut: dateTo },] = await Promise.all([
            this.furthestDateLeaveByKind({ kind: 'From', leave, payrollGroup }),
            this.furthestDateLeaveByKind({ kind: 'To', leave, payrollGroup }),
        ]);
        const { totalDayLeaves: maxConsecutive } = await this.getTotalDayLeaves(leave.companyId, {
            dateFrom,
            dateTo,
            fromFdHd,
            toFdHd,
            leaveTypeId: leave.leaveTypeId,
            employeeId: leave.employeeId,
            reason: leave.reason,
        }, {
            leaveType,
            employee,
            payrollGroup,
        });
        if (maxConsecutive > leaveType.maxConsecutive) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE_TYPE.MAX_CON_DAY_ERROR);
        }
    }
    async furthestDateLeaveByKind({ kind, leave, payrollGroup, }) {
        const halfDayKey = `${kind.toLowerCase()}FdHd`;
        let leaveDuration = Number(leave[halfDayKey]).valueOf();
        const dateInputKey = `date${kind}`;
        let momentDateClone = moment(leave[dateInputKey]).clone();
        const resetMomentDateClone = () => {
            kind === 'From'
                ? momentDateClone.add(1, 'days')
                : momentDateClone.subtract(1, 'days');
        };
        const idArr = leave?.id ? [leave.id] : [];
        const continueLoop = true;
        while (continueLoop) {
            const workingDay = await this.payRollGroupService.getWorkingDay(momentDateClone, payrollGroup);
            if (workingDay && leaveDuration === enums_1.ELeaveDuration.HALF_DAY)
                break;
            kind === 'From'
                ? momentDateClone.subtract(1, 'days')
                : momentDateClone.add(1, 'days');
            const leaveRecord = await this.getLeaveWithDateInputInRangeFromTo({
                idArr,
                leave,
                dateInput: new Date(`${momentDateClone.format('YYYY-MM-DD')}T00:00:00.000Z`),
                selectInput: {
                    id: true,
                    dateFrom: true,
                    dateTo: true,
                    fromFdHd: true,
                    toFdHd: true,
                },
            });
            if (!leaveRecord) {
                resetMomentDateClone();
                break;
            }
            if (kind === 'From' &&
                momentDateClone.diff(moment(leaveRecord.dateTo), 'days') > 1) {
                resetMomentDateClone();
                break;
            }
            else if (kind === 'To' &&
                moment(leaveRecord.dateFrom).diff(momentDateClone, 'days') > 1) {
                resetMomentDateClone();
                break;
            }
            leaveDuration = leaveRecord[halfDayKey];
            momentDateClone = moment(leaveRecord[dateInputKey]).clone();
            idArr.push(leaveRecord.id);
        }
        return {
            leaveDuration,
            dateOut: new Date(momentDateClone.format('YYYY-MM-DD')),
        };
    }
    async getLeaveWithDateInputInRangeFromTo({ dateInput, idArr = [], selectInput = {}, leave, }) {
        const whereOperator = {
            companyId: leave.companyId,
            employeeId: leave.employeeId,
            leaveTypeId: leave.leaveTypeId,
            isDeleted: false,
            dateTo: (0, typeorm_2.MoreThanOrEqual)(dateInput),
            dateFrom: (0, typeorm_2.LessThanOrEqual)(dateInput),
            statusId: (0, typeorm_2.Not)((0, typeorm_2.In)([enums_1.ELeaveStatusId.CANCELLED, enums_1.ELeaveStatusId.DECLINE])),
        };
        if (idArr.length) {
            whereOperator.id = (0, typeorm_2.Not)((0, typeorm_2.In)(idArr));
        }
        return this.leaveRepository.findOne({
            where: whereOperator,
            select: selectInput,
        });
    }
    async makeLeaveNo(companyId) {
        const result = await this.leaveRepository.query(`EXEC make_leave_no @compid = ${companyId}`);
        return Number(result[0].Result);
    }
    async getTotalDayLeaves(companyId, leaveRecord, opts = {}) {
        const { dateFrom, dateTo, fromFdHd, toFdHd, leaveTypeId, employeeId } = leaveRecord;
        const dateFromMoment = moment.utc(dateFrom);
        const dateToMoment = moment.utc(dateTo);
        const [employee, leaveType] = await Promise.all([
            opts.employee ??
                this.employeeService.repository.findOne({
                    where: { id: employeeId },
                    select: { id: true, payrollGroupId: true },
                }),
            opts.leaveType ??
                this.leaveTypeService.repository.findOne({
                    where: { id: leaveTypeId, isDeleted: false },
                    select: {
                        id: true,
                        includePublicHoliday: true,
                        includeNonWorkingDay: true,
                        allowApplyExceed: true,
                        cfRoundTo: true,
                    },
                }),
        ]);
        const includeNonWorkingDay = leaveType?.includeNonWorkingDay || false;
        const includePublicHoliday = leaveType?.includePublicHoliday || false;
        const dateFromString = dateFromMoment.format(constants_1.DATE_STRING);
        const dateToString = dateToMoment.format(constants_1.DATE_STRING);
        const payrollGroupId = employee?.payrollGroupId;
        const payrollGroupQuery = {
            isDeleted: false,
            code: '5DAYWEEK',
        };
        if (payrollGroupId) {
            delete payrollGroupQuery.code;
            payrollGroupQuery.id = payrollGroupId;
        }
        const payrollGroup = opts.payrollGroup
            ? opts.payrollGroup
            : await this.payRollGroupService.checkExist({
                where: payrollGroupQuery,
                select: {
                    id: true,
                    mon: true,
                    tue: true,
                    wed: true,
                    thu: true,
                    fri: true,
                    sat: true,
                    sun: true,
                    pgType: true,
                },
            });
        const [payrollGroupWorkDays, publicHolidays] = await Promise.all([
            opts.isNotGetWorkDays
                ? {}
                : this.payRollGroupWorkDayService.getPayrollGroupWorkDayTable({
                    dateFromMoment,
                    dateToMoment,
                    payrollGroupId: payrollGroup.id,
                    payrollGroupWorkDays: payrollGroup?.payrollGroupWorkDays,
                }),
            includePublicHoliday
                ? {}
                : this.publicHolidayService.getAllPublicHolidaysTableInDateRange({
                    companyId,
                    dateFromString,
                    dateToString,
                    publicHolidays: opts?.publicHolidays,
                }),
        ]);
        let totalDayLeaves = 0;
        const dayLeaveInfo = {
            workingFullDay: [],
            workingHalfDay: [],
            daysOff: [],
        };
        for (let fromMoment = dateFromMoment.clone(); fromMoment.isSameOrBefore(dateToMoment); fromMoment.add(1, 'day')) {
            const currentYear = fromMoment.year();
            const currentDateString = fromMoment.format(constants_1.DATE_STRING);
            const holiday = publicHolidays[currentYear]?.[currentDateString];
            const currentDayOfWeek = fromMoment.format(constants_1.DAY_OF_WEEK).toLowerCase();
            let workDay = payrollGroup[currentDayOfWeek];
            if (payrollGroup?.pgType === payroll_group_type_enum_1.EPayrollGroupType.HOURLY && workDay > 0) {
                workDay = enums_1.EWorkDay.WORKING_DAY;
            }
            if (payrollGroupWorkDays[currentYear]) {
                const currentDayOfYear = fromMoment.dayOfYear();
                const wd = payrollGroupWorkDays[currentYear][`value_${currentDayOfYear}`];
                if (typeof wd === 'number' && !Number.isNaN(wd)) {
                    workDay = wd;
                }
            }
            if (workDay === enums_1.EWorkDay.DAY_OFF && includeNonWorkingDay) {
                workDay = enums_1.EWorkDay.WORKING_DAY;
            }
            if (holiday) {
                workDay = includePublicHoliday ? workDay : enums_1.EWorkDay.DAY_OFF;
            }
            if (workDay === enums_1.EWorkDay.DAY_OFF) {
                dayLeaveInfo.daysOff.push(currentDateString);
                continue;
            }
            const currentDayIsDateFromAndHalfDayOff = currentDateString === dateFromString &&
                fromFdHd === enums_1.ELeaveDuration.HALF_DAY;
            const currentDayIsDateToAndHalfDayOff = currentDateString === dateToString &&
                toFdHd === enums_1.ELeaveDuration.HALF_DAY;
            if (currentDayIsDateFromAndHalfDayOff ||
                currentDayIsDateToAndHalfDayOff) {
                workDay = 0.5;
            }
            switch (workDay) {
                case enums_1.EWorkDay.DAY_OFF:
                    dayLeaveInfo.daysOff.push(currentDateString);
                    break;
                case enums_1.EWorkDay.WORKING_DAY:
                    dayLeaveInfo.workingFullDay.push(currentDateString);
                    break;
                default:
                    dayLeaveInfo.workingHalfDay.push(currentDateString);
                    break;
            }
            totalDayLeaves += workDay;
        }
        return { totalDayLeaves, ...dayLeaveInfo };
    }
    async getTotalUnpaidDays(payload) {
        const { startDate, endDate, employeeIds, companyId, paidLeave } = payload;
        const leaveAlias = database_1.ETableName.LEAVE;
        const leaveTypeAlias = database_1.ETableName.LEAVE_TYPE;
        const employeeAlias = database_1.ETableName.EMPLOYEE;
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const payrollGroupWdAlias = database_1.ETableName.PAYROLL_GROUP_WD;
        const yearsToGetPrGrWd = new Set();
        yearsToGetPrGrWd.add(moment(startDate).year());
        yearsToGetPrGrWd.add(moment(endDate).year());
        const queryBuilder = this.employeeService.repository.createQueryBuilder(employeeAlias);
        queryBuilder.leftJoin(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `
        ${payrollGroupAlias}.isDeleted = :isDeleted
      `, { isDeleted: false });
        queryBuilder.leftJoin(`${payrollGroupAlias}.payrollGroupWorkDays`, payrollGroupWdAlias, `
        ${payrollGroupWdAlias}.isDeleted = :isDeleted
        AND ${payrollGroupWdAlias}.year IN (:...years)
      `, { isDeleted: false, years: Array.from(yearsToGetPrGrWd) });
        queryBuilder.leftJoin(`${employeeAlias}.leaves`, leaveAlias, `
        ${leaveAlias}.isDeleted = :isDeleted
        AND ${leaveAlias}.statusId = :statusId
        AND (
          (${leaveAlias}.dateFrom BETWEEN :startDate AND :endDate)
          OR (${leaveAlias}.dateTo BETWEEN :startDate AND :endDate)
          OR (
            ${leaveAlias}.dateFrom <= :startDate 
            AND ${leaveAlias}.dateTo >= :endDate
          )
        )
      `, {
            isDeleted: false,
            statusId: enums_1.ELeaveStatusId.APPROVED,
            startDate,
            endDate,
        });
        queryBuilder.innerJoin(`${leaveAlias}.leaveType`, leaveTypeAlias, ` 
        ${leaveTypeAlias}.paidLeave = :paidLeave
      `, { paidLeave: paidLeave ? paidLeave : false });
        queryBuilder
            .andWhere(`${employeeAlias}.isDeleted = :isDeleted`, { isDeleted: false })
            .andWhere(`${employeeAlias}.companyId = :companyId`, { companyId })
            .andWhere(`${employeeAlias}.id IN (:...employeeIds)`, {
            employeeIds,
        });
        queryBuilder.select([
            `${employeeAlias}.id`,
            `${leaveAlias}.id`,
            `${leaveAlias}.employeeId`,
            `${leaveAlias}.leaveTypeId`,
            `${leaveAlias}.dateFrom`,
            `${leaveAlias}.fromFdHd`,
            `${leaveAlias}.dateTo`,
            `${leaveAlias}.toFdHd`,
            `${leaveAlias}.effDayOfLeave`,
            `${leaveTypeAlias}.id`,
            `${leaveTypeAlias}.includePublicHoliday`,
            `${leaveTypeAlias}.includeNonWorkingDay`,
            ...(0, payroll_group_fieds_for_calculate_day_leaveutil_1.payrollGroupFieldsForCalculateDayLeave)(payrollGroupAlias),
            `${payrollGroupWdAlias}.id`,
            `${payrollGroupWdAlias}.year`,
        ]);
        queryBuilder.addSelect(this.getAllDayOfYearWdDateRangeSelectFields(payrollGroupWdAlias, startDate, endDate));
        const [employees, publicHolidays] = await Promise.all([
            queryBuilder.getMany(),
            this.publicHolidayService.getAllPublicHolidaysInDateRange({
                companyId,
                dateFromString: startDate,
                dateToString: endDate,
            }),
        ]);
        const employeeLeavesTable = {};
        for (const employee of employees) {
            const { id: employeeId, leaves } = employee;
            if (!leaves.length)
                continue;
            const leavesSortedByDate = leaves.sort(({ dateFrom: dateFromA }, { dateFrom: dateFromB }) => dateFromA.getTime() - dateFromB.getTime());
            const leaveRecords = await this.recalculateEffDayOfLeaveIfOutOfRange(companyId, startDate, endDate, {
                employee: employee,
                leaves: leavesSortedByDate,
                publicHolidays,
            });
            Object.assign(employeeLeavesTable, { [employeeId]: leaveRecords });
        }
        return employeeLeavesTable;
    }
    async recalculateEffDayOfLeaveIfOutOfRange(companyId, startDate, endDate, params) {
        const { employee, publicHolidays, leaves } = params;
        const payrollGroup = employee.payrollGroups;
        const startDateMoment = moment(startDate);
        const endDateMoment = moment(endDate);
        if (!leaves.length)
            return leaves;
        const fixLeaveOutOfRange = async (leave) => {
            const { dateFrom, dateTo, leaveType } = leave;
            const fakeLeaveRecord = { ...leave };
            const dateFromMoment = moment(dateFrom);
            const dateToMoment = moment(dateTo);
            if (dateFromMoment.isBefore(startDateMoment)) {
                fakeLeaveRecord.dateFrom = startDate;
            }
            if (dateToMoment.isAfter(endDateMoment)) {
                fakeLeaveRecord.dateTo = endDate;
            }
            const { totalDayLeaves, workingFullDay, workingHalfDay, daysOff } = await this.getTotalDayLeaves(companyId, fakeLeaveRecord, {
                employee,
                payrollGroup,
                publicHolidays,
                leaveType,
                isNotGetWorkDays: !payrollGroup?.payrollGroupWorkDays?.length,
            });
            Object.assign(fakeLeaveRecord, {
                effDayOfLeave: totalDayLeaves,
                workingFullDay,
                workingHalfDay,
                daysOff,
            });
            return fakeLeaveRecord;
        };
        const result = [];
        for (const leave of leaves) {
            const leaveFixed = await fixLeaveOutOfRange({
                ...leave,
                dateFrom: moment(leave.dateFrom).format(constants_1.DATE_STRING),
                dateTo: moment(leave.dateTo).format(constants_1.DATE_STRING),
            });
            const { dateFrom, dateTo, effDayOfLeave, workingFullDay, workingHalfDay, daysOff, id, } = leaveFixed;
            result.push({
                id,
                dateFrom,
                dateTo,
                effDayOfLeave,
                workingFullDay,
                workingHalfDay,
                daysOff,
            });
        }
        return result;
    }
    getAllDayOfYearWdDateRangeSelectFields(alias, startDate, endDate) {
        const dateFromMoment = moment(startDate);
        const dateToMoment = moment(endDate);
        const selectFields = new Set();
        for (let fromMoment = dateFromMoment.clone(); fromMoment.isSameOrBefore(dateToMoment); fromMoment.add(1, 'day')) {
            const currentDayOfYear = fromMoment.dayOfYear();
            selectFields.add(`${alias}.value_${currentDayOfYear}`);
            if (currentDayOfYear !== 366) {
                selectFields.add(`${alias}.value_${currentDayOfYear + 1}`);
            }
        }
        return Array.from(selectFields);
    }
};
exports.LeaveService = LeaveService;
exports.LeaveService = LeaveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.LeaveEntity)),
    __param(15, (0, config_1.InjectAppConfig)()),
    __param(16, (0, config_1.InjectDatabaseConfig)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        leave_helper_1.LeaveHelper,
        employee_service_1.EmployeeService,
        payroll_group_service_1.PayRollGroupService,
        payroll_group_wd_service_1.PayRollGroupWorkDayService,
        trx_approval_user_service_1.TrxApprovalUserService,
        public_holiday_service_1.PublicHolidayService,
        aws_1.AwsS3Service,
        leave_type_service_1.LeaveTypeService,
        sub_leave_type_service_1.SubLeaveTypeService,
        leave_type_balance_service_1.LeaveTypeBalanceService,
        leave_trx_service_1.LeaveTrxService,
        leave_type_assigment_service_1.LeaveTypeAssignmentService,
        producers_1.HrforteNotificationProducer,
        producers_1.LeaveTypePolicyProducer, Object, Object])
], LeaveService);
//# sourceMappingURL=leave.service.js.map
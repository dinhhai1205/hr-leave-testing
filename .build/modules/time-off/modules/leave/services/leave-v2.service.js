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
exports.LeaveV2Service = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const enums_1 = require("../../../../../common/enums");
const utils_1 = require("../../../../../common/utils");
const entities_1 = require("../../../../../core/database/entities");
const approval_user_service_1 = require("../../../../approval/modules/approval-user/approval-user.service");
const employee_service_1 = require("../../../../user/modules/employee/employee.service");
const leave_type_service_1 = require("../../leave-type/leave-type.service");
const leave_service_1 = require("./leave.service");
let LeaveV2Service = class LeaveV2Service {
    constructor(leaveRepository, leaveService, leaveTypeService, employeeService, approvalUserService) {
        this.leaveRepository = leaveRepository;
        this.leaveService = leaveService;
        this.leaveTypeService = leaveTypeService;
        this.employeeService = employeeService;
        this.approvalUserService = approvalUserService;
    }
    async createLeaveBySlackBot(companyId, userEmail, payload) {
        const { email, dateFrom, dateTo, fromFdHd, toFdHd, reason = '' } = payload;
        const currentDate = new Date(new Date().setMinutes(420));
        const employeeAlias = (0, utils_1.aliasEntity)(entities_1.EmployeeEntity);
        const payrollGroupAlias = (0, utils_1.aliasEntity)(entities_1.PayrollGroupEntity);
        const queryBuilder = this.employeeService.repository
            .createQueryBuilder(employeeAlias)
            .andWhere(`${employeeAlias}.isDeleted = :isDeleted`, { isDeleted: false })
            .andWhere(`${employeeAlias}.active = :active`, { active: true })
            .andWhere(`${employeeAlias}.isEssEnabled = :isEssEnabled`, {
            isEssEnabled: true,
        })
            .andWhere(`${employeeAlias}.email = :email`, { email: email })
            .leftJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.id = "${employeeAlias}"."payroll_group_id"
          AND ${payrollGroupAlias}.isDeleted = :isDeleted`, { isDeleted: false });
        const employee = await queryBuilder.getOne();
        if (!employee) {
            throw new common_1.NotFoundException(`Not found employee with email ${email}`);
        }
        if (!employee.payrollGroups) {
            throw new common_1.BadRequestException(`An error occurs when the employee ${email} is not assign to any payroll group`);
        }
        const approvalUserWhereCondition = {
            companyId,
            isDeleted: false,
            moduleId: enums_1.EMainModuleNumber.LEAVE,
            orgEleId: 0,
        };
        if (employee.organizationElementId) {
            approvalUserWhereCondition.orgEleId = (0, typeorm_2.Or)((0, typeorm_2.Equal)(0), (0, typeorm_2.Equal)(employee.organizationElementId));
        }
        const approvalUsers = await this.approvalUserService.repository.findOne({
            where: approvalUserWhereCondition,
            select: {
                id: true,
                allMustApprove: true,
                userEmail1: true,
                userEmail2: true,
                userEmail3: true,
            },
        });
        const annualLeaveTypeCode = 'AL';
        const leaveType = await this.leaveTypeService.repository.findOne({
            where: {
                companyId,
                code: annualLeaveTypeCode,
                isDeleted: false,
                active: true,
            },
            select: {
                createdBy: false,
                createdOn: false,
                updatedBy: false,
                updatedOn: false,
                active: false,
                activeForEss: false,
                code: false,
                color: false,
                companyId: false,
                isDeleted: false,
                isSpecial: false,
                name: false,
                remark: false,
            },
        });
        if (!leaveType) {
            throw new common_1.NotFoundException(`Not found Annual Leave (AL) type`);
        }
        const leaveBodyDto = {
            reason: reason || '',
            dateFrom: moment.utc(dateFrom).toDate(),
            dateTo: moment.utc(dateTo).toDate(),
            fromFdHd,
            toFdHd,
            employeeId: employee.id,
            leaveTypeId: leaveType.id,
        };
        const { efftiveDays } = await this.leaveService.checkValidateForCreateLeave({
            currentDate,
            companyId,
            leave: leaveBodyDto,
            leaveType,
            employee,
            payrollGroup: employee.payrollGroups,
        });
        const leaveRecord = await this.leaveRepository.save({
            ...leaveBodyDto,
            isDeleted: false,
            companyId,
            createdBy: userEmail,
            createdOn: new Date(),
            allMustApprove: approvalUsers?.allMustApprove || false,
            statusId: enums_1.ELeaveStatusId.AWAIT_APPROVAL,
            effDayOfLeave: efftiveDays,
        });
        if (approvalUsers) {
            const createTrxRecords = [];
            const { userEmail1, userEmail2, userEmail3 } = approvalUsers;
            const approvalUserEmails = [userEmail1, userEmail2, userEmail3];
            for (let i = 0; i < approvalUserEmails.length; i++) {
                if (!approvalUserEmails[i])
                    continue;
                createTrxRecords.push({
                    createdOn: currentDate,
                    createdBy: userEmail,
                    recordId: leaveRecord.id,
                    companyId: companyId,
                    moduleId: enums_1.EMainModuleNumber.LEAVE,
                    userEmail: approvalUserEmails[i],
                    approverLevel: enums_1.ELeaveStatusId.AWAIT_APPROVAL,
                });
            }
            try {
                await this.leaveService.trxApprovalUserService.repository.save(createTrxRecords);
            }
            catch (error) {
                await this.leaveRepository
                    .createQueryBuilder()
                    .update(entities_1.LeaveEntity)
                    .set({ isDeleted: true })
                    .where(`id = :id`, { id: leaveRecord.id })
                    .execute();
                throw error;
            }
        }
        return leaveRecord;
    }
};
exports.LeaveV2Service = LeaveV2Service;
exports.LeaveV2Service = LeaveV2Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.LeaveEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        leave_service_1.LeaveService,
        leave_type_service_1.LeaveTypeService,
        employee_service_1.EmployeeService,
        approval_user_service_1.ApprovalUserService])
], LeaveV2Service);
//# sourceMappingURL=leave-v2.service.js.map
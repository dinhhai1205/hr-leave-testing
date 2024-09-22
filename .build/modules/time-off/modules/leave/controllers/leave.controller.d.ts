import { PaginationResponseDto } from '../../../../../common/dto';
import { ELeaveApprovalActions } from '../../../../../common/enums';
import { IAuthInfo } from '../../../../../common/interfaces';
import { LeaveEntity, LeaveTrxEntity } from '../../../../../core/database/entities';
import { EmployeeService } from '../../../../user/modules/employee/employee.service';
import { LeaveTrxPaginationDto } from '../../leave-trx/dto/leave-trx-pagination.dto';
import { LeaveCreationDto } from '../dto/leave-creation.dto';
import { LeaveDeleteDto } from '../dto/leave-delete.dto';
import { LeaveGroupByLeaveTypeResponseDto } from '../dto/leave-group-by-leave-type-response.dto';
import { LeaveGroupByLeaveTypeDto } from '../dto/leave-group-by-leave-type.dto';
import { LeavePaginationDto } from '../dto/leave-pagination.dto';
import { LeaveUpdateRecordDto } from '../dto/leave-update-record';
import { leaveUpdateStatusResponseDto } from '../dto/leave-update-status-response.dto';
import { LeaveUpdateStatusDto } from '../dto/leave-update-status.dto';
import { LeaveService } from '../services/leave.service';
export declare class LeaveController {
    private readonly _service;
    private readonly employeeService;
    constructor(_service: LeaveService, employeeService: EmployeeService);
    healthCheck(): string;
    getLeaveDashboard(companyId: number, authInfo: IAuthInfo): Promise<{
        annualBalance: number;
        numPaidLeaveOnMonth: number;
        numUnPaidLeaveOnMonth: number;
        numAwaitApprovalPaidDays: number;
        numAwaitApprovalUnPaidDays: number;
    }>;
    getLeaveHistoriesByQuery(companyId: number, query: LeaveTrxPaginationDto, authInfo: IAuthInfo): Promise<PaginationResponseDto<LeaveTrxEntity>>;
    groupByLeaveRecordByLeaveType(companyId: number, query: LeaveGroupByLeaveTypeDto, authInfo: IAuthInfo): Promise<LeaveGroupByLeaveTypeResponseDto>;
    createLeaveRecord(companyId: number, body: LeaveCreationDto, authInfo: IAuthInfo): Promise<LeaveEntity>;
    getLeaveRecordsByQuery(companyId: number, query: LeavePaginationDto, authInfo: IAuthInfo): Promise<PaginationResponseDto<LeaveEntity>>;
    exportLeaveRecord(companyId: number, query: LeavePaginationDto, authInfo: IAuthInfo): Promise<PaginationResponseDto<LeaveEntity>>;
    getLeaveRecordDetail(companyId: number, leaveId: number, authInfo: IAuthInfo): Promise<LeaveEntity>;
    updateLeaveRecord(companyId: number, leaveId: number, body: LeaveUpdateRecordDto, authInfo: IAuthInfo): Promise<LeaveEntity>;
    updateLeaveRecordStatus(companyId: number, action: keyof typeof ELeaveApprovalActions, body: LeaveUpdateStatusDto, authInfo: IAuthInfo): Promise<leaveUpdateStatusResponseDto>;
    deleteLeaveRecords(companyId: number, body: LeaveDeleteDto, authInfo: IAuthInfo): Promise<boolean>;
    getWorkingDayOfAnEmployee(companyId: number, employeeId: number): Promise<import("../../../../../core/database/entities").EmployeeEntity[]>;
}

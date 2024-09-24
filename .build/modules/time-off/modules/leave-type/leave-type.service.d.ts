import { StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { PaginationResponseDto } from '../../../../common/dto';
import { EBoolean, EExcelFileType } from '../../../../common/enums';
import { IAuthInfo, IMulterFileUploaded } from '../../../../common/interfaces';
import { EmployeeEntity, LeaveTypeBalanceEntity, LeaveTypeEntity } from '../../../../core/database/entities';
import { LegacyBaseService } from '../../../../core/database/services';
import { CompanyService } from '../../../general/modules/company';
import { CompanyParameterService } from '../../../general/modules/company-parameter/company-parameter.service';
import { EmployeeService } from '../../../user/modules/employee/employee.service';
import { IEmpLtBalances } from '../../../user/modules/employee/interfaces/employee.interface';
import { LeaveTypeBalancePaginationDto } from '../leave-type-balance/dto/leave-type-balance-pagination.dto';
import { LeaveTypeBalanceService } from '../leave-type-balance/leave-type-balance.service';
import { LeaveTypeCreationDto } from './dto/leave-type-creation.dto';
import { LeaveTypePagination } from './dto/leave-type-pagination.dto';
import { LeaveTypeUpdateMultipleActiveStatusDto } from './dto/leave-type-update-multiple-active-status.dto';
import { LeaveTypeUpdatingDto } from './dto/leave-type-updating.dto';
import { LeaveTypeHelper } from './helpers/leave-type.helper';
import { SubLeaveTypeService } from './sub-leave-type/sub-leave-type.service';
export declare class LeaveTypeService extends LegacyBaseService<LeaveTypeEntity> {
    readonly leaveTypeRepository: Repository<LeaveTypeEntity>;
    readonly leaveTypeHelper: LeaveTypeHelper;
    readonly employeeService: EmployeeService;
    readonly companyService: CompanyService;
    readonly companyParameterService: CompanyParameterService;
    private readonly subLeaveTypeService;
    readonly leaveTypeBalanceService: LeaveTypeBalanceService;
    private SPECIAL_LEAVE_TYPE_CODES;
    constructor(leaveTypeRepository: Repository<LeaveTypeEntity>, leaveTypeHelper: LeaveTypeHelper, employeeService: EmployeeService, companyService: CompanyService, companyParameterService: CompanyParameterService, subLeaveTypeService: SubLeaveTypeService, leaveTypeBalanceService: LeaveTypeBalanceService);
    createLeaveType(companyId: number, payload: LeaveTypeCreationDto, authInfo: IAuthInfo): Promise<LeaveTypeEntity>;
    getLeaveTypesByQuery(companyId: number, query: LeaveTypePagination, authInfo: Pick<IAuthInfo, 'appMode'>): Promise<PaginationResponseDto<LeaveTypeEntity>>;
    getLeaveTypeDetail(id: number, authInfo: IAuthInfo, isParent: EBoolean): Promise<LeaveTypeEntity>;
    updateLeaveType(companyId: number, leaveTypeId: number, body: LeaveTypeUpdatingDto, authInfo: IAuthInfo): Promise<LeaveTypeEntity>;
    disableSubLeaveTypesWhenParentIsDisabled(leaveType: LeaveTypeEntity, userEmail: string, active?: boolean, activeForEss?: boolean): Promise<import("typeorm").UpdateResult[]>;
    updateMultipleActiveStatusLeaveType(input: LeaveTypeUpdateMultipleActiveStatusDto | undefined, authInfo: IAuthInfo): Promise<void>;
    deleteLeaveType(companyId: number, ids: number[] | undefined, authInfo: IAuthInfo): Promise<boolean>;
    generateLeaveBalanceIfNeeded(payload: {
        authInfo: IAuthInfo;
        companyId: number;
        query: LeaveTypeBalancePaginationDto;
    }, listEmployeeIds?: number[]): Promise<({
        leaveTypeId: number;
        companyId: number;
        employeeId: number;
        isDeleted: boolean;
        balance: number;
        createdBy: string;
        createdOn: string;
    } & LeaveTypeBalanceEntity)[][]>;
    getLeaveBalancesForWeb(payload: {
        authInfo: IAuthInfo;
        companyId: number;
        query: LeaveTypeBalancePaginationDto;
    }): Promise<PaginationResponseDto<EmployeeEntity>>;
    getLeaveTypeBalancesByQuery(payload: {
        authInfo: IAuthInfo;
        companyId: number;
        query: LeaveTypeBalancePaginationDto;
    }): Promise<PaginationResponseDto<LeaveTypeBalanceEntity>>;
    checkLeaveTypeCodeExist(filter: {
        companyId?: number;
        code?: string;
    }): Promise<{
        exist: boolean;
        leaveTypeId: number;
    }>;
    getAndGenerateMissingLeaveTypeBalance(companyId: number, authInfo: IAuthInfo): Promise<LeaveTypeBalanceEntity[]>;
    exportLeaveTypeBalance(response: Response, payload: {
        authInfo: IAuthInfo;
        companyId: number;
        query: LeaveTypeBalancePaginationDto;
        excelFileType: EExcelFileType;
    }): Promise<void | StreamableFile>;
    processXlsxExport(payload: {
        response: Response;
        listLeaveType: Pick<LeaveTypeEntity, 'id' | 'name'>[];
        employees: IEmpLtBalances[];
        companyName: string;
    }): Promise<void>;
    processCsvExport(payload: {
        response: Response;
        listLeaveType: Pick<LeaveTypeEntity, 'id' | 'name'>[];
        employees: IEmpLtBalances[];
        companyName: string;
    }): StreamableFile;
    importLeaveTypeBalanceFromExcel(payload: {
        companyId: number;
        file: IMulterFileUploaded;
        authInfo: IAuthInfo;
        excelFileType: EExcelFileType;
    }): Promise<void>;
    dashboardLeaveType(companyId: number, authMail: IAuthInfo): Promise<{
        name: string;
        code: string;
        color: string;
        id: number;
        creditedThisYear: number;
        carriedForwardFromLastYear: number;
        maxEntitlement: number;
        balance: number;
    }[]>;
}

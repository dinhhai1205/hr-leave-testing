import { Response } from 'express';
import { EExcelFileType } from '../../../../common/enums';
import { IAuthInfo, IMulterFileUploaded } from '../../../../common/interfaces';
import { LeaveTypeService } from '../leave-type/leave-type.service';
import { LeaveTypeBalancePaginationDto } from './dto/leave-type-balance-pagination.dto';
import { LeaveTypeBalanceUpdateDto } from './dto/leave-type-balance-update.dto';
import { LeaveTypeBalanceService } from './leave-type-balance.service';
export declare class LeaveTypeBalanceController {
    private readonly leaveTypeBalanceService;
    private readonly leaveTypeService;
    constructor(leaveTypeBalanceService: LeaveTypeBalanceService, leaveTypeService: LeaveTypeService);
    manualUpdateLeaveTypeBalance(companyId: number, body: LeaveTypeBalanceUpdateDto[], authInfo: IAuthInfo): Promise<void>;
    getLeaveTypeBalanceByLeaveType(companyId: number, authInfo: IAuthInfo): Promise<import("../../../../core/database").LeaveTypeBalanceEntity[]>;
    exportLeaveTypeBalanceToExcel(response: Response, companyId: number, fileType: EExcelFileType | undefined, authInfo: IAuthInfo, query: LeaveTypeBalancePaginationDto): Promise<void | import("@nestjs/common").StreamableFile>;
    importLeaveTypeBalanceFromExcel(companyId: number, fileType: EExcelFileType | undefined, file: IMulterFileUploaded, authInfo: IAuthInfo): Promise<void>;
}

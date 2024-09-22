import { Workbook } from 'exceljs';
import { IMulterFileUploaded } from '../../../common/interfaces';
import { EmployeeService } from '../../../../user/modules/employee/employee.service';
import { TimeSheetAdjustmentService } from './timesheet-adjustment.service';
import { TimeSheetAdjustmentEntity } from '../../../../../core/database';
import { PayElementMappingService } from '../../pay-element-mapping/pay-element-mapping.service';
import { CreateTimeSheetAdjustmentDto, QueryWithPaginationDto } from '../dtos';
import { Repository } from 'typeorm';
export declare class ImportExportTimeSheetAdjustmentExcelFileService {
    private readonly timeSheetAdjustmentRepository;
    private timeSheetAdjustmentService;
    private employeeService;
    private payElementMappingService;
    constructor(timeSheetAdjustmentRepository: Repository<TimeSheetAdjustmentEntity>, timeSheetAdjustmentService: TimeSheetAdjustmentService, employeeService: EmployeeService, payElementMappingService: PayElementMappingService);
    handleCreateRawFile(payrollHeaderId?: number): {
        workbook: Workbook;
        worksheet: import("exceljs").Worksheet;
        fileName: string;
    };
    handleGenerateExampleFile(companyId: number, payrollHeaderId: number, query: QueryWithPaginationDto): Promise<{
        buffer: import("exceljs").Buffer;
        fileName: string;
    }>;
    handleValidateHeader(actualHeaders: string[]): Promise<void>;
    handleValidateAndFormatData(companyId: number, payrollHeaderId: number, data: {
        [key: string]: any;
    }[]): Promise<CreateTimeSheetAdjustmentDto[]>;
    handleImportTimeSheetAdjustmentFile(companyId: number, payrollHeaderId: number, file: IMulterFileUploaded, userEmail: string): Promise<import("../dtos").TimeSheetAdjustmentDto[]>;
    handleExportTimeSheetAdjustmentFile(companyId: number, query: QueryWithPaginationDto, payrollHeaderId: number): Promise<{
        buffer: import("exceljs").Buffer;
        fileName: string;
    }>;
}

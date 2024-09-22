import * as ExcelJS from 'exceljs';
import { Readable } from 'stream';
import { IMulterFileUploaded } from '../../../../../common/interfaces';
import { LeaveTypeEntity } from '../../../../../core/database/entities/leave-type.entity';
import { IEmpLtBalances } from '../../../../user/modules/employee/interfaces/employee.interface';
export declare class LeaveTypeHelper {
    readCsvFile(file: IMulterFileUploaded): Promise<{
        listLeaveTypeName: string[];
        listEmployeeRef: string[];
        hashTable: Record<string, number>;
        totalNumberLtbCanBeHave: number;
    }>;
    readExcelFile(file: IMulterFileUploaded): Promise<{
        listLeaveTypeName: string[];
        listEmployeeRef: string[];
        hashTable: Record<string, number>;
        totalNumberLtbCanBeHave: number;
    }>;
    buildHeaderRowLeaveTypeBalance(leaveTypes: Pick<LeaveTypeEntity, 'id' | 'name'>[]): {
        leaveTypeColumnIndex: {
            [leaveTypeId: string]: number;
        };
        headerRow: string[];
    };
    pushRowDataLeaveTypeBalance(args: {
        employees: IEmpLtBalances[];
        leaveTypeColumnIndex: {
            [leaveTypeId: string]: number;
        };
        provider: ExcelJS.Worksheet | Readable;
    }): void;
}

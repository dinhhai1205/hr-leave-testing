import { BaseAppEntity } from './base-app.entity';
import { EmployeeEntity } from './employee.entity';
import { TimeSheetAdjustmentEntity } from './timesheet-adjustment.entity';
import { PrtrxHdrEntity } from './prtrx-hdr.entity';
export declare class PayrollTimeSheetEntity extends BaseAppEntity {
    companyId: number;
    employeeId: number;
    totalScheduledWorkDays: number;
    totalScheduledWorkHours: number;
    totalPayrollRegularWorkDays: number;
    prtrxHdrId: number;
    employee: EmployeeEntity;
    timeSheetAdjustments: TimeSheetAdjustmentEntity[];
    prtrxHdr: PrtrxHdrEntity;
}

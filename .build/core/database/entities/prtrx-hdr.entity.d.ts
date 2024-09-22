import { EPayrollHeaderStatus } from '../../../common/enums';
import { AbstractEntity } from './abstract.entity';
import { CompanyEntity } from './company.entity';
import { CyclePeriodDetailEntity } from './cycle-period-detail.entity';
import { PayrollTimeSheetEntity } from './payroll-timesheet.entity';
import { PrtrxEmpEntity } from './prtrx-emp.entity';
import { CycleFrequencyEntity } from './cycle-frequency.entity';
export declare class PrtrxHdrEntity extends AbstractEntity {
    id: number;
    companyId: number;
    statusId: EPayrollHeaderStatus;
    specialRun: boolean;
    payrollFrequencyId: number;
    payrollPeriodId: number;
    cntInMonth: number;
    dateFrom: Date;
    dateTo: Date;
    isDeleted: boolean;
    syncTimeTracker: boolean;
    cyclePeriodDetail: CyclePeriodDetailEntity;
    company: CompanyEntity;
    prtrxEmps: PrtrxEmpEntity[];
    payrollTimeSheets: PayrollTimeSheetEntity[];
    period: CyclePeriodDetailEntity;
    frequency: CycleFrequencyEntity;
}

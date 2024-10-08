import { EWorkDay } from '../../../common/enums';
import { EPayrollGroupType } from '../../../modules/payroll/modules/payroll-group/enums/payroll-group-type.enum';
import { AbstractEntity } from './abstract.entity';
import { PayrollGroupWorkDayEntity } from './payroll-group-wd.entity';
export declare class PayrollGroupEntity extends AbstractEntity {
    id: number;
    companyId: number;
    code: string;
    name: string;
    pgType: EPayrollGroupType;
    useStdWorkDay: boolean;
    stdWorkDay: number;
    otUseStdWorkDay: boolean;
    otStdWorkDay: number;
    mon: EWorkDay;
    tue: EWorkDay;
    wed: EWorkDay;
    thu: EWorkDay;
    fri: EWorkDay;
    sat: EWorkDay;
    sun: EWorkDay;
    minWorkDaySmui: number;
    createdBy: string;
    updatedBy: string;
    stdDayByYear: boolean;
    otStdDayByYear: boolean;
    useCalendarDay: boolean;
    otUseCalendarDay: boolean;
    otRoundTo: number;
    hourPerDay: number;
    incPerHourForex: boolean;
    payrollGroupWorkDays: PayrollGroupWorkDayEntity[];
}

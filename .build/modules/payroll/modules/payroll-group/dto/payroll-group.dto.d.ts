import { AbstractDto } from '../../../../../common/dto/abstract.dto';
export declare class PayrollGroupDto extends AbstractDto {
    id: number;
    companyId: number;
    code: number;
    name: string;
    createdBy: string;
    updatedBy: string;
    pgType: number;
    useStdWorkDay: boolean;
    stdWorkDay: string;
    otUseStdWorkDay: boolean;
    otStdWorkDay: string;
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    sun: string;
    minWorkDaySmui: number;
    stdDayByYear: boolean;
    otStdDayByYear: boolean;
    useCalendarDay: boolean;
    otUseCalendarDay: boolean;
    otRoundTo: number;
    incPerHourForex: boolean;
}

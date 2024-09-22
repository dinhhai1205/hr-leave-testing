import type { CreateTimeEntryBodyDto } from '../../modules/time-entry';
import { StatusTimeEntry, TimeEntryType, UnitTime } from '../enums';
export declare const createTimeEntriesField: (createTimeEntryBodyDto: CreateTimeEntryBodyDto, localDate: string, timeEntry: Date, isManual: boolean, workScheduleId: string, belongsToDate: string, companyId: string) => {
    description: string | undefined;
    endBreakTime: Date | undefined;
    timeEntryType: TimeEntryType.OUT;
    unitTime: UnitTime;
    utcOffset: number;
    locationWorkSchedule: {
        id: string | undefined;
    };
    employee: {
        id: number;
    };
    workSchedule: {
        id: string;
    };
    company: {
        id: string;
    };
    breakRule: {
        id: string | undefined;
    };
    localDate: string;
    timeEntry: Date;
    status: StatusTimeEntry;
    isManual: boolean;
    belongsToDate: string;
    activity?: undefined;
    project?: undefined;
} | {
    description: string | undefined;
    endBreakTime: Date | undefined;
    timeEntryType: TimeEntryType.IN | TimeEntryType.BREAK;
    unitTime: UnitTime;
    utcOffset: number;
    locationWorkSchedule: {
        id: string | undefined;
    };
    activity: {
        id: string | undefined;
    };
    employee: {
        id: number;
    };
    project: {
        id: string | undefined;
    };
    workSchedule: {
        id: string;
    };
    company: {
        id: string;
    };
    breakRule: {
        id: string | undefined;
    };
    localDate: string;
    timeEntry: Date;
    status: StatusTimeEntry;
    isManual: boolean;
    belongsToDate: string;
};

import type { TimeEntryEntity, TimeEntryResponseDTO } from '../../modules/time-entry';
export declare const formatDifferenceMinute: (differenceInMinute: number) => string;
export declare const getAllDayInWeekFormDate: (date: string) => string[];
export declare const getAllDayInMonthFromDate: (date: string) => string[];
export declare const getHoursAndMinutesFormat: (date: string, offset: number) => string;
export declare const convertDayToWeekDay: (dateString: string) => import("..").DayType;
export declare const convertDateTimeString: (dateString: string, timeString: string) => string;
export declare const nextDayFromISOString: (isoDateTimeString: string) => string;
export declare const mappedResultTimeEntry: (timeEntry: TimeEntryEntity) => TimeEntryResponseDTO;
export declare const getDaysBetweenDates: (startDate: string, endDate: string) => string[];
export declare const formatDate: (date: Date) => string;
export declare const getCurrentWeek: () => string[];
export declare const addHourToIsoString: (isoString: string, utcOffSet: number) => string;
export declare const paginateArray: <T>(array: T[], page: number, pageSize: number) => T[];

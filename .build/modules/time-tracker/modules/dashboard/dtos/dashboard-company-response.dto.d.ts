export declare class TrackedHour {
    trackedHour: number;
    sumBreakTimeById: object;
    workedHour: number;
    breakHour: number;
    unitTime: string;
}
export declare class DashboardCompanyResponseDto {
    day: string;
    trackedHour: TrackedHour;
}

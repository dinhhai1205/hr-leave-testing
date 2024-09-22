export declare class DayToProrateDto {
    overtimeDetailId?: number;
    date: string;
    employeeId: number;
}
export declare class DayToProratePayloadDto {
    data: DayToProrateDto[];
}
export declare class DayToProrateResponseDto {
    dayToProrate: number;
    employeeId: number;
}
export declare class DayToProrateResponse {
    data: DayToProrateResponseDto[];
}

export declare class LeaveEntryDto {
    day: string;
    unPaidDay: number;
    leaveId?: number;
}
export declare class CreateAdjustmentFromTTDto {
    [employeeId: string]: LeaveEntryDto[];
}

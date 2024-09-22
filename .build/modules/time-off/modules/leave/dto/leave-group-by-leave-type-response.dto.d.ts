export declare class LeaveGroupByLeaveTypeResponseDto {
    records: {
        [key: string]: {
            leaveTypeId: number;
            count: number;
            color: string;
            name: string;
            code: string;
        }[];
    };
}

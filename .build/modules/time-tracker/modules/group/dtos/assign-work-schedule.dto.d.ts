export declare class AssignWorkScheduleToGroupsDto {
    orgIds: number[];
}
declare class GroupWorkSchedulePairDto {
    orgId: number;
    workScheduleId: number;
}
export declare class UnassignWorkScheduleToGroupsDto {
    groupWorkSchedules: GroupWorkSchedulePairDto[];
}
export {};

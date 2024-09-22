export declare class CreateGroupDto {
    name: string;
    description: string;
    active: boolean;
    parentId?: string;
    managerIds: string[];
    memberIds: string[];
    workScheduleId?: string;
}

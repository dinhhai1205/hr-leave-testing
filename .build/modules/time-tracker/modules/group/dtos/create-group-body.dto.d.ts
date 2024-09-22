export declare class CreateGroupBodyDto {
    name: string;
    description: string;
    active: boolean;
    parentId?: string;
    managerIds: string[];
    memberIds: string[];
}

export interface IWorkScheduleAssignee {
    [employeeId: string]: {
        email: string;
        employeeRef: string;
        employeeNo: string;
        fullNameLocal: string;
        fullNameEn: string;
    };
}

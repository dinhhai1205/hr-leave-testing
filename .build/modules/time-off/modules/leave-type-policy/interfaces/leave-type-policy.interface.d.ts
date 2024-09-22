export interface IFilterLeaveTypePolicy {
    id?: number;
    companyId?: number;
    ltId?: number;
}
export interface ICreditLeaveTypePolicy {
    companyId?: number;
    leaveTypeId?: number;
    leaveTypePolicyId?: number;
    employeeIds?: number[];
    payrollGroupIds?: number[];
    authMail?: string;
    utcOffset?: number;
    customCurrentDate?: Date;
    date?: string;
}

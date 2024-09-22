export interface ITimesheetAdjustmentFile {
    fullNameLocal: string;
    fullNameEnglish: string;
    employeeRef: string;
    orgElements: string;
    costCenter: string;
    payrollGroup: string;
    adjustmentType: string;
    payElementMapping: string;
    date: string;
    hours: number;
}

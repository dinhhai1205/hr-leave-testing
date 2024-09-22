export declare class AssignWorkScheduleEmployeesDto {
    employeeIds: number[];
}
declare class EmployeeWorkSchedulePairDto {
    employeeId: number;
    workScheduleId: number;
}
export declare class UnassignWorkScheduleEmployeesDto {
    employeeWorkSchedules: EmployeeWorkSchedulePairDto[];
}
export {};

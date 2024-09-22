import { EmployeeService } from './employee.service';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    test(): Promise<import("./interfaces/get-all-employee-policy-credit.interface").IGetAllEmployeePolicyCredit[]>;
}

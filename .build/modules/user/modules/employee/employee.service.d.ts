import * as moment from 'moment';
import { FindManyOptions, FindOneOptions, FindOptionsSelect, FindOptionsWhere, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationResponseDto } from '../../../../common/dto';
import { EEmployeeContractType } from '../../../../common/enums';
import { IAuthInfo } from '../../../../common/interfaces';
import { EmployeeEntity } from '../../../../core/database/entities/employee.entity';
import { PayrollGroupEntity } from '../../../../core/database/entities/payroll-group.entity';
import { LegacyBaseService } from '../../../../core/database/services';
import { LeaveTypeBalancePaginationDto } from '../../../time-off/modules/leave-type-balance/dto/leave-type-balance-pagination.dto';
import { PaginationEmployeeQueryDto } from '../../../time-tracker/modules/employee/dtos/pagination-employee-query.dto';
import { IEmpLtBalances, IFilterEmployee } from './interfaces/employee.interface';
import { IGetAllEmployeePolicyCredit } from './interfaces/get-all-employee-policy-credit.interface';
export declare class EmployeeService extends LegacyBaseService<EmployeeEntity> {
    readonly employeeRepository: Repository<EmployeeEntity>;
    private availableEmployeeCondition;
    constructor(employeeRepository: Repository<EmployeeEntity>);
    getEmployeeByIds: (employeeIds: number[], options?: FindManyOptions<EmployeeEntity>) => Promise<EmployeeEntity[]>;
    getAllEmployee(companyId: number, options?: FindManyOptions<EmployeeEntity>): Promise<EmployeeEntity[]>;
    getEmployeeByIdsWithoutRelations: (employeeIds: number[]) => Promise<EmployeeEntity[]>;
    getAllEmployeeForPolicyCredit(filterEmployee?: IFilterEmployee, { batchSize, skip }?: {
        batchSize?: number;
        skip?: number;
    } | undefined, leaveTypeId?: number): Promise<IGetAllEmployeePolicyCredit[]>;
    getAllEmployeesQueryBuilder(filterEmployee?: IFilterEmployee): SelectQueryBuilder<EmployeeEntity>;
    private filterEmployee;
    getAllEmployees(filterEmployee?: IFilterEmployee, { batchSize, skip }?: {
        batchSize?: number;
        skip?: number;
    } | undefined): Promise<EmployeeEntity[]>;
    getWorkingDayOfAnEmployee(filter?: {
        companyId?: number;
        employeeId?: number;
    }): Promise<EmployeeEntity[]>;
    getRawEmpLtBalances(payload: {
        companyId: number;
        authInfo: IAuthInfo;
        query: LeaveTypeBalancePaginationDto;
    }): Promise<IEmpLtBalances[]>;
    getEmployeeWithApprovalUsers(companyId: number, employeeId: number): Promise<EmployeeEntity | null>;
    startWithOrgPathCondition(alias: string, organizationPaths?: string[]): string;
    getTotalEmployees(companyIds: number[], filter?: FindOptionsWhere<Omit<EmployeeEntity, 'companyId'>>): Promise<number>;
    getTotalJoinerEmployees(input: {
        companyIds: number[];
        currentDate: moment.Moment;
    }): Promise<number>;
    getTotalLeaverEmployees(input: {
        companyIds: number[];
        currentDate: moment.Moment;
    }): Promise<number>;
    getEmployeeAuth(args: {
        companyId: number;
        email: string;
    }): Promise<EmployeeEntity | null>;
    getEmployeeIdsHaveContract(companyIds: number[], contractTypes: EEmployeeContractType[]): Promise<number[]>;
    getTotalEmployeeByContract(companyIds: number[], contractTypes?: EEmployeeContractType[]): Promise<{
        [contractType: string]: string;
    }>;
    getEssData(filter: {
        userEmail: string;
        companyId: number;
    }, select?: FindOptionsSelect<EmployeeEntity>): Promise<EmployeeEntity | null>;
    getManyEssData(filter: {
        ids: number[];
        companyId: number;
    }, select?: FindOptionsSelect<EmployeeEntity>): Promise<EmployeeEntity[]>;
    getAllEmployeesByCompanyIdWithElementIds(filter: {
        companyId: number;
        organizationElementIds: number[];
    }, select?: FindOptionsSelect<EmployeeEntity>): Promise<EmployeeEntity[]>;
    getAllEmployeesByCompanyId(filter: {
        companyId: number;
    }, select?: FindOptionsSelect<EmployeeEntity>): Promise<EmployeeEntity[]>;
    getAllEmployeesWithWorkSchedule({ companyId, paginationQueryDto, }: {
        companyId: number;
        paginationQueryDto: PaginationEmployeeQueryDto;
    }): Promise<PaginationResponseDto<EmployeeEntity>>;
    getAllEmployeesWithWorkScheduleDefault(companyId: number): Promise<EmployeeEntity[]>;
    findEmployeesExistWithEmails(companyId: number, email: string[]): Promise<string[]>;
    getEmployeeById(companyId: number, employeeId: number, options?: FindOneOptions<EmployeeEntity>): Promise<EmployeeEntity | null>;
    getEmployeeByEmployeeRef(companyId: number, employeeRefs: string[]): Promise<EmployeeEntity[]>;
    getPayrollTimesheetOfEmployeeByPrtrxHdr(employeeId: number, hdrId: number, companyId: number): Promise<import("../../../../core/database/entities/payroll-timesheet.entity").PayrollTimeSheetEntity | undefined>;
    getPayrollGroupByEmployeeId(employeeId: number, companyId: number): Promise<PayrollGroupEntity>;
    getPayrollGroupsByEmployeeIds(employeeIds: number[], companyId: number): Promise<PayrollGroupEntity[]>;
    getEmployeeByPayrollTimesheetId(payrollId: number, companyId: number): Promise<EmployeeEntity | null>;
    getAllEmployeeByCompanyId(companyId: number): Promise<EmployeeEntity[]>;
}

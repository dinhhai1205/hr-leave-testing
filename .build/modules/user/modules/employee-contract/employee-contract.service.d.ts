import { FindOptionsWhere, Repository } from 'typeorm';
import { EmployeeContractEntity } from '../../../../core/database/entities/employee-contract.entity';
export declare class EmployeeContractService {
    private readonly employeeContractRepository;
    constructor(employeeContractRepository: Repository<EmployeeContractEntity>);
    getTotalProbationEmployeeContract(companyId: number, filter: FindOptionsWhere<EmployeeContractEntity>): Promise<number>;
}

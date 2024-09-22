import { Repository } from 'typeorm';
import { EmployeeMappingEntity } from '../../../../core/database/entities/employee-mapping.entity';
import { TypeOrmBaseService } from '../../../../core/database/services';
import { CreateEmployeeMappingDto } from './dtos/create-employee-mapping.dto';
export declare class EmployeeMappingService extends TypeOrmBaseService<EmployeeMappingEntity> {
    private readonly employeeMappingRepository;
    constructor(employeeMappingRepository: Repository<EmployeeMappingEntity>);
    createManyEmployeeMappings(employeeMappings: CreateEmployeeMappingDto[]): Promise<EmployeeMappingEntity[]>;
    getManyEmployeeMappingByTTIds({ ttEmployeeIds, companyId, }: {
        ttEmployeeIds: string[];
        companyId: number;
    }): Promise<EmployeeMappingEntity[]>;
    getManyEmployeeMapping({ companyId, userEmails, }: {
        companyId: number;
        userEmails: string[];
    }): Promise<EmployeeMappingEntity[]>;
    getManyEmployeeMappingByIds({ companyId, employeeIds, }: {
        companyId: number;
        employeeIds: number[];
    }): Promise<EmployeeMappingEntity[]>;
    deleteManyEmployeeMapping({ companyId, timeTrackerIds, }: {
        companyId: number;
        timeTrackerIds: string[];
    }): Promise<never[] | import("typeorm").UpdateResult>;
    getEmployeeMappingByEmail(userEmail: string, companyId: number): Promise<EmployeeMappingEntity | null>;
    deleteLinkedTtData(companyId: number): Promise<void>;
}

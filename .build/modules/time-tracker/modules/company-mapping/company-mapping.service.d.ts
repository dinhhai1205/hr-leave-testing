import { Repository } from 'typeorm';
import { CompanyMappingEntity } from '../../../../core/database/entities/company-mapping.entity';
import { TypeOrmBaseService } from '../../../../core/database/services';
import { CreateCompanyMappingDto } from './dtos/create-company-mapping.dto';
export declare class CompanyMappingService extends TypeOrmBaseService<CompanyMappingEntity> {
    private readonly companyMappingRepository;
    constructor(companyMappingRepository: Repository<CompanyMappingEntity>);
    getTimeTrackerCompanyByHrfCompanyId(hrfCompanyId: number): Promise<CompanyMappingEntity | null>;
    createManyCompanyMappings(companyMappings: CreateCompanyMappingDto[]): Promise<CompanyMappingEntity[]>;
    findCompanyMapping(companyId: number): Promise<CompanyMappingEntity | null>;
    deleteLinkedTtData(companyId: number): Promise<void>;
}

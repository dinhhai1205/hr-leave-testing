import { Repository } from 'typeorm';
import { CompanyParameterEntity } from '../../../../core/database/entities/company-parameter.entity';
import { LegacyBaseService } from '../../../../core/database/services';
export declare class CompanyParameterService extends LegacyBaseService<CompanyParameterEntity> {
    private readonly companyParameterRepo;
    constructor(companyParameterRepo: Repository<CompanyParameterEntity>);
    isEncryptedFile(companyId: number): Promise<boolean>;
    getAllBaseCountryIds(clientIds: number[]): Promise<{
        baseCountryId: string;
    }[]>;
    getLocalCurrencyOfCompany(companyId: number): Promise<any>;
}

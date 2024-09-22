import { Repository } from 'typeorm';
import { CompanyEntity } from '../../../../core/database/entities';
import { LegacyBaseService } from '../../../../core/database/services';
export declare class CompanyService extends LegacyBaseService<CompanyEntity> {
    readonly companyRepository: Repository<CompanyEntity>;
    constructor(companyRepository: Repository<CompanyEntity>);
    getCompany(companyId: number): Promise<CompanyEntity | null>;
    getAllClientIds(code: string): Promise<number[]>;
    getAllClients(code: string, countryCodes?: string[]): Promise<CompanyEntity[]>;
    getAllClientWithPayroll(code: string): Promise<{
        companyId: string;
        payrollHeaderId: string;
    }[]>;
}

import { Repository } from 'typeorm';
import { OctoCompanyEntity } from '../../../../core/database/entities/octo-company.entity';
export declare class OctoCompanyService {
    private readonly octoCompanyRepository;
    constructor(octoCompanyRepository: Repository<OctoCompanyEntity>);
    getOctoCompanyCode(companyId: number): Promise<string>;
}

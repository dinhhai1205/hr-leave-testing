import { Repository } from 'typeorm';
import { CountryEntity } from '../../../../core/database/entities/country.entity';
import { LegacyBaseService } from '../../../../core/database/services';
import { CompanyParameterService } from '../company-parameter/company-parameter.service';
export declare class CountryService extends LegacyBaseService<CountryEntity> {
    private readonly countryRepo;
    private readonly companyParameterService;
    constructor(countryRepo: Repository<CountryEntity>, companyParameterService: CompanyParameterService);
    getCountry(id: number): Promise<any>;
    getAllCountries(clientIds: number[], codes?: string[]): Promise<{
        countryCode: string;
        countryName: string;
        currencyCode: string;
    }[]>;
    getTotalCountries(clientIds: number[]): Promise<number>;
}

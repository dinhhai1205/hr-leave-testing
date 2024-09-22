import { AbstractEntity } from './abstract.entity';
import { CompanyEntity } from './company.entity';
import { CountryEntity } from './country.entity';
export declare class CompanyParameterEntity extends AbstractEntity {
    id: number;
    companyId: number;
    clientEncryptFile: boolean;
    baseCountryId: number;
    country: CountryEntity;
    company: CompanyEntity;
}

import { Repository } from 'typeorm';
import { UsdForexEntity } from '../../../../core/database/entities/usd-forex.entity';
import { LegacyBaseService } from '../../../../core/database/services';
export declare class UsdForexService extends LegacyBaseService<UsdForexEntity> {
    private readonly usdForexRepository;
    constructor(usdForexRepository: Repository<UsdForexEntity>);
    getExchangeRate(currencyCode: string): Promise<number>;
    getExchangeRates(currencyCodes: string[]): Promise<UsdForexEntity[]>;
}

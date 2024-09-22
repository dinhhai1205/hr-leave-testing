import { UsdForexService } from './usd-forex.service';
export declare class UsdForexController {
    private readonly usdForexService;
    constructor(usdForexService: UsdForexService);
    getExchangeRate(currencyCode: string): Promise<number>;
}

import { AppConfig } from '../../../config';
export declare class ApiKeyService {
    private readonly appConfig;
    constructor(appConfig: AppConfig);
    validate(apiKey: string): boolean;
}

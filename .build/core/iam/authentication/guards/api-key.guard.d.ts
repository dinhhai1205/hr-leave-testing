import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ApiKeyService } from '../api-key.service';
export declare class ApiKeyGuard implements CanActivate {
    private readonly apiKeyService;
    constructor(apiKeyService: ApiKeyService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractKeyFromHeader;
}

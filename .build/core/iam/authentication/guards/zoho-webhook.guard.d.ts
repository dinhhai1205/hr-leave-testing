import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ZohoConfig } from '../../../../config';
export declare class ZohoWebHookGuard implements CanActivate {
    private readonly zohoConfig;
    constructor(zohoConfig: Pick<ZohoConfig, 'webhookSecretKey'>);
    canActivate(context: ExecutionContext): boolean;
}

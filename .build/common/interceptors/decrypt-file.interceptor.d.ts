import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { EncryptionService } from '../../core/encryption/services';
export declare class DecryptFileInterceptor implements NestInterceptor {
    private readonly encryptionService;
    constructor(encryptionService: EncryptionService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<import("rxjs").Observable<any>>;
}

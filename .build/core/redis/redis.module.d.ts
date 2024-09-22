import { DynamicModule } from '@nestjs/common';
export declare class RedisModule {
    static forRoot(options?: Partial<{
        isGlobal: boolean;
    }>): DynamicModule;
}

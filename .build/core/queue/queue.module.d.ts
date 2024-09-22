import { DynamicModule } from '@nestjs/common';
import { QUEUE } from './constants';
interface IQueueModuleOptions {
    queues: (keyof typeof QUEUE)[];
    flows?: string[];
    isGlobal?: boolean;
}
declare const ConfigurableModuleClass: import("@nestjs/common").ConfigurableModuleCls<IQueueModuleOptions, "register", "create", {}>, OPTIONS_TYPE: IQueueModuleOptions & Partial<{}>;
export declare class QueueModule extends ConfigurableModuleClass {
    static forRoot(options?: Partial<{
        isGlobal: boolean;
    }>): DynamicModule;
    static register(options: typeof OPTIONS_TYPE): DynamicModule;
}
export {};

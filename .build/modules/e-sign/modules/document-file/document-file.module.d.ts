import { DynamicModule } from '@nestjs/common';
import { IDocumentFileModuleOptions } from './interfaces/document-file-module-options.interface';
export declare class DocumentFileModule {
    static forFeature(options?: Partial<IDocumentFileModuleOptions>): DynamicModule;
}

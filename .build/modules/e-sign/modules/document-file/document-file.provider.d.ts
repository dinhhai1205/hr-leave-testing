import type { Provider } from '@nestjs/common';
import type { IDocumentFileModuleOptions } from './interfaces/document-file-module-options.interface';
export declare function createDocumentFileProvider(options: Partial<IDocumentFileModuleOptions>): Provider[];

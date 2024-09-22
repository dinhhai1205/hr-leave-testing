import type { EApiModuleMode } from '../../../common/enums';
import type { ValueOf } from '../../../common/types/value-of.type';
export declare const ActiveAdmin: <T extends ValueOf<typeof EApiModuleMode>>(...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | T | "organizationPaths" | undefined)[]) => ParameterDecorator;

import type { IActiveUserData } from '../interfaces';
export declare const ActiveUser: (...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | keyof IActiveUserData | undefined)[]) => ParameterDecorator;

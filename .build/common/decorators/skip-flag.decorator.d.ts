import type { ESkipFlag } from '../enums';
export declare const SKIP_FLAG = "skip_flag";
export declare const SkipFlag: (...flag: ESkipFlag[]) => import("@nestjs/common").CustomDecorator<string>;

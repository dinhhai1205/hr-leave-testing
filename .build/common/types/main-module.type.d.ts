import type { EMainModule } from '../enums';
export type MainModule = Lowercase<keyof typeof EMainModule>;

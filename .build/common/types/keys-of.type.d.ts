import type { IObjectLiteral } from '../interfaces/object-literal.interface';
export type KeysOf<T extends IObjectLiteral> = readonly (keyof T)[];

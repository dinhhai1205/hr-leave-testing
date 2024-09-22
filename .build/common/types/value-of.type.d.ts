import type { IObjectLiteral } from '../interfaces/object-literal.interface';
export type ValueOf<T extends IObjectLiteral> = T[keyof T];

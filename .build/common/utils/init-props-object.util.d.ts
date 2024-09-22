import type { IObjectLiteral } from '../interfaces/object-literal.interface';
type Props<T> = Partial<Record<keyof T, T[keyof T]>>;
export declare function initPropsObject<T extends IObjectLiteral>(obj?: Partial<T>, props?: Props<T>): Required<Props<T>> & Partial<T>;
export {};

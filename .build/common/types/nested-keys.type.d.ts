type NonExpandable = Date | Function | Array<any> | RegExp | Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any>;
export type NestedKeys<T, Prev = never> = {
    [K in keyof T & string]: T[K] extends NonExpandable ? K : K extends Prev ? never : T[K] extends object ? K | `${K}.${NestedKeys<T[K], K | Prev>}` : K;
}[keyof T & string];
export {};

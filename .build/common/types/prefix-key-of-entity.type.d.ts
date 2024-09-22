export type PrefixKeyOfEntity<E, Prefix extends string> = keyof {
    [K in keyof E as `${Prefix}.${string & K}`]: E[K];
};

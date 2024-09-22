interface IAssertsEmptyOpts {
    error?: {
        msg: string;
        statusCode: number;
    };
}
export declare class Asserts {
    static valueNotEmpty<T>(val: T | null | undefined, opts?: IAssertsEmptyOpts): asserts val is Required<T>;
    static objectPropsNotEmpty<T extends object>(obj?: T): asserts obj is Required<T>;
}
export {};

export declare function safeJsonParse<T>(args: {
    text?: string;
    defaultValueReturn: T;
}): T;
export declare function safeJsonParse<T>(args: {
    text?: string;
    defaultValueReturn: null;
}): T | null;

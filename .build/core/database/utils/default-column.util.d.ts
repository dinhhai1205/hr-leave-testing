type DefaultColumnArgs = ({
    columnType: 'DATETIME';
    value?: Date | string;
} | {
    columnType: 'INTEGER';
    value?: number;
} | {
    columnType: 'NUMERIC';
    value?: number;
} | {
    columnType: 'BOOLEAN';
    value?: boolean;
} | {
    columnType: 'VARCHAR';
    value?: string;
} | {
    columnType: 'JSONB';
    value?: string;
} | {
    columnType: 'UUID';
    value?: string;
}) & Partial<{
    isMigration: boolean;
}>;
export declare function defaultColumn({ columnType, value, isMigration, }: DefaultColumnArgs): string | number | boolean | (() => string) | undefined;
export {};

import * as ExcelJS from 'exceljs';
export declare class ExcelJSColumnDto {
    key: string;
    width: number;
    style: {
        numFmt: string;
    };
}
export declare class ColumnCustomizeV2Dto {
    columns: ExcelJS.Column[];
    mergeColumnKeys: string[];
    projection: {
        [field: string]: number;
    };
}

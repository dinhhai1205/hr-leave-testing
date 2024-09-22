import { PDFFont } from 'pdf-lib';
import { AwsS3Service } from '../../../../../libs/aws';
import { TawiType } from '../types/tawi.type';
type FormFieldPositions = {
    name: string;
    x: number;
    y: number;
    font: PDFFont;
    fontSize: number;
} | {
    name: string;
    x: number;
    y: number;
    fontSize: number;
    font?: undefined;
};
type CheckBoxData = {
    name: string;
    x: number;
    y: number;
    fontSize: number;
    checked: boolean;
};
type BorderLines = {
    start: {
        x: number;
        y: number;
    };
    end: {
        x: number;
        y: number;
    };
};
export declare class TawiTaxCertificateTemplateUtil {
    private readonly awsS3Service;
    private fileNames;
    constructor(awsS3Service: AwsS3Service);
    getPdfAssets(): Promise<{
        fontSabunRegular: Uint8Array;
        fontSabunBold: Uint8Array;
        imgSealEn: Uint8Array;
        imgSealTh: Uint8Array;
    }>;
    generateWithholdingTaxCertificate(propData: TawiType[], lang: string, year: number): Promise<{
        pdfBuffer: Uint8Array;
        pdfLength: number;
        pdfType: string;
    }>;
    generateEngContent(pageWidth: number, fontBold: PDFFont, fontSize: number, fontHeader: number): {
        formFieldPositions: FormFieldPositions[];
        checkboxData: CheckBoxData[];
        borderLines: BorderLines[];
    };
    generateThaiContent(pageWidth: number, fontBold: PDFFont, fontSize: number, fontHeader: number): {
        formFieldPositions: FormFieldPositions[];
        checkboxData: CheckBoxData[];
        borderLines: BorderLines[];
    };
}
export {};

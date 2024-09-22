import { HttpService } from '@nestjs/axios';
import { StreamableFile } from '@nestjs/common';
import { Request } from 'express';
import { HrforteApiConfig } from '../../../../config';
import { TawiType } from './types/tawi.type';
import { TawiTaxCertificateTemplateUtil } from './utils/tawi-tax-certificate-template.util';
export declare class TawiService {
    private readonly hrforteApiConfig;
    private readonly pdfTemplateService;
    private readonly httpService;
    constructor(hrforteApiConfig: HrforteApiConfig, pdfTemplateService: TawiTaxCertificateTemplateUtil, httpService: HttpService);
    getStatutoryPdfReport(args: {
        companyId: number;
        req: Request;
        lang: string;
        year: number;
    }): Promise<StreamableFile | null>;
    getStatutoryTawi(companyId: number, token: string | undefined, year: number): Promise<TawiType[]>;
}

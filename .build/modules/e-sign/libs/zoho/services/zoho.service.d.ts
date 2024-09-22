import { ZohoConfig } from '../../../../../config';
import { CreateZohoRequestBody, SubmitZohoRequestBodyDto, ZohoCommonResponse, ZohoResponseDto } from '../../../libs/zoho/dto';
import { ZohoApiService } from './zoho-api.service';
export declare class ZohoService {
    private readonly zohoConfig;
    private readonly apiService;
    private readonly apiUrl;
    constructor(zohoConfig: Pick<ZohoConfig, 'apiUrl'>, apiService: ZohoApiService);
    createDocument(requestDataBody: CreateZohoRequestBody): Promise<ZohoResponseDto>;
    submitDocument(requestId: string, submitZohoRequestBodyDto: SubmitZohoRequestBodyDto): Promise<ZohoResponseDto>;
    downloadCompletionCertificate(requestId: string): Promise<Buffer>;
    downloadDocumentFile(requestId: string): Promise<Buffer>;
    downloadParticularDocumentFile(requestId: string, zohoDocumentFileId: string): Promise<Buffer>;
    recallDocument(requestId: string): Promise<ZohoCommonResponse>;
    remindRecipients(requestId: string): Promise<ZohoCommonResponse>;
    extendDocument(requestId: string, extendedDateString: string): Promise<ZohoCommonResponse>;
}

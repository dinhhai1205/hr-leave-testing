import { ZohoRequestDto } from './zoho-request.dto';
export declare class CreateZohoRequestBody {
    files: Uint8Array[];
    requests: ZohoRequestDto;
    documentId: number;
    companyId: number;
    fileMetaData: {
        id: number;
        name: string;
    }[];
}

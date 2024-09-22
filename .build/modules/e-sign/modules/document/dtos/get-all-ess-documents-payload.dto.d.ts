import { GetAllDocumentsQueryDto } from './get-all-documents-query.dto';
declare const GetAllEssDocumentsPayloadDto_base: import("@nestjs/common").Type<Omit<GetAllDocumentsQueryDto, "queryOwner" | "queryRecipients">>;
export declare class GetAllEssDocumentsPayloadDto extends GetAllEssDocumentsPayloadDto_base {
    userEmail: string;
    companyId: number;
}
export {};

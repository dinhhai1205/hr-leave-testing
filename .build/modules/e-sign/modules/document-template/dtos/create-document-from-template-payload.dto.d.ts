import { BaseDocumentTemplateParamDto } from './base-document-template-param.dto';
import { CreateDocumentFromTemplateBodyDto } from './create-document-from-template-body.dto';
declare const CreateDocumentFromTemplatePayloadDto_base: import("@nestjs/common").Type<CreateDocumentFromTemplateBodyDto & BaseDocumentTemplateParamDto>;
export declare class CreateDocumentFromTemplatePayloadDto extends CreateDocumentFromTemplatePayloadDto_base {
    userEmail: string;
}
export {};

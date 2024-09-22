import { DocumentStatus } from '../../../enums';
import { BaseParamDto } from '../../../../../common/dto';
import { UpdateDocumentSettingBodyDto } from './update-document-setting-body.dto';
declare const UpdateDocumentSettingPayloadDto_base: import("@nestjs/common").Type<BaseParamDto & UpdateDocumentSettingBodyDto>;
export declare class UpdateDocumentSettingPayloadDto extends UpdateDocumentSettingPayloadDto_base {
    documentId: number;
    userEmail: string;
    status?: DocumentStatus;
}
export {};

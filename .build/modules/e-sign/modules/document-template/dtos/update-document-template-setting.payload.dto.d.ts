import { BaseDocumentTemplateParamDto } from '../../../modules/document-template/dtos/base-document-template-param.dto';
import { UpdateDOcumentTemplateSettingBodyDto } from '../../../modules/document-template/dtos/update-document-template-setting-body.dto';
declare const UpdateDOcumentTemplateSettingPayloadDto_base: import("@nestjs/common").Type<BaseDocumentTemplateParamDto & UpdateDOcumentTemplateSettingBodyDto>;
export declare class UpdateDOcumentTemplateSettingPayloadDto extends UpdateDOcumentTemplateSettingPayloadDto_base {
    userEmail: string;
}
export {};

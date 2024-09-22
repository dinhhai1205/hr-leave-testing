import { StreamableFile } from '@nestjs/common';
import { IMulterFileUploaded } from '../../common/interfaces';
import { AwsTranslateService } from '../../libs/aws';
import { GetTranslatedFileDto } from './dto';
export declare class TranslateService {
    private readonly awsTranslateService;
    private readonly translateClient;
    constructor(awsTranslateService: AwsTranslateService);
    getTranslatedFile(file: IMulterFileUploaded, { sourceLanguageCode, targetLanguageCode }: GetTranslatedFileDto): Promise<StreamableFile>;
    translateFile(file: Pick<IMulterFileUploaded, 'buffer' | 'mimetype'>, { sourceLanguageCode, targetLanguageCode }: GetTranslatedFileDto): Promise<string>;
    translateText(text: string, { sourceLanguageCode, targetLanguageCode }: GetTranslatedFileDto): Promise<string>;
    compareChanges(files: IMulterFileUploaded[]): Promise<{
        [key: string]: any;
    }>;
}

import { IMulterFileUploaded } from '../../common/interfaces';
import { AwsTranslateService } from '../../libs/aws';
import { GetTranslatedFileDto } from './dto';
export declare class TranslateService {
    private readonly awsTranslateService;
    private readonly translateClient;
    constructor(awsTranslateService: AwsTranslateService);
    getTranslatedFile(params: {
        file: IMulterFileUploaded;
        fileDataObj: {
            [key: string]: string;
        };
        langCode: GetTranslatedFileDto;
    }): Promise<{
        [key: string]: string;
    }>;
    translateFile(file: Pick<IMulterFileUploaded, 'buffer' | 'mimetype'>, { sourceLanguageCode, targetLanguageCode }: GetTranslatedFileDto): Promise<string>;
    translateText(text: string, { sourceLanguageCode, targetLanguageCode }: GetTranslatedFileDto): Promise<string>;
    compareChanges(files: IMulterFileUploaded[]): Promise<{
        [key: string]: any;
    }>;
}

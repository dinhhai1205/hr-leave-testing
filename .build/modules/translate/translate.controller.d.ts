import { IMulterFileUploaded } from '../../common/interfaces';
import { GetTranslatedFileDto } from './dto/get-translated-file.dto';
import { TranslateService } from './translate.service';
export declare class TranslateController {
    private readonly translateService;
    constructor(translateService: TranslateService);
    getTranslatedFile(file: IMulterFileUploaded, query: GetTranslatedFileDto): Promise<import("@nestjs/common").StreamableFile>;
    getTranslatedText(text: string, query: GetTranslatedFileDto): Promise<string>;
    compareChanges(files: IMulterFileUploaded[]): Promise<{
        [key: string]: any;
    }>;
}

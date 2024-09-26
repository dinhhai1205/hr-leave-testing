import { IMulterFileUploaded } from '../../common/interfaces';
import { TranslateFileBodyDto } from './dto/file-data-obj-body.dto';
import { GetTranslatedFileDto } from './dto/get-translated-file.dto';
import { TranslateService } from './translate.service';
export declare class TranslateController {
    private readonly translateService;
    constructor(translateService: TranslateService);
    getTranslatedFile(file: IMulterFileUploaded, query: GetTranslatedFileDto, body: TranslateFileBodyDto): Promise<{
        [key: string]: string;
    }>;
    getTranslatedText(text: string, query: GetTranslatedFileDto): Promise<string>;
    compareChanges(files: IMulterFileUploaded[]): Promise<{
        [key: string]: any;
    }>;
}

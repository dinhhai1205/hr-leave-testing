import { EncryptedFileInfoDto } from '../../../common/dto/encrypted-file-info.dto';
import { IMulterFileUploaded } from '../../../common/interfaces';
import { FrontendEncryptionService } from './frontend-encryption.service';
import { MobileEncryptionService } from './mobile-encryption.service';
export declare class EncryptionService {
    private readonly frontendEncryptionService;
    private readonly mobileEncryptionService;
    constructor(frontendEncryptionService: FrontendEncryptionService, mobileEncryptionService: MobileEncryptionService);
    decrypt(file: IMulterFileUploaded, encryptedFileInfo: EncryptedFileInfoDto): IMulterFileUploaded;
    private isEnableEncrypt;
}

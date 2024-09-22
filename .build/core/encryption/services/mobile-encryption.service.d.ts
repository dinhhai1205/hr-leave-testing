import { EncryptedFileInfoDto } from '../../../common/dto/encrypted-file-info.dto';
import { EncryptionConfig } from '../../../config/encryption.config';
export declare class MobileEncryptionService {
    private readonly encryptionConfig;
    constructor(encryptionConfig: EncryptionConfig);
    encrypt(data: string): {
        encryptedFile: string;
        encryptedSymmetricKey: string;
        encryptedIv: string;
    };
    decrypt(fileBuffer: Buffer, encryptedInfo: Required<Omit<EncryptedFileInfoDto, 'mobileMode'>>): Buffer;
}

import { EncryptedFileInfoDto } from '../../../common/dto/encrypted-file-info.dto';
import { EncryptionConfig } from '../../../config/encryption.config';
export declare class FrontendEncryptionService {
    private readonly encryptionConfig;
    constructor(encryptionConfig: EncryptionConfig);
    encrypt(data: Buffer): {
        encryptedFile: Buffer;
        encryptedSymmetricKey: string;
        encryptedIv: string;
    };
    decrypt(fileBuffer: Buffer, encryptedInfo: Required<Omit<EncryptedFileInfoDto, 'mobileMode'>>): Buffer;
}

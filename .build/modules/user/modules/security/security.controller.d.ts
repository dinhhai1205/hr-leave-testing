import { EncryptionConfig } from '../../../../config/encryption.config';
export declare class SecurityController {
    private encryptionConfig;
    constructor(encryptionConfig: EncryptionConfig);
    getSecurityPublickey(): string;
}

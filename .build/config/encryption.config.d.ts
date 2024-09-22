import type { ConfigType } from '@nestjs/config';
import type { CipherGCMTypes } from 'crypto';
export declare const encryptionConfig: (() => {
    ivLength: number;
    algorithm: CipherGCMTypes;
    key: string;
    securityPrivateKey: string;
    securityPublicKey: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    ivLength: number;
    algorithm: CipherGCMTypes;
    key: string;
    securityPrivateKey: string;
    securityPublicKey: string;
}>;
export type EncryptionConfig = ConfigType<typeof encryptionConfig>;
export declare const InjectEncryptionConfig: () => PropertyDecorator & ParameterDecorator;

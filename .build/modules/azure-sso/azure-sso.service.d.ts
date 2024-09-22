import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AppConfig, JwtConfig } from '../../config';
import { AzureSSOEntity, CompanyUserRoleEntity } from '../../core/database/entities';
import { LegacyBaseService } from '../../core/database/services';
import { IIdentityProvider, ISAMLAssertResponse, IServiceProvider } from './azure.sso.interface';
import { AzureSSODto } from './dto/azure-sso.dto';
type VerifySSOConfigOptions = {
    SAMLResponse: string;
    tenantId: string;
    azureSSOConfig: AzureSSOEntity;
};
export declare class AzureSSOService extends LegacyBaseService<AzureSSOEntity> {
    private jwtConfig;
    private jwtService;
    private readonly appConfig;
    private readonly httpService;
    readonly azureSSORepository: Repository<AzureSSOEntity>;
    readonly companyUserRoleRepository: Repository<CompanyUserRoleEntity>;
    constructor(jwtConfig: JwtConfig, jwtService: JwtService, appConfig: AppConfig, httpService: HttpService, azureSSORepository: Repository<AzureSSOEntity>, companyUserRoleRepository: Repository<CompanyUserRoleEntity>);
    getAzureSSOByManyCompany: (companyIds: number[]) => Promise<AzureSSOEntity[]>;
    getAzureSSOByCompany: (companyId: number) => Promise<AzureSSOEntity | null>;
    updateAzureSSO: (data: AzureSSODto) => Promise<AzureSSOEntity | import("typeorm").UpdateResult>;
    decodeBase64: (base64String: string) => string;
    getIdpEntityId: (saml: string) => string;
    buildServiceProvider: (metadataXML: string, entity_id: string) => any;
    buildIdentityProvider: (SAML: string, tenantId: string) => any;
    getUserSSOConfiguration: (email: string) => Promise<AzureSSOEntity[]>;
    getMetadataString: (metadataUrl: string) => Promise<string>;
    postAssert: (sp: IServiceProvider, idp: IIdentityProvider, SAMLResponse: string) => Promise<ISAMLAssertResponse>;
    generateTokenId: (response: ISAMLAssertResponse) => Promise<string>;
    generateRedirectUrl: (params: {
        [key: string]: string | number | boolean;
    }) => string;
    generateRedirectUrl2: (params: string) => string;
    verifySSOConfigAndGenerateToken: ({ SAMLResponse, tenantId, azureSSOConfig, }: VerifySSOConfigOptions) => Promise<string>;
    verifySAML: (SAMLResponse: string) => Promise<{
        tokenId: string;
        redirectUrl: string;
    }>;
}
export {};

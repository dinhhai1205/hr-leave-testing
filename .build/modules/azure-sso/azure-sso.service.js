"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureSSOService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const saml2Module = require('saml2-js');
const SAML2js = require('saml2js');
const qs = require('qs');
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const typeorm_2 = require("typeorm");
const config_1 = require("../../config");
const database_1 = require("../../core/database");
const entities_1 = require("../../core/database/entities");
const services_1 = require("../../core/database/services");
const SAML_ENTITYID_REGEX = /<.*Audience.*>(.+)<\/.*Audience>/;
const SAML_CERTIFICATE_REGEX = /<.*X509Certificate.*>(.+)<\/.*X509Certificate>/;
const METADATA_CERTIFICATE_REGEX = /<.*X509Certificate.*>(.+)<\/.*X509Certificate>/;
let AzureSSOService = class AzureSSOService extends services_1.LegacyBaseService {
    constructor(jwtConfig, jwtService, appConfig, httpService, azureSSORepository, companyUserRoleRepository) {
        super(azureSSORepository);
        this.jwtConfig = jwtConfig;
        this.jwtService = jwtService;
        this.appConfig = appConfig;
        this.httpService = httpService;
        this.azureSSORepository = azureSSORepository;
        this.companyUserRoleRepository = companyUserRoleRepository;
        this.getAzureSSOByManyCompany = async (companyIds) => {
            const queryBuilder = this.azureSSORepository
                .createQueryBuilder(entities_1.AzureSSOEntity.name)
                .where(`${entities_1.AzureSSOEntity.name}.companyId IN (:...companyIds)`, {
                companyIds,
            });
            const data = await queryBuilder.getMany();
            return data;
        };
        this.getAzureSSOByCompany = async (companyId) => {
            return this.azureSSORepository.findOne({
                where: { companyId, isDeleted: false },
            });
        };
        this.updateAzureSSO = async (data) => {
            const existedData = await this.azureSSORepository.findOne({
                where: {
                    companyId: data.companyId,
                    isDeleted: false,
                },
            });
            if (!existedData) {
                const entity = new entities_1.AzureSSOEntity();
                entity.metadataUrl = data.metadataUrl;
                entity.enable = data.enable;
                entity.companyId = data.companyId;
                entity.createdBy = data.createdBy;
                entity.createdOn = new Date();
                return this.azureSSORepository.save(entity);
            }
            return this.azureSSORepository.update(existedData.id, {
                metadataUrl: data.metadataUrl,
                enable: data.enable,
                companyId: data.companyId,
                updatedBy: data.updatedBy,
                updatedOn: new Date(),
            });
        };
        this.decodeBase64 = (base64String) => {
            return Buffer.from(base64String, 'base64').toString('ascii');
        };
        this.getIdpEntityId = (saml) => {
            const entityIdMatch = SAML_ENTITYID_REGEX.exec(saml);
            if (!entityIdMatch) {
                throw new Error('Entity ID not found');
            }
            return entityIdMatch[1];
        };
        this.buildServiceProvider = (metadataXML, entity_id) => {
            const certificateMatch = METADATA_CERTIFICATE_REGEX.exec(metadataXML);
            if (!certificateMatch) {
                throw new Error('Invalid Metadata');
            }
            const certificate = certificateMatch[1];
            return new saml2Module.ServiceProvider({
                entity_id,
                assert_endpoint: 'http://localhost:3000/test',
                private_key: '',
                certificate,
                allow_unencrypted_assertion: true,
            });
        };
        this.buildIdentityProvider = (SAML, tenantId) => {
            const certificateMatch = SAML_CERTIFICATE_REGEX.exec(SAML);
            if (!certificateMatch) {
                throw new Error('Invalid SAML Response');
            }
            const url = `https://login.microsoftonline.com/${tenantId}/saml2`;
            const certificate = certificateMatch[1];
            return new saml2Module.IdentityProvider({
                sso_login_url: url,
                sso_logout_url: url,
                certificates: [certificate],
                allow_unencrypted_assertion: true,
            });
        };
        this.getUserSSOConfiguration = async (email) => {
            const companyUserRoleAlias = entities_1.CompanyUserRoleEntity.name;
            const queryBuilder = this.companyUserRoleRepository.createQueryBuilder(companyUserRoleAlias);
            const companyUserRoleBuilder = new database_1.WhereConditionBuilder(companyUserRoleAlias);
            const { condition, parameters } = companyUserRoleBuilder
                .andIsDeletedFalse()
                .andActiveTrue()
                .andWhere({ field: 'email', operator: '=', value: email })
                .buildSql();
            queryBuilder.andWhere(condition, parameters);
            const data = await queryBuilder.getMany();
            const companyIds = data.map(item => item.companyId);
            if (!companyIds.length)
                return [];
            return this.getAzureSSOByManyCompany(companyIds);
        };
        this.getMetadataString = async (metadataUrl) => {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(metadataUrl));
            return data;
        };
        this.postAssert = (sp, idp, SAMLResponse) => {
            return new Promise((resolve, reject) => {
                sp.post_assert(idp, {
                    allow_unencrypted_assertion: true,
                    request_body: { SAMLResponse },
                }, (error, samlAssert) => {
                    if (error)
                        return reject(error);
                    resolve(samlAssert);
                });
            });
        };
        this.generateTokenId = (response) => {
            const { user } = response;
            return this.jwtService.signAsync(user, {
                secret: this.jwtConfig.secret,
                expiresIn: this.jwtConfig.expiresIn,
            });
        };
        this.generateRedirectUrl = (params) => {
            const url = this.appConfig.clientUrl;
            return `${url}/?${qs.stringify(params)}`;
        };
        this.generateRedirectUrl2 = (params) => {
            const url = this.appConfig.clientUrl;
            return `${url}/?${params}`;
        };
        this.verifySSOConfigAndGenerateToken = async ({ SAMLResponse, tenantId, azureSSOConfig, }) => {
            const { metadataUrl, enable } = azureSSOConfig || {};
            if (!metadataUrl || !enable)
                return '';
            const metadataXML = await this.getMetadataString(metadataUrl);
            const decodedSAML = this.decodeBase64(SAMLResponse);
            const entityId = this.getIdpEntityId(decodedSAML);
            const serviceProvider = this.buildServiceProvider(metadataXML, entityId);
            const identityProvider = this.buildIdentityProvider(decodedSAML, tenantId);
            const response = await this.postAssert(serviceProvider, identityProvider, SAMLResponse);
            const tokenId = await this.generateTokenId(response);
            return tokenId;
        };
        this.verifySAML = async (SAMLResponse) => {
            const parser = new SAML2js(SAMLResponse);
            const { httpSchemasMicrosoftComIdentityClaimsTenantid: tenantId = '', httpSchemasXmlsoapOrgWs200505IdentityClaimsEmailaddress: email = '', } = parser.toObject();
            if (!email) {
                throw new common_1.BadRequestException(`Could not found email from SAML response`);
            }
            const data = await this.getUserSSOConfiguration(email);
            let tokenId = '';
            for (const azureSSOConfig of data) {
                if (tokenId)
                    break;
                tokenId = await this.verifySSOConfigAndGenerateToken({
                    SAMLResponse,
                    tenantId,
                    azureSSOConfig,
                });
            }
            return {
                tokenId,
                redirectUrl: this.generateRedirectUrl2(tokenId ? `auth-email=${email}` : 'invalid-sso=true'),
            };
        };
    }
};
exports.AzureSSOService = AzureSSOService;
exports.AzureSSOService = AzureSSOService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, config_1.InjectJwtConfig)()),
    __param(2, (0, config_1.InjectAppConfig)()),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.AzureSSOEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_1.CompanyUserRoleEntity)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService, Object, axios_1.HttpService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AzureSSOService);
//# sourceMappingURL=azure-sso.service.js.map
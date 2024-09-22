import { Request, Response } from 'express';
import { AppConfig } from '../../config';
import { IActiveUserData } from '../../core/iam/interfaces';
import { AzureSSOService } from './azure-sso.service';
import { SAMLDto } from './dto/azure-sso.dto';
export declare class AzureSSOController {
    private azureSSOService;
    private readonly appConfig;
    constructor(azureSSOService: AzureSSOService, appConfig: AppConfig);
    getSSOConfig(companyId: number): Promise<import("../../core/database").AzureSSOEntity | null>;
    updateSSOConfig(request: Request, companyId: number, { userEmail }: IActiveUserData): Promise<import("../../core/database").AzureSSOEntity | import("typeorm").UpdateResult>;
    verifySAML(body: SAMLDto, response: Response): Promise<void>;
}

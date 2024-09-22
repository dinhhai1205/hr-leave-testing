import { Repository } from 'typeorm';
import { EApiModuleMode } from '../../../../common/enums';
import { IPermissionActions } from '../../../../common/interfaces';
import { CompanyUserRoleAdminData } from '../../../../common/types';
import { CompanyUserRoleEntity } from '../../../../core/database/entities/company-user-role.entity';
import { LegacyBaseService } from '../../../../core/database/services';
export declare class CompanyUserRoleService extends LegacyBaseService<CompanyUserRoleEntity> {
    readonly companyUserRoleRepository: Repository<CompanyUserRoleEntity>;
    constructor(companyUserRoleRepository: Repository<CompanyUserRoleEntity>);
    getAdminOrganizationPaths(orgElementListJson?: string): string[];
    getCompanyUserRole(args: {
        companyId: number;
        email: string;
    }): Promise<{
        companyUserRoleId: string;
        orgElementListJson: string;
        roleHeaderId: string;
        leave: string | IPermissionActions;
        approval: string | IPermissionActions;
        payroll: string | IPermissionActions;
    } | null>;
    getAdminDataOfCompany(args: {
        companyId: number;
        apiModuleMode?: EApiModuleMode;
    }): Promise<CompanyUserRoleAdminData[] | null | undefined>;
    getAdminData(args: {
        companyId: number;
        userEmail: string;
        apiModuleMode?: EApiModuleMode;
    }): Promise<CompanyUserRoleAdminData | null | undefined>;
    findAdminsExistWithEmails(companyId: number, emails: string[]): Promise<string[]>;
}

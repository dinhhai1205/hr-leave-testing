import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtConfig } from '../../../../config';
import { CompanyUserRoleService } from '../../../../modules/user/modules/company-user-role/company-user-role.service';
import { EmployeeService } from '../../../../modules/user/modules/employee/employee.service';
import { AccessTokenService } from '../access-token.service';
export declare class AccessTokenGuard implements CanActivate {
    private reflector;
    private readonly jwtService;
    private readonly employeeService;
    private readonly companyUserRoleService;
    private readonly accessTokenService;
    private readonly jwtConfig;
    constructor(reflector: Reflector, jwtService: JwtService, employeeService: EmployeeService, companyUserRoleService: CompanyUserRoleService, accessTokenService: AccessTokenService, jwtConfig: JwtConfig);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
    private setActiveUserToRequest;
    private setUserData;
    private setActiveAdminData;
    private setIActiveEssData;
    private getRanking;
    private getCompanyId;
}

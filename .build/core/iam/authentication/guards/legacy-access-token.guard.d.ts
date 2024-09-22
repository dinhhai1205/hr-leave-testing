import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { EApiAppMode, EMainModule, EUserRanking } from '../../../../common/enums';
import { IRequest } from '../../../../common/interfaces';
import { JwtConfig } from '../../../../config';
import { OctoUserService } from '../../../../modules/octopro/modules/octo-user/octo-user.service';
import { CompanyUserRoleService } from '../../../../modules/user/modules/company-user-role/company-user-role.service';
import { EmployeeService } from '../../../../modules/user/modules/employee/employee.service';
export declare class LegacyAccessTokenGuard implements CanActivate {
    private jwtConfig;
    private jwtService;
    private employeeService;
    private reflector;
    private companyUserRole;
    private readonly octoUserService;
    private defaultPermission;
    constructor(jwtConfig: JwtConfig, jwtService: JwtService, employeeService: EmployeeService, reflector: Reflector, companyUserRole: CompanyUserRoleService, octoUserService: OctoUserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    setHrforteAuthContext(args: {
        request: IRequest;
        companyId: number;
        email: string;
        appMode: EApiAppMode;
        ranking: EUserRanking;
        module: EMainModule;
    }): Promise<void>;
    setOctoAuthContext(args: {
        request: IRequest;
        email: string;
        companyId: number;
        ranking: EUserRanking;
    }): Promise<void>;
}

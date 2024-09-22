import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { TimeTrackerApiService } from '../../libs/api/api.service';
import { CompanyMappingService } from '../../modules/company-mapping/company-mapping.service';
import { IRequestData } from '../interfaces/request-data.interface';
import { EmployeeMappingService } from '../../modules/employee-mapping/employee-mapping.service';
export declare class TimeTrackerEmployeeInfoMiddleware implements NestMiddleware {
    private readonly companyMappingService;
    private readonly timeTrackerApiService;
    private readonly employeeMappingService;
    constructor(companyMappingService: CompanyMappingService, timeTrackerApiService: TimeTrackerApiService, employeeMappingService: EmployeeMappingService);
    use(request: IRequestData, response: Response, next: NextFunction): Promise<void>;
}

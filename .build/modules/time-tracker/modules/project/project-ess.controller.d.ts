import { BaseParamDto } from '../../../../common/dto';
import { ProjectService } from './project.service';
export declare class ProjectEssController {
    private projectService;
    constructor(projectService: ProjectService);
    getListProjectOfEmployee({ companyId }: BaseParamDto, employeeId: number): Promise<any>;
}

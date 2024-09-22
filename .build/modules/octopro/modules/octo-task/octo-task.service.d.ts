import * as moment from 'moment';
import { Repository } from 'typeorm';
import { OctoTaskEntity } from '../../../../core/database/entities/octo-task.entity';
export declare class OctoTaskService {
    private readonly octoTaskRepository;
    constructor(octoTaskRepository: Repository<OctoTaskEntity>);
    getTotalPendingTasks(input: {
        companyId: number;
        currentDate: moment.Moment;
    }): Promise<number>;
}

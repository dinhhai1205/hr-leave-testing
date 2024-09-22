import * as moment from 'moment';
import { Repository } from 'typeorm';
import { PayrollGroupEntity } from '../../../../core/database/entities/payroll-group.entity';
import { LegacyBaseService } from '../../../../core/database/services';
import { PayRollGroupWorkDayService } from '../payroll-group-wd/payroll-group-wd.service';
export declare class PayRollGroupService extends LegacyBaseService<PayrollGroupEntity> {
    readonly payrollGroupRepository: Repository<PayrollGroupEntity>;
    private readonly payrollGroupWorkdayService;
    constructor(payrollGroupRepository: Repository<PayrollGroupEntity>, payrollGroupWorkdayService: PayRollGroupWorkDayService);
    getPayrollGroupById(companyId: number, payrollGroupId: number): Promise<PayrollGroupEntity>;
    getWorkingDay(currentDate: moment.Moment, payrollGroup: Pick<PayrollGroupEntity, 'id' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' | 'pgType'>): Promise<number>;
}

import { Moment } from 'moment';
import { Repository } from 'typeorm';
import { PayrollGroupWorkDayEntity } from '../../../../core/database/entities/payroll-group-wd.entity';
import { LegacyBaseService } from '../../../../core/database/services';
export declare class PayRollGroupWorkDayService extends LegacyBaseService<PayrollGroupWorkDayEntity> {
    readonly payrollGroupWorkDayRepository: Repository<PayrollGroupWorkDayEntity>;
    constructor(payrollGroupWorkDayRepository: Repository<PayrollGroupWorkDayEntity>);
    getPayrollGroupWorkDayTable(payload: {
        dateFromMoment: Moment;
        dateToMoment: Moment;
        payrollGroupId: number;
        payrollGroupWorkDays?: PayrollGroupWorkDayEntity[];
    }): Promise<{
        [year: number]: PayrollGroupWorkDayEntity;
    }>;
    private getPayrollGroupWordDayIfNotProvided;
}

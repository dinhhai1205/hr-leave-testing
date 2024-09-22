import { Repository } from 'typeorm';
import { CurrencyEntity } from '../../../../core/database/entities/currency.entity';
import { IPayrollReport } from '../../../payroll/modules/payroll-report/interfaces/payroll-report.interface';
export declare class CurrencyService {
    private readonly currencyRepository;
    constructor(currencyRepository: Repository<CurrencyEntity>);
    setCurrencyCodeForPayrollReport(payrollReports: IPayrollReport[]): Promise<void>;
}

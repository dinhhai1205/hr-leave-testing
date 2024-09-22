import { PaginationQueryDto } from '../../../../../common/dto';
import { PayCalculationMethod } from '../../../../../core/database';
export declare class CreatePayrollByPrtrxHdrDto extends PaginationQueryDto {
    payrollCalculationMethod?: PayCalculationMethod;
    querySearchFields?: string[];
}

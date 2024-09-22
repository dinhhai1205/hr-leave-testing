import { EEmployeeContractType } from '../../../../../common/enums';
import { PayrollReportDashboardByPayCategoriesDto } from '../../../../payroll/modules/payroll-report/dto/payroll-report-dashboard-by-pay-categorories.dto';
declare const OctoDashboardWorkforceQueryDto_base: import("@nestjs/common").Type<Pick<PayrollReportDashboardByPayCategoriesDto, "countryCodes">>;
export declare class OctoDashboardWorkforceQueryDto extends OctoDashboardWorkforceQueryDto_base {
    contractTypes: EEmployeeContractType[];
}
export {};

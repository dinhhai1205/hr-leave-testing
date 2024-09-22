import { BaseAppEntity } from './base-app.entity';
import { TimeSheetAdjustmentEntity } from './timesheet-adjustment.entity';
export declare class PayElementMappingEntity extends BaseAppEntity {
    companyId: number;
    code: string;
    name: string;
    pay_element_category_code: string;
    tags: string;
    is_sys_gen: boolean;
    formula: string;
    gl_code: string;
    active: string;
    name_local: string;
    type: string;
    computed: boolean;
    timesheetAdjustment: TimeSheetAdjustmentEntity;
}

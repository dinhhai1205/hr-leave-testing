import { EPolicyCarryForwardType, EPolicyEffectiveType, EPolicyEffectiveUOM } from '../../../common/enums';
import { EPolicyExpireFrom } from '../../../modules/time-off/modules/leave-type-policy/enums/policy-expire-from.enum';
import { EPolicyExpireType } from '../../../modules/time-off/modules/leave-type-policy/enums/policy-expire-type.enum';
import { EPolicyRenewType } from '../../../modules/time-off/modules/leave-type-policy/enums/policy-renew-type.enum';
import { AbstractEntity } from './abstract.entity';
import { CompanyEntity } from './company.entity';
import { LeaveTypePolicyCreditEntity } from './leave-type-policy-credit.entity';
import { LeaveTypeEntity } from './leave-type.entity';
export declare class LeaveTypePolicyEntity extends AbstractEntity {
    id: number;
    companyId: number;
    ltId: number;
    code: string;
    name: string;
    effAfterUnit: number;
    effAfterUOM: EPolicyEffectiveUOM;
    effAfterType: EPolicyEffectiveType;
    entitlement: number;
    prorateEntitlement: boolean;
    prorateUnit: number;
    creditOnDay: number;
    renewYearly: boolean;
    renewType: EPolicyRenewType;
    renewOnDay: number;
    renewOnMonth: number;
    cfUnit: number;
    cfType?: EPolicyCarryForwardType;
    cfLtId?: number;
    expireType: EPolicyExpireType;
    expireInDays: number;
    expireInFrom: EPolicyExpireFrom;
    expireOnDay: number;
    expireOnMonth: number;
    previousPolicySetting?: string;
    company: CompanyEntity;
    leaveType: LeaveTypeEntity;
    leaveTypePolicyCredits: LeaveTypePolicyCreditEntity[];
    employeePolicyCredit: LeaveTypePolicyCreditEntity;
}

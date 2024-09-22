import type { AspNetUsersEntity, LeaveTypeBalanceEntity, LeaveTypeEntity, LeaveTypePolicyCreditEntity, LeaveTypePolicyEntity } from '../../../../../core/database';
interface IPolicyCredit extends Pick<LeaveTypePolicyCreditEntity, 'id' | 'uuid' | 'leavePolicyId' | 'leaveTypeId' | 'employeeId' | 'companyId' | 'credit' | 'creditRemaining' | 'creditedOn' | 'carryForward' | 'carryForwardRemaining' | 'carryForwardOn' | 'carryToLtId' | 'expiresOn'> {
}
interface IPolicy extends Pick<LeaveTypePolicyEntity, 'id' | 'companyId' | 'ltId' | 'entitlement' | 'effAfterUnit' | 'effAfterUOM' | 'effAfterType' | 'prorateEntitlement' | 'prorateUnit' | 'creditOnDay' | 'renewYearly' | 'renewType' | 'renewOnDay' | 'renewOnMonth' | 'cfUnit' | 'cfType' | 'cfLtId' | 'expireType' | 'expireInDays' | 'expireInFrom' | 'expireOnDay' | 'expireOnMonth'> {
    employeePolicyCredit?: IPolicyCredit | null;
}
interface IBalance extends Pick<LeaveTypeBalanceEntity, 'id' | 'companyId' | 'employeeId' | 'leaveTypeId' | 'balance'> {
}
interface IType extends Pick<LeaveTypeEntity, 'id' | 'cfRoundTo'> {
    employeeLeaveTypeBalance?: IBalance;
    leaveTypePolicies: IPolicy[];
}
interface IAspUser extends Pick<AspNetUsersEntity, 'id' | 'utcOffset'> {
}
interface IGetAllEmployeePolicyCredit {
    id: number;
    companyId: number;
    employeeRef: string;
    joinDate: null | Date;
    confirmDate: null | Date;
    seniorityDate: null | Date;
    contractDateFrom: null | Date;
    leaveTypes: IType[];
    aspNetUsers: IAspUser;
}
export type { IBalance, IGetAllEmployeePolicyCredit, IPolicy, IPolicyCredit, IType, };

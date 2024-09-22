import { AbstractEntity } from './abstract.entity';
export declare class OvertimeHeaderEntity extends AbstractEntity {
    id: number;
    companyId: number;
    overtimeNo: number;
    year: number;
    cycleFrequencyId: number;
    statusId: number;
    remark: string;
    dateFrom: Date;
    dateTo: Date;
    requireApproval: boolean;
    approvalLevel: number;
    orgEleId: number;
    allMustApprove: boolean;
    approvedBy: number;
    approvedOn: Date;
}

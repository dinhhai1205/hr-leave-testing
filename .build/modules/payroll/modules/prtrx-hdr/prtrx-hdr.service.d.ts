import { FindOptionsWhere, Repository } from 'typeorm';
import { PrtrxHdrEntity } from '../../../../core/database/entities/prtrx-hdr.entity';
export declare class PrtrxHdrService {
    private readonly prTrxHdrRepo;
    constructor(prTrxHdrRepo: Repository<PrtrxHdrEntity>);
    getLatestPreviousPayrollTrxHeader(currentPayrollHeaderId: number, previousPayrollHeaderId?: number): Promise<PrtrxHdrEntity | {
        id: number;
        cyclePeriodDetail: {
            id: number;
            code: null;
        };
    }>;
    getTotalPayrollFinalized(companyIds: number[], filter?: FindOptionsWhere<PrtrxHdrEntity>): Promise<number>;
    getTotalPayrollIsDeleted(): Promise<number>;
    getPayrollHeaderById(id: number): Promise<PrtrxHdrEntity | null>;
    getPayrollHeaderByPayrollTimesheetId(id: number): Promise<PrtrxHdrEntity | null>;
    getEmployeesOfPrtrxHdr(id: number): Promise<number[]>;
    getAllPayrollReportIsDeleted(args: {
        skip: number;
        take: number;
    }): Promise<number[]>;
}

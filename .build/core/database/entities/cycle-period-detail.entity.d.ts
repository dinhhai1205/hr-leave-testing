import { PrtrxHdrEntity } from './prtrx-hdr.entity';
import { CyclePeriodHeaderEntity } from './cycle-period-header.entity';
export declare class CyclePeriodDetailEntity {
    id: number;
    code: string;
    companyId: number;
    cyclePeriodHeaderId: number;
    dateFrom: Date;
    dateTo: Date;
    prtrxHdrs: PrtrxHdrEntity[];
    header: CyclePeriodHeaderEntity;
}

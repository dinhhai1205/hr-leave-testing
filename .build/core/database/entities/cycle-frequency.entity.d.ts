import { PrtrxHdrEntity } from './prtrx-hdr.entity';
import { CyclePeriodHeaderEntity } from './cycle-period-header.entity';
export declare class CycleFrequencyEntity {
    id: number;
    companyId: number;
    firstDay1: number;
    lastDay1: number;
    firstDay2: number;
    lastDay2: number;
    prtrxHdrs: PrtrxHdrEntity[];
    periods: CyclePeriodHeaderEntity[];
}

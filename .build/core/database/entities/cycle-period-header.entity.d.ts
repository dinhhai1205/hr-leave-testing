import { CycleFrequencyEntity } from './cycle-frequency.entity';
import { CyclePeriodDetailEntity } from './cycle-period-detail.entity';
export declare class CyclePeriodHeaderEntity {
    id: number;
    companyId: number;
    year: number;
    cycleFrequencyId: number;
    frequency: CycleFrequencyEntity;
    details: CyclePeriodDetailEntity[];
}

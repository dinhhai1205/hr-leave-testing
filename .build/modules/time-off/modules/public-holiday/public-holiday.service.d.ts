import { Repository } from 'typeorm';
import { PublicHolidayEntity } from '../../../../core/database/entities/public-holiday.entity';
import { LegacyBaseService } from '../../../../core/database/services';
export declare class PublicHolidayService extends LegacyBaseService<PublicHolidayEntity> {
    readonly publicHolidayRepository: Repository<PublicHolidayEntity>;
    constructor(publicHolidayRepository: Repository<PublicHolidayEntity>);
    getAllPublicHolidaysTableInDateRange(payload: {
        companyId: number;
        dateFromString: string;
        dateToString: string;
        publicHolidays?: Array<Pick<PublicHolidayEntity, 'id' | 'date' | 'year'>>;
    }): Promise<{
        [year: number]: {
            [dateString: string]: PublicHolidayEntity;
        };
    }>;
    getAllPublicHolidaysInDateRange(payload: {
        companyId: number;
        dateFromString: string;
        dateToString: string;
    }): Promise<PublicHolidayEntity[]>;
}

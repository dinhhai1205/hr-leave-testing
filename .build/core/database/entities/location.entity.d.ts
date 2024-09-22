import { BaseAppEntity } from './base-app.entity';
import { LocationWorkScheduleEntity } from './location-work-schedule.entity';
export declare class LocationEntity extends BaseAppEntity {
    ttLocationId: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    geoFence: {
        radius: number;
        units: string;
        radiusInMeters: number;
    };
    visible: boolean;
    companyId: number;
    locationWorkSchedules: LocationWorkScheduleEntity[];
}

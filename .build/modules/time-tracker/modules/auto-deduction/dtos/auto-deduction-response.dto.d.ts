import { BaseEntityResponseDto, UnitTime } from '../../../common';
export declare class AutoDeductionResponse extends BaseEntityResponseDto {
    name: string;
    duration: number;
    threshold: number;
    unitTime: UnitTime;
    workScheduleId: number;
}

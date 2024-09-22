import { UnitTime } from '../../../common';
export declare class CreateBreakRuleDTO {
    name: string;
    allowToBeTakenFromTo: boolean;
    duration: number;
    from: string;
    to: string;
    unitTime: UnitTime;
}

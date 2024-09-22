import { OvertimeService } from './overtime.service';
import { DayToProrateDto, DayToProrateResponse } from './dtos/day-to-prorate.dto';
export declare class OvertimeController {
    private readonly overtimeService;
    constructor(overtimeService: OvertimeService);
    getDayToProrate(payload: DayToProrateDto[], userEmail: string, companyId: number, headerId: number): Promise<DayToProrateResponse>;
    getOvertimeHeaderEmployees(companyId: number, headerId: number, overtimeDetailIds?: number[]): Promise<{
        data: {
            id: number | undefined;
            daysToProrate: number;
        }[];
    }>;
}

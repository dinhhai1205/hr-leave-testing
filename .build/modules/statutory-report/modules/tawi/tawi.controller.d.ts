import { Request } from 'express';
import { GetStatutoryTawiReportQueryDto } from './dtos/get-statutory-tawi-report-query.dto';
import { TawiService } from './tawi.service';
export declare class TawiController {
    private readonly tawiService;
    constructor(tawiService: TawiService);
    getStatutoryPdfReport(companyId: number, { language, year }: GetStatutoryTawiReportQueryDto, req: Request): Promise<import("@nestjs/common").StreamableFile | null>;
}

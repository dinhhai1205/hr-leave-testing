import { StreamableFile } from '@nestjs/common';
import { TimeTrackerApiService } from '../../../libs/api/api.service';
import { ExportExcelFileTypeDto } from '../dtos';
export declare class ExportTimeEntriesExcelFileService {
    private readonly apiService;
    constructor(apiService: TimeTrackerApiService);
    handleGenerateRawExcelFile(companyId: string, timeEntryOverviewDto: ExportExcelFileTypeDto): Promise<StreamableFile>;
}

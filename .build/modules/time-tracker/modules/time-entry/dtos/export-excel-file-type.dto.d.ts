import { TimeSheetType } from '../../../common';
import { GetTimeEntriesOverviewQueryDto } from './get-overview-time-entry-query.dto';
export declare class ExportExcelFileTypeDto extends GetTimeEntriesOverviewQueryDto {
    type: TimeSheetType;
}

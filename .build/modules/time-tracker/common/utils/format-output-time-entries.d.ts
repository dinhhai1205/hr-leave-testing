import type { ITimeEntryDetailResponse, ITimeEntryOverviewResponse } from '../interfaces';
export declare function handleFormatOutputGetOverviewTimeEntries(input: ITimeEntryOverviewResponse[]): {
    data: ITimeEntryOverviewResponse[];
    itemsCount: number;
};
export declare function handleFormatOutputGetDetailTimeEntries(input: ITimeEntryDetailResponse): {
    data: ITimeEntryDetailResponse;
};

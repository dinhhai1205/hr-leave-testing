export declare const SELECT_TIME_ENTRIES_DETAIL_EMPLOYEE: {
    id: boolean;
    timeEntryType: boolean;
    timeEntry: boolean;
    description: boolean;
    employee: {
        id: boolean;
        lastName: boolean;
        firstName: boolean;
        roleName: boolean;
    };
    locationWorkSchedule: {
        id: boolean;
        location: {
            id: boolean;
            name: boolean;
        };
    };
    project: {
        id: boolean;
        name: boolean;
    };
    activity: {
        id: boolean;
        name: boolean;
    };
    workSchedule: {
        id: boolean;
        name: boolean;
        breakType: boolean;
    };
    company: {
        id: boolean;
        name: boolean;
    };
    breakRule: {
        id: boolean;
        name: boolean;
    };
    nextTimeEntryId: boolean;
    previousTimeEntryId: boolean;
    offset: boolean;
    localDate: boolean;
    status: boolean;
    totalDuration: boolean;
    unitTime: boolean;
    createdBy: boolean;
    createdOn: boolean;
    updatedBy: boolean;
};

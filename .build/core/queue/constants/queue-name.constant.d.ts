export declare const QUEUE: {
    LEAVE_TYPE_POLICY: {
        PROCESSOR: string;
        PROCESS: {
            CREDIT: string;
            DEDUCTION: string;
            REVERTING: string;
        };
        JOB_ID: {
            CRONJOB_2AM_EVERY_DAY: string;
        };
    };
    LEAVE_MODULE_API_LOG: {
        PROCESSOR: string;
        PROCESS: {
            CREATE_API_LOG: string;
        };
    };
    HRFORTE_NOTIFICATION: {
        PROCESSOR: string;
        PROCESS: {
            SEND_BULK: string;
        };
    };
    SLACK: {
        PROCESSOR: string;
        PROCESS: {
            POST_MESSAGE: string;
        };
    };
    WORK_SCHEDULE_ASSIGNMENT: {
        PROCESSOR: string;
        PROCESS: {
            REMOVE: string;
        };
    };
    WORK_SCHEDULE: {
        PROCESSOR: string;
        PROCESS: {
            PUBLISHED: string;
            UNPUBLISHED: string;
            EXPIRED: string;
        };
    };
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUEUE = void 0;
exports.QUEUE = {
    LEAVE_TYPE_POLICY: {
        PROCESSOR: 'LEAVE_TYPE_POLICY',
        PROCESS: {
            CREDIT: 'creditLeaveBalancePolicy',
            DEDUCTION: 'deductLeaveTypePolicyCredit',
            REVERTING: 'revertLeaveTypePolicyCredit',
        },
        JOB_ID: {
            CRONJOB_2AM_EVERY_DAY: 'cronjob2AmEveryDay',
        },
    },
    LEAVE_MODULE_API_LOG: {
        PROCESSOR: 'LEAVE_MODULE_API_LOG',
        PROCESS: {
            CREATE_API_LOG: 'createApiLog',
        },
    },
    HRFORTE_NOTIFICATION: {
        PROCESSOR: 'HRFORTE_NOTIFICATION',
        PROCESS: {
            SEND_BULK: 'sendBulk',
        },
    },
    SLACK: {
        PROCESSOR: 'SLACK',
        PROCESS: {
            POST_MESSAGE: 'postMessage',
        },
    },
    WORK_SCHEDULE_ASSIGNMENT: {
        PROCESSOR: 'WORK_SCHEDULE_ASSIGNMENT',
        PROCESS: {
            REMOVE: 'remoteWorkScheduleAssignment',
        },
    },
    WORK_SCHEDULE: {
        PROCESSOR: 'WORK_SCHEDULE',
        PROCESS: {
            PUBLISHED: 'publishedWorkWorkSchedule',
            UNPUBLISHED: 'unpublishedWorkWorkSchedule',
            EXPIRED: 'expiredWorkWorkSchedule',
        },
    },
};
//# sourceMappingURL=queue-name.constant.js.map
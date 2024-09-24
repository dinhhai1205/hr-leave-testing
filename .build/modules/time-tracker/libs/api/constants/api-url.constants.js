"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIME_TRACKER_URL = void 0;
exports.TIME_TRACKER_URL = {
    CREATE_PROJECT: {
        method: 'POST',
        url: ':companyId/project',
    },
    GET_ALL_PROJECT: {
        method: 'GET',
        url: ':companyId/project',
    },
    UPDATE_PROJECT_ADD_NEW_ASSIGNEE: {
        method: 'PATCH',
        url: ':companyId/project/:projectId/assignees/add',
    },
    UPDATE_PROJECT_REMOVE_ASSIGNEE: {
        method: 'PATCH',
        url: ':companyId/project/:projectId/assignees/remove',
    },
    UPDATE_PROJECT_BY_ID: {
        method: 'PATCH',
        url: ':companyId/project/:projectId',
    },
    DELETE_PROJECT_BY_ID: {
        method: 'DELETE',
        url: ':companyId/project/:projectId',
    },
    DELETE_MULTIPLE_PROJECTS: {
        method: 'DELETE',
        url: ':companyId/project',
    },
    GET_ALL_PROJECT_EMPLOYEE_ASSIGNEE: {
        method: 'GET',
        url: ':companyId/project/:projectId/employee-assignees',
    },
    GET_ALL_PROJECT_GROUP_ASSIGNEE: {
        method: 'GET',
        url: ':companyId/project/:projectId/group-assignees',
    },
    GET_PROJECT_BY_ID: {
        method: 'GET',
        url: ':companyId/project/:projectId',
    },
    GET_ALL_PROJECT_EMPLOYEES: {
        method: 'GET',
        url: ':companyId/assignee-employee/project',
    },
    GET_ALL_PROJECT_GROUPS: {
        method: 'GET',
        url: ':companyId/project/groups',
    },
    GET_ALL_ESS_PROJECT_EMPLOYEE: {
        method: 'GET',
        url: ':companyId/assignee-employee/:employeeId/project-ess',
    },
    CREATE_CLIENT: {
        method: 'POST',
        url: '/:companyId/client',
    },
    GET_CLIENT_BY_ID: {
        method: 'GET',
        url: '/:companyId/client/:clientId',
    },
    GET_ALL_CLIENTS: {
        method: 'GET',
        url: '/:companyId/client',
    },
    UPDATE_CLIENT: {
        method: 'PATCH',
        url: '/:companyId/client/:clientId',
    },
    DELETE_MULTIPLE_CLIENT: {
        method: 'DELETE',
        url: '/:companyId/client',
    },
    DELETE_CLIENT: {
        method: 'DELETE',
        url: '/:companyId/client/:clientId',
    },
    GET_WORK_SCHEDULE: {
        method: 'GET',
        url: '/:companyId/work-schedule',
    },
    GET_WORK_SCHEDULE_BY_ID: {
        method: 'GET',
        url: '/:companyId/work-schedule/:workScheduleId',
    },
    CREATE_WORK_SCHEDULE: {
        method: 'POST',
        url: '/:companyId/work-schedule',
    },
    SYNC_ASSIGNEES_WORK_SCHEDULE: {
        method: 'PATCH',
        url: '/:companyId/work-schedule/sync-assignees',
    },
    UPDATE_WORK_SCHEDULE: {
        method: 'PATCH',
        url: '/:companyId/work-schedule/:workScheduleId',
    },
    DELETE_WORK_SCHEDULE: {
        method: 'DELETE',
        url: '/:companyId/work-schedule/:workScheduleId',
    },
    GET_WORK_SCHEDULE_DEFAULT: {
        method: 'GET',
        url: '/:companyId/work-schedule/default',
    },
    UPDATE_WORK_SCHEDULE_DEFAULT: {
        method: 'PATCH',
        url: '/:companyId/work-schedule/:workScheduleId/mark-as-default',
    },
    UNPUBLISHED_WORK_SCHEDULE: {
        method: 'PUT',
        url: '/:companyId/work-schedule/:workScheduleId/unpublish',
    },
    PUBLISHED_WORK_SCHEDULE: {
        method: 'PUT',
        url: '/:companyId/work-schedule/:workScheduleId/publish',
    },
    EXPIRED_WORK_SCHEDULE: {
        method: 'PUT',
        url: '/:companyId/work-schedule/:workScheduleId/expired',
    },
    GET_POLICY: {
        method: 'GET',
        url: '/:companyId/policy',
    },
    CREATE_POLICY: {
        method: 'POST',
        url: '/:companyId/policy',
    },
    UPDATE_POLICY: {
        method: 'PATCH',
        url: '/:companyId/policy',
    },
    CREATE_COMPANY: {
        method: 'POST',
        url: '/company',
    },
    UPDATE_COMPANY: {
        method: 'PATCH',
        url: '/company/:companyId',
    },
    DELETE_COMPANY: {
        method: 'DELETE',
        url: '/company/:companyId',
    },
    GET_COMPANY: {
        method: 'GET',
        url: '/company/:companyId',
    },
    GET_ALL_ACTIVITIES: {
        method: 'GET',
        url: '/:companyId/activity',
    },
    CREATE_NEW_ACTIVITY: {
        method: 'POST',
        url: '/:companyId/activity',
    },
    DELETE_MULTIPLE_ACTIVITIES: {
        method: 'DELETE',
        url: '/:companyId/activity',
    },
    UPDATE_ACTIVITY: {
        method: 'PATCH',
        url: '/:companyId/activity/:activityId',
    },
    GET_ACTIVITY_DETAIL: {
        method: 'GET',
        url: '/:companyId/activity/:activityId',
    },
    GET_ALL_ACTIVITY_OF_GROUPS: {
        method: 'GET',
        url: '/:companyId/activity/groups',
    },
    GET_ALL_ACTIVITY_GROUP_ASSIGNEE: {
        method: 'GET',
        url: ':companyId/activity/:activityId/group-assignees',
    },
    GET_ALL_ACTIVITY_ESS: {
        method: 'GET',
        url: ':companyId/activity-group/:employeeId/activity-ess',
    },
    CREATE_GROUP: {
        method: 'POST',
        url: ':companyId/group',
    },
    GET_GROUP_MANAGERS: {
        method: 'GET',
        url: ':companyId/group/:groupId/managers',
    },
    GET_GROUP_MEMBERS: {
        method: 'GET',
        url: ':companyId/group/:groupId/members',
    },
    GET_GROUP: {
        method: 'GET',
        url: ':companyId/group/:groupId',
    },
    GET_ALL_GROUPS: {
        method: 'GET',
        url: ':companyId/group',
    },
    ADD_GROUP_MEMBERS: {
        method: 'PATCH',
        url: ':companyId/group/:groupId/members/add',
    },
    REMOVE_GROUP_MEMBERS: {
        method: 'PATCH',
        url: ':companyId/group/:groupId/members/remove',
    },
    MOVE_MEMBERS_TO_GROUP: {
        method: 'PATCH',
        url: ':companyId/group/members/move',
    },
    ASSIGN_WORK_SCHEDULE_TO_GROUP: {
        method: 'PATCH',
        url: ':companyId/group/:groupId/work-schedule/:workScheduleId/assign',
    },
    ASSIGN_WORK_SCHEDULE_TO_GROUPS: {
        method: 'PATCH',
        url: ':companyId/group/work-schedule/:workScheduleId/assign',
    },
    UNASSIGN_WORK_SCHEDULE_OF_GROUP: {
        method: 'PATCH',
        url: ':companyId/group/:groupId/work-schedule/unassign',
    },
    UNASSIGN_WORK_SCHEDULE_OF_GROUPS: {
        method: 'PATCH',
        url: ':companyId/group/work-schedule/unassign',
    },
    ASSIGN_HOLIDAY_TO_GROUP: {
        method: 'PATCH',
        url: ':companyId/group/:groupId/holiday-policy/:holidayId/assign',
    },
    UNASSIGN_HOLIDAY_OF_GROUP: {
        method: 'PATCH',
        url: ':companyId/group/:groupId/holiday-policy/unassign',
    },
    ASSIGN_ACTIVITY_TO_GROUP: {
        method: 'PATCH',
        url: ':companyId/group/:groupId/activities/assign',
    },
    UNASSIGN_ACTIVITY_OF_GROUP: {
        method: 'PATCH',
        url: ':companyId/group/:groupId/activities/unassign',
    },
    ASSIGN_ACTIVITY_TO_GROUPS: {
        method: 'PATCH',
        url: ':companyId/group/:activityId/groups/assign',
    },
    UNASSIGN_ACTIVITY_TO_GROUPS: {
        method: 'PATCH',
        url: ':companyId/group/:activityId/groups/unassign',
    },
    UPDATE_GROUP_SETTING: {
        method: 'PATCH',
        url: ':companyId/group/:groupId',
    },
    DELETE_GROUP: {
        method: 'DELETE',
        url: ':companyId/group/:groupId',
    },
    DELETE_GROUPS: {
        method: 'DELETE',
        url: ':companyId/group',
    },
    CREATE_EMPLOYEE: {
        method: 'POST',
        url: 'auth/sign-up/:companyId',
    },
    CREATE_MANY_EMPLOYEES: {
        method: 'POST',
        url: 'auth/sign-up-many/:companyId',
    },
    GET_ALL_EMPLOYEES: {
        method: 'GET',
        url: ':companyId/employee',
    },
    GET_EMPLOYEE: {
        method: 'GET',
        url: ':companyId/employee/:employeeId',
    },
    GET_EMPLOYEE_CLOCK_INFO: {
        method: 'GET',
        url: ':companyId/employee/clock-info',
    },
    GET_EMPLOYEE_CLOCK_INFO_WITH_EMPLOYEE_ID_PARAMS: {
        method: 'GET',
        url: ':companyId/employee/clock-info/:employeeId',
    },
    ASSIGN_WORK_SCHEDULE_TO_EMPLOYEES: {
        method: 'PATCH',
        url: ':companyId/employee/work-schedule/:workScheduleId/assign',
    },
    UNASSIGN_WORK_SCHEDULE_FROM_EMPLOYEES: {
        method: 'PATCH',
        url: ':companyId/employee/work-schedule/unassign',
    },
    CHANGE_ROLE_EMPLOYEE: {
        method: 'PATCH',
        url: ':companyId/employee/role/change',
    },
    UPDATE_AVATAR_EMPLOYEE: {
        method: 'PATCH',
        url: ':companyId/employee/:employeeId/avatar',
    },
    UPDATE_EMPLOYEE_PROFILE: {
        method: 'PATCH',
        url: ':companyId/employee/:employeeId',
    },
    DELETE_EMPLOYEES: {
        method: 'DELETE',
        url: ':companyId/employee',
    },
    DELETE_EMPLOYEE: {
        method: 'DELETE',
        url: ':companyId/employee/:employeeId',
    },
    CREATE_EMPLOYEE_ADMIN: {
        method: 'POST',
        url: ':companyId/employee/admin',
    },
    GET_HOUR_ENTRY: {
        method: 'GET',
        url: ':companyId/hour-entry/employee/:employeeId',
    },
    CREATE_HOUR_ENTRY: {
        method: 'POST',
        url: ':companyId/hour-entry',
    },
    DELETE_HOUR_ENTRY: {
        method: 'DELETE',
        url: ':companyId/hour-entry/:hourEntryId',
    },
    UPDATE_HOUR_ENTRY: {
        method: 'PATCH',
        url: ':companyId/hour-entry/:hourEntryId',
    },
    CREATE_TIME_ENTRY: {
        method: 'POST',
        url: '/:companyId/time-entries',
    },
    GET_WEEKLY_SUMMARY_OF_USER: {
        method: 'GET',
        url: '/:companyId/time-entries/weekly-summary/employee/:employeeId',
    },
    GET_SUMMARIZE_TIME_ENTRY_IN_DATE: {
        method: 'GET',
        url: '/:companyId/time-entries/detail/summarize-in-date/employee/:employeeId',
    },
    GET_LIST_TIME_ENTRY_IN_DATE: {
        method: 'GET',
        url: '/:companyId/time-entries/detail/list-time-entries/employee/:employeeId',
    },
    GET_TIME_ENTRY_DETAIL: {
        method: 'GET',
        url: '/:companyId/time-entries/detail/employee/:employeeId',
    },
    GET_TIME_ENTRY_OVERVIEW: {
        method: 'GET',
        url: '/:companyId/time-entries/overview',
    },
    GET_TOTAL_CLOCK_IN_DATE: {
        method: 'GET',
        url: '/:companyId/time-entries/total-clock-in/date/employee/:employeeId',
    },
    GET_TIME_ENTRY_OVERVIEW_EMPLOYEE: {
        method: 'GET',
        url: '/:companyId/time-entries/overview/employee/:employeeId',
    },
    GET_TIME_ENTRY_OVERVIEW_SUMMARIZE: {
        method: 'GET',
        url: '/:companyId/time-entries/overview-summarize',
    },
    GET_LAST_ACTIVITY_OF_USER: {
        method: 'GET',
        url: '/:companyId/time-entries/last-activity/:employeeId',
    },
    DELETE_TIME_ENTRY: {
        method: 'DELETE',
        url: '/:companyId/time-entries',
    },
    UPDATE_TIME_ENTRY: {
        method: 'PATCH',
        url: '/:companyId/time-entries',
    },
    GET_EXCEL_FILE: {
        method: 'GET',
        url: '/:companyId/time-entries/export-excel',
    },
    GET_PROJECT: {
        method: 'GET',
        url: '/project',
    },
    GET_COUNT_TRACK_TIME: {
        method: 'GET',
        url: '/:companyId/time-entries/count',
    },
    GET_TIME_SHEETS_DETAIL: {
        method: 'GET',
        url: '/:companyId/time-entries/time-sheet/employee/:employeeId',
    },
    GET_TIME_SHEETS_OVERVIEW: {
        method: 'GET',
        url: '/:companyId/time-entries/time-sheet',
    },
    CREATE_COMPANY_API_KEY: {
        method: 'POST',
        url: '/company-api-key',
    },
    GET_TRACKER_HOUR_DASHBOARD_BY_COMPANY: {
        method: 'GET',
        url: '/:companyId/dashboard/tracked-hours',
    },
    GET_PROJECT_TIME_TRACKED: {
        method: 'GET',
        url: '/:companyId/dashboard/project',
    },
    GET_ACTIVITY_TIME_TRACKED: {
        method: 'GET',
        url: '/:companyId/dashboard/activity',
    },
    SYNC_REMOVAL_TT_COMPANY: {
        method: 'DELETE',
        url: '/company/:companyId/sync-removal-company',
    },
    SYNC_WORK_SCHEDULE_ASSIGNMENTS: {
        method: 'POST',
        url: '/:companyId/work-schedule-assignment/sync',
    },
    STREAM_PROJECT_IMAGE: {
        method: 'GET',
        url: '/file/projects3/:keyEncode',
    },
    STREAM_COMPANY_IMAGE: {
        method: 'GET',
        url: '/file/companys3/:keyEncode',
    },
};
//# sourceMappingURL=api-url.constants.js.map
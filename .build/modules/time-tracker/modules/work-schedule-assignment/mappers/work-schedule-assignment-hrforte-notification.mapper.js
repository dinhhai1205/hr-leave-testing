"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkScheduleAssignmentHrforteNotificationMapper = void 0;
const enums_1 = require("../../../../../common/enums");
class WorkScheduleAssignmentHrforteNotificationMapper {
    static toParams(params) {
        const { actorEmail, clientUrl, workScheduleId, employees, dateFrom, dateTo, verb } = params;
        const moduleId = enums_1.EMainModuleNumber['WORK_SCHEDULE'];
        const commonHrfNotificationParams = {
            moduleId,
            moduleName: enums_1.EMainModule.WORK_SCHEDULE,
            verb,
            actorEmail,
        };
        const recordUrl = `${clientUrl}/e-smart-time/work-schedule-assignment`;
        const hrfNotificationParams = [];
        for (const employee of employees) {
            const remainHrfNotificationParams = {
                dateFrom,
                dateTo,
                recordNumber: `0`,
                recordUrl,
                recordKey: workScheduleId,
                audienceEmail: employee.email,
            };
            hrfNotificationParams.push({
                ...commonHrfNotificationParams,
                ...remainHrfNotificationParams,
            });
        }
        return hrfNotificationParams;
    }
}
exports.WorkScheduleAssignmentHrforteNotificationMapper = WorkScheduleAssignmentHrforteNotificationMapper;
//# sourceMappingURL=work-schedule-assignment-hrforte-notification.mapper.js.map
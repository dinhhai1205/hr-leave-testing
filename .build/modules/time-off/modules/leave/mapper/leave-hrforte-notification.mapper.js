"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveHrforteNotificationMapper = void 0;
const moment = require("moment");
const enums_1 = require("../../../../../common/enums");
const utils_1 = require("../../../../../common/utils");
class LeaveHrforteNotificationMapper {
    static toParams(approvalAction, authEmail, leaveRecords, clientUrl) {
        const hrfNotificationParams = [];
        const moduleId = enums_1.EMainModuleNumber['LEAVE'];
        const commonHrfNotificationParams = {
            moduleId,
            moduleName: 'leave',
            verb: this.getVerbNotification(approvalAction),
            actorEmail: authEmail,
        };
        const modulePath = approvalAction === 'submit' ? `approval/leave` : 'leave';
        for (const record of leaveRecords) {
            const { id: leaveId, leaveNo, dateFrom, dateTo, statusId = undefined, approverTrx = [], createdBy = undefined, } = record;
            const hasNoEmptyValue = !(0, utils_1.hasUndefinedOrNullObj)({
                leaveId,
                leaveNo,
                dateFrom,
                dateTo,
                statusId,
            });
            if (!hasNoEmptyValue)
                continue;
            const remainHrfNotificationParams = {
                dateFrom: moment.utc(dateFrom).toISOString(),
                dateTo: moment.utc(dateTo).toISOString(),
                recordKey: leaveId,
                recordNumber: `${leaveNo}`,
                recordUrl: `${clientUrl}/${modulePath}/${leaveId}`,
            };
            const audienceEmails = [];
            if (approverTrx.length) {
                const approverRemovedDuplicate = this.removeDuplicateApprover(approverTrx);
                for (const approver of approverRemovedDuplicate) {
                    if (approver?.userEmail) {
                        audienceEmails.push(approver.userEmail);
                    }
                }
            }
            if (createdBy &&
                (approvalAction === 'approve' ||
                    approvalAction === 'decline' ||
                    approvalAction === 'cancel')) {
                audienceEmails.push(createdBy);
            }
            const uniqueAudienceEmails = (0, utils_1.uniqueArray)(audienceEmails);
            for (const audienceEmail of uniqueAudienceEmails) {
                hrfNotificationParams.push({
                    ...commonHrfNotificationParams,
                    ...remainHrfNotificationParams,
                    audienceEmail,
                });
            }
        }
        return hrfNotificationParams;
    }
    static removeDuplicateApprover(approverTrx) {
        return approverTrx.filter((obj, index, self) => {
            return index === self.findIndex(t => t.userEmail === obj.userEmail);
        });
    }
    static getVerbNotification(approvalAction) {
        let verb = `has ${(0, utils_1.addEdSuffix)(approvalAction)}`;
        if (approvalAction === 'submit') {
            verb = `${verb} an approval request`;
        }
        return verb;
    }
}
exports.LeaveHrforteNotificationMapper = LeaveHrforteNotificationMapper;
//# sourceMappingURL=leave-hrforte-notification.mapper.js.map
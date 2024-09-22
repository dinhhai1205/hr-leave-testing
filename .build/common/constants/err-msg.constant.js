"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERR_MSG = void 0;
exports.ERR_MSG = {
    INVALID: (attr) => `Invalid ${attr}`,
    NOT_FOUND: (attr, prop) => `Not found ${attr} with ${prop}`,
    MISSING: (attr) => `${attr} is missing`,
    EMPTY: (attr) => `${attr} is empty`,
    IS_EXIST: (attr) => `${attr} is exist`,
    GOLD_USER_MISSING_EMPLOYEE: (action) => {
        if (!action) {
            return `Gold user is missing employee information.`;
        }
        return `Gold user is missing employee information required to ` + action;
    },
    ACCESS_DENIED: "Access Denied. You dont't have permission",
    INVALID_JWT: 'Invalid jwt',
    LEAVE_ATTACHMENT: {
        SIZE_EXCEEDS: (size, unit = 'MB') => {
            return `Total file size exceeds ${size} ${unit}!`;
        },
    },
    LEAVE: {
        MISSING_EMPLOYEE_WHEN_CREATE: 'Please select an employee when creating a leave record.',
        MISSING_LEAVE_TYPE_WHEN_CREATE: 'Please select a type when creating a leave record.',
        EXCEED_BALANCE_WHEN_APPROVE: 'Oops! Some records that you approved have exceeded leave type balance',
        NOT_ALLOW_UPDATE_LEAVE_IS_NOT_DRAFT: "Can't update a leave record that does not have the status equal to 'draft.'",
        NOT_OWN_LEAVE_RECORD: 'Sorry, you do not own this leave record.',
        DISALLOW_EMPLOYEE_CANCEL_PASS_LEAVE_DATE: 'Leave cancellation is not allowed after the leave date has passed. Please contact your admin to cancel it.',
        CANCELLATION_MISSING_REMARK: 'Please input the reason to cancel the leave',
    },
    LEAVE_TYPE: {
        DEFAULT: 'leaveType Forbidden',
        DATE_FROM_TO_ERROR: 'Oops! Leave application date is outside the allowed range. Please contact your administrator for the valid date range.',
        ALLOW_FUTURE_ERROR: 'Apologies, applying leave in the future is not allowed for this leave type. Please select a date that is not in the future.',
        ALLOW_PAST_ERROR: 'Oops! Applying leave for past dates is not possible. Please choose a current or future date.',
        HALF_DAY_ERROR: 'Sorry, half-day leave is not allowed for this type of leave. Please choose a full-day leave option.',
        MAX_EFFECT_DAYS_ERROR: 'Sorry, the maximum number of days for this type of leave has been exceeded. Please reduce the number of days in your leave application.',
        EXCEED_BALANCE_ERROR: 'Oops! This leave type does not allow users to apply leave that exceeds their available balance. Please make sure your leave application does not exceed your balance.',
        DUPLICATE_DATE_ERROR: 'Oops! Some of the dates in the selected range are already used for another leave record. Please choose different dates for your leave application.',
        MAX_CON_DAY_ERROR: 'Oops! The maximum consecutive days of leave allowed has been reached. Please adjust your leave application accordingly.',
        SPECIAL_TYPE_ERROR: 'Special Leave Type cannot be deleted',
        EXIST_LEAVE_RECORDS: 'This change cannot be saved as there are leave record(s) depending on this leave type.',
    },
    LEAVE_TYPE_ASSIGNMENT: {
        EMPLOYEE_ERROR: 'Oops! This leave type is only applicable to certain groups of employees, and unfortunately, you or the employee associated with this leave are not eligible to apply for this leave type.',
        GENDER_ERROR: "Oops! The employee's gender does not meet the conditions set for this leave type assignment.",
        JOBGRADE_ERROR: "Oops! The employee's job grade does not meet the conditions set for this leave type assignment.",
        ORGELE_ERROR: "Oops! The employee's organization element does not meet the conditions set for this leave type assignment.",
        CONTRACT_TYPE_ERROR: "Oops! The employee's contract type does not meet the conditions set for this leave type assignment.",
        MAR_STS_ERROR: "Oops! The employee's marital status does not meet the conditions set for this leave type assignment.",
    },
    LEAVE_TYPE_POLICY: {
        DUPLICATE_EFFECTIVE: 'Oops! The selected value for "Effective After" already exists.',
    },
};
//# sourceMappingURL=err-msg.constant.js.map
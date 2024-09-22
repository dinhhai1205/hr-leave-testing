export declare const ERR_MSG: {
    readonly INVALID: (attr: string) => string;
    readonly NOT_FOUND: (attr: string, prop: any) => string;
    readonly MISSING: (attr: string) => string;
    readonly EMPTY: (attr: string) => string;
    readonly IS_EXIST: (attr: string) => string;
    readonly GOLD_USER_MISSING_EMPLOYEE: (action?: string) => string;
    readonly ACCESS_DENIED: "Access Denied. You dont't have permission";
    readonly INVALID_JWT: "Invalid jwt";
    readonly LEAVE_ATTACHMENT: {
        readonly SIZE_EXCEEDS: (size: number, unit?: "KB" | "MB" | "GB") => string;
    };
    readonly LEAVE: {
        readonly MISSING_EMPLOYEE_WHEN_CREATE: "Please select an employee when creating a leave record.";
        readonly MISSING_LEAVE_TYPE_WHEN_CREATE: "Please select a type when creating a leave record.";
        readonly EXCEED_BALANCE_WHEN_APPROVE: "Oops! Some records that you approved have exceeded leave type balance";
        readonly NOT_ALLOW_UPDATE_LEAVE_IS_NOT_DRAFT: "Can't update a leave record that does not have the status equal to 'draft.'";
        readonly NOT_OWN_LEAVE_RECORD: "Sorry, you do not own this leave record.";
        readonly DISALLOW_EMPLOYEE_CANCEL_PASS_LEAVE_DATE: "Leave cancellation is not allowed after the leave date has passed. Please contact your admin to cancel it.";
        readonly CANCELLATION_MISSING_REMARK: "Please input the reason to cancel the leave";
    };
    readonly LEAVE_TYPE: {
        readonly DEFAULT: "leaveType Forbidden";
        readonly DATE_FROM_TO_ERROR: "Oops! Leave application date is outside the allowed range. Please contact your administrator for the valid date range.";
        readonly ALLOW_FUTURE_ERROR: "Apologies, applying leave in the future is not allowed for this leave type. Please select a date that is not in the future.";
        readonly ALLOW_PAST_ERROR: "Oops! Applying leave for past dates is not possible. Please choose a current or future date.";
        readonly HALF_DAY_ERROR: "Sorry, half-day leave is not allowed for this type of leave. Please choose a full-day leave option.";
        readonly MAX_EFFECT_DAYS_ERROR: "Sorry, the maximum number of days for this type of leave has been exceeded. Please reduce the number of days in your leave application.";
        readonly EXCEED_BALANCE_ERROR: "Oops! This leave type does not allow users to apply leave that exceeds their available balance. Please make sure your leave application does not exceed your balance.";
        readonly DUPLICATE_DATE_ERROR: "Oops! Some of the dates in the selected range are already used for another leave record. Please choose different dates for your leave application.";
        readonly MAX_CON_DAY_ERROR: "Oops! The maximum consecutive days of leave allowed has been reached. Please adjust your leave application accordingly.";
        readonly SPECIAL_TYPE_ERROR: "Special Leave Type cannot be deleted";
        readonly EXIST_LEAVE_RECORDS: "This change cannot be saved as there are leave record(s) depending on this leave type.";
    };
    readonly LEAVE_TYPE_ASSIGNMENT: {
        readonly EMPLOYEE_ERROR: "Oops! This leave type is only applicable to certain groups of employees, and unfortunately, you or the employee associated with this leave are not eligible to apply for this leave type.";
        readonly GENDER_ERROR: "Oops! The employee's gender does not meet the conditions set for this leave type assignment.";
        readonly JOBGRADE_ERROR: "Oops! The employee's job grade does not meet the conditions set for this leave type assignment.";
        readonly ORGELE_ERROR: "Oops! The employee's organization element does not meet the conditions set for this leave type assignment.";
        readonly CONTRACT_TYPE_ERROR: "Oops! The employee's contract type does not meet the conditions set for this leave type assignment.";
        readonly MAR_STS_ERROR: "Oops! The employee's marital status does not meet the conditions set for this leave type assignment.";
    };
    readonly LEAVE_TYPE_POLICY: {
        readonly DUPLICATE_EFFECTIVE: "Oops! The selected value for \"Effective After\" already exists.";
    };
};

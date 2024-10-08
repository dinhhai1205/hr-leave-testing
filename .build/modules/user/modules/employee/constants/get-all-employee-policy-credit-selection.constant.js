"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ALL_EMPLOYEES_POLICY_CREDIT_SELECTION = void 0;
const GET_ALL_EMPLOYEES_POLICY_CREDIT_SELECTION = ({ employeeAlias, leaveTypeAlias, balanceAlias, policyAlias, policyCreditAlias, aspUserAlias, creditTrxAlias, }) => {
    return [
        `${employeeAlias}.id`,
        `${employeeAlias}.companyId`,
        `${employeeAlias}.joinDate`,
        `${employeeAlias}.confirmDate`,
        `${employeeAlias}.seniorityDate`,
        `${employeeAlias}.employeeRef`,
        `${employeeAlias}.contractDateFrom`,
        `${aspUserAlias}.id`,
        `${aspUserAlias}.utcOffset`,
        `${leaveTypeAlias}.id`,
        `${leaveTypeAlias}.cfRoundTo`,
        `${balanceAlias}.id`,
        `${balanceAlias}.companyId`,
        `${balanceAlias}.employeeId`,
        `${balanceAlias}.leaveTypeId`,
        `${balanceAlias}.balance`,
        `${policyAlias}.id`,
        `${policyAlias}.companyId`,
        `${policyAlias}.ltId`,
        `${policyAlias}.entitlement`,
        `${policyAlias}.effAfterUnit`,
        `${policyAlias}.effAfterUOM`,
        `${policyAlias}.effAfterType`,
        `${policyAlias}.prorateEntitlement`,
        `${policyAlias}.prorateUnit`,
        `${policyAlias}.creditOnDay`,
        `${policyAlias}.renewYearly`,
        `${policyAlias}.renewType`,
        `${policyAlias}.renewOnDay`,
        `${policyAlias}.renewOnMonth`,
        `${policyAlias}.cfUnit`,
        `${policyAlias}.cfType`,
        `${policyAlias}.cfLtId`,
        `${policyAlias}.expireType`,
        `${policyAlias}.expireInDays`,
        `${policyAlias}.expireInFrom`,
        `${policyAlias}.expireOnDay`,
        `${policyAlias}.expireOnMonth`,
        `${policyCreditAlias}.id`,
        `${policyCreditAlias}.uuid`,
        `${policyCreditAlias}.leaveTypeId`,
        `${policyCreditAlias}.leavePolicyId`,
        `${policyCreditAlias}.employeeId`,
        `${policyCreditAlias}.companyId`,
        `${policyCreditAlias}.credit`,
        `${policyCreditAlias}.creditRemaining`,
        `${policyCreditAlias}.creditedOn`,
        `${policyCreditAlias}.carryForward`,
        `${policyCreditAlias}.carryForwardRemaining`,
        `${policyCreditAlias}.carryForwardOn`,
        `${policyCreditAlias}.carryToLtId`,
        `${policyCreditAlias}.expiresOn`,
        `${creditTrxAlias}.id`,
        `${creditTrxAlias}.type`,
        `${creditTrxAlias}.sign`,
        `${creditTrxAlias}.unit`,
        `${creditTrxAlias}.currentPolicySetting`,
        `${creditTrxAlias}.leaveTypePolicyCreditUUID`,
    ];
};
exports.GET_ALL_EMPLOYEES_POLICY_CREDIT_SELECTION = GET_ALL_EMPLOYEES_POLICY_CREDIT_SELECTION;
//# sourceMappingURL=get-all-employee-policy-credit-selection.constant.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPolicyCarryForwardType = exports.EPolicyEffectiveUOM = exports.EPolicyEffectiveType = void 0;
var EPolicyEffectiveType;
(function (EPolicyEffectiveType) {
    EPolicyEffectiveType["JOINING_DATE"] = "J";
    EPolicyEffectiveType["CONFIRMATION_DATE"] = "C";
    EPolicyEffectiveType["SENIORITY_DATE"] = "S";
})(EPolicyEffectiveType || (exports.EPolicyEffectiveType = EPolicyEffectiveType = {}));
var EPolicyEffectiveUOM;
(function (EPolicyEffectiveUOM) {
    EPolicyEffectiveUOM[EPolicyEffectiveUOM["DAY"] = 1] = "DAY";
    EPolicyEffectiveUOM[EPolicyEffectiveUOM["MONTH"] = 2] = "MONTH";
    EPolicyEffectiveUOM[EPolicyEffectiveUOM["YEAR"] = 3] = "YEAR";
})(EPolicyEffectiveUOM || (exports.EPolicyEffectiveUOM = EPolicyEffectiveUOM = {}));
var EPolicyCarryForwardType;
(function (EPolicyCarryForwardType) {
    EPolicyCarryForwardType["ALL"] = "A";
    EPolicyCarryForwardType["NONE"] = "N";
    EPolicyCarryForwardType["PERCENTAGE"] = "P";
    EPolicyCarryForwardType["DAYS"] = "D";
})(EPolicyCarryForwardType || (exports.EPolicyCarryForwardType = EPolicyCarryForwardType = {}));
//# sourceMappingURL=leave-type-policy.enum.js.map
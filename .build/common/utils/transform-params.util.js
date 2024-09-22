"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformToBoolean = exports.transformToArrayNumber = exports.transformToNumber = void 0;
const transformToNumber = (params) => {
    const { value = undefined } = params;
    const castValToNumber = Number(value);
    return isNaN(castValToNumber) ? undefined : castValToNumber;
};
exports.transformToNumber = transformToNumber;
const transformToArrayNumber = (params) => {
    const { value = undefined } = params;
    if (!value)
        return undefined;
    const originArr = value;
    const uniqueArr = new Set();
    for (const element of originArr) {
        const castToNumber = Number(element);
        if (!isNaN(castToNumber)) {
            uniqueArr.add(castToNumber);
        }
    }
    return Array.from(uniqueArr);
};
exports.transformToArrayNumber = transformToArrayNumber;
const transformToBoolean = (params) => {
    const { value = undefined } = params;
    if (value === undefined || value === null)
        return undefined;
    if (value && value === 'false')
        return false;
    return Boolean(value);
};
exports.transformToBoolean = transformToBoolean;
//# sourceMappingURL=transform-params.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToBoolean = void 0;
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants");
const stringToBoolean = (value) => {
    if ((0, class_validator_1.isEmpty)(value))
        return value;
    return value === constants_1.BOOL.TRUE;
};
exports.stringToBoolean = stringToBoolean;
//# sourceMappingURL=string-to-boolean.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformStringToNumber = TransformStringToNumber;
const class_transformer_1 = require("class-transformer");
const utils_1 = require("../../utils");
function TransformStringToNumber(opts = {}) {
    return (0, class_transformer_1.Transform)(({ value }) => (0, utils_1.stringToNumber)(value, opts));
}
//# sourceMappingURL=transform-string-to-number.decorator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformStringToBoolean = TransformStringToBoolean;
const class_transformer_1 = require("class-transformer");
const utils_1 = require("../../utils");
function TransformStringToBoolean() {
    return (0, class_transformer_1.Transform)(({ value }) => (0, utils_1.stringToBoolean)(value));
}
//# sourceMappingURL=transform-string-to-boolean.decorator.js.map
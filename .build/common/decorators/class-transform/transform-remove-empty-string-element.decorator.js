"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformRemoveEmptyStringElement = TransformRemoveEmptyStringElement;
const class_transformer_1 = require("class-transformer");
const utils_1 = require("../../utils");
function TransformRemoveEmptyStringElement() {
    return (0, class_transformer_1.Transform)(({ value = [] }) => {
        if (!value.length)
            return [];
        const uniqueArr = (0, utils_1.uniqueArray)(value);
        const transforms = [];
        for (const val of uniqueArr) {
            if (!val)
                continue;
            transforms.push(val);
        }
        return transforms;
    });
}
//# sourceMappingURL=transform-remove-empty-string-element.decorator.js.map
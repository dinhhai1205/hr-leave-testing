"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformArrayStringToNumbers = TransformArrayStringToNumbers;
const class_transformer_1 = require("class-transformer");
function TransformArrayStringToNumbers() {
    return (0, class_transformer_1.Transform)(({ value = [] }) => {
        if (!value.length)
            return [];
        const originArr = value;
        const uniqueArr = new Set();
        for (const val of originArr) {
            if (!val)
                continue;
            const num = Number(val);
            if (Number.isNaN(num))
                continue;
            uniqueArr.add(num);
        }
        return Array.from(uniqueArr);
    });
}
//# sourceMappingURL=transform-array-string-to-numbers.decorator.js.map
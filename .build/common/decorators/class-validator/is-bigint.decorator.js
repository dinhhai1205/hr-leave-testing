"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsHrforteId = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const IsHrforteId = (opts = { nullable: false }) => {
    const { nullable } = opts;
    const decorators = [];
    if (nullable) {
        decorators.push((0, class_validator_1.IsOptional)());
    }
    return (0, common_1.applyDecorators)(...decorators, (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.IsPositive)());
};
exports.IsHrforteId = IsHrforteId;
//# sourceMappingURL=is-bigint.decorator.js.map
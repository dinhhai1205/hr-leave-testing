"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiBodyArray = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiBodyArray = (dataDto) => (0, common_1.applyDecorators)((0, swagger_1.ApiBody)({
    isArray: true,
    type: dataDto,
}));
exports.ApiBodyArray = ApiBodyArray;
//# sourceMappingURL=api-body-array.decorator.js.map
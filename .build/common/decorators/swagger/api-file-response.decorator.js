"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFileResponse = ApiFileResponse;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function ApiFileResponse() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiResponse)({
        status: 200,
        content: { 'application/octet-stream': {} },
    }));
}
//# sourceMappingURL=api-file-response.decorator.js.map
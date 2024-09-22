"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiBearerAuthSwagger = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_bearer_auth_key_constant_1 = require("../../constants/api-bearer-auth-key.constant");
const ApiBearerAuthSwagger = () => (0, common_1.applyDecorators)((0, swagger_1.ApiBearerAuth)(api_bearer_auth_key_constant_1.API_BEARER_AUTH_KEY));
exports.ApiBearerAuthSwagger = ApiBearerAuthSwagger;
//# sourceMappingURL=api-bearer-auth-swagger.decorator.js.map
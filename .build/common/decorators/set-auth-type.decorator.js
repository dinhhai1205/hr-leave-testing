"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthType = exports.AUTH_TYPE = void 0;
const common_1 = require("@nestjs/common");
exports.AUTH_TYPE = 'auth_type';
const AuthType = (authState) => (0, common_1.SetMetadata)(exports.AUTH_TYPE, authState);
exports.AuthType = AuthType;
//# sourceMappingURL=set-auth-type.decorator.js.map
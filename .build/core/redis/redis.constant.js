"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectRedisCache = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const InjectRedisCache = () => (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER);
exports.InjectRedisCache = InjectRedisCache;
//# sourceMappingURL=redis.constant.js.map
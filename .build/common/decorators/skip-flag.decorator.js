"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipFlag = exports.SKIP_FLAG = void 0;
const common_1 = require("@nestjs/common");
exports.SKIP_FLAG = 'skip_flag';
const SkipFlag = (...flag) => (0, common_1.SetMetadata)(exports.SKIP_FLAG, flag);
exports.SkipFlag = SkipFlag;
//# sourceMappingURL=skip-flag.decorator.js.map
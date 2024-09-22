"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleMode = exports.MODULE_MODE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.MODULE_MODE_KEY = 'moduleMode';
const ModuleMode = (moduleMode) => (0, common_1.SetMetadata)(exports.MODULE_MODE_KEY, moduleMode);
exports.ModuleMode = ModuleMode;
//# sourceMappingURL=module-mode.decorator.js.map
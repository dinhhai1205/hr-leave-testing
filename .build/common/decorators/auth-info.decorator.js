"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthInfo = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../enums");
exports.AuthInfo = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const authInfo = request?.authInfo || {
        authEmail: enums_1.EDefaultEmail.BOT,
        appMode: enums_1.EApiAppMode.ADMIN,
    };
    return authInfo;
});
//# sourceMappingURL=auth-info.decorator.js.map
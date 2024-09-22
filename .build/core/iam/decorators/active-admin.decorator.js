"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveAdmin = void 0;
const common_1 = require("@nestjs/common");
const iam_constant_1 = require("../iam.constant");
exports.ActiveAdmin = (0, common_1.createParamDecorator)((field, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[iam_constant_1.REQUEST_ADMIN_KEY];
    return field ? user?.[field] : user;
});
//# sourceMappingURL=active-admin.decorator.js.map
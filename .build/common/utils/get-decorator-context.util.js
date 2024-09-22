"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecoratorContext = void 0;
const asserts_util_1 = require("./asserts.util");
const getDecoratorContext = (args) => {
    if (!args)
        return undefined;
    const { context, key, reflector } = args;
    asserts_util_1.Asserts.objectPropsNotEmpty(args);
    return reflector.getAllAndOverride(key, [
        context.getHandler(),
        context.getClass(),
    ]);
};
exports.getDecoratorContext = getDecoratorContext;
//# sourceMappingURL=get-decorator-context.util.js.map
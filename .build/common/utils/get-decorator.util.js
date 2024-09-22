"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecorator = getDecorator;
function getDecorator(key, context, reflector) {
    return reflector.getAllAndOverride(key, [
        context.getHandler(),
        context.getClass(),
    ]);
}
//# sourceMappingURL=get-decorator.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asserts = void 0;
const common_1 = require("@nestjs/common");
class Asserts {
    static valueNotEmpty(val, opts = {}) {
        if (val === undefined || val === null) {
            const { error = undefined } = opts;
            if (!error) {
                throw new common_1.BadRequestException(`Value is empty.`);
            }
            throw new common_1.HttpException(error.msg, error.statusCode);
        }
    }
    static objectPropsNotEmpty(obj) {
        this.valueNotEmpty(obj);
        const keys = Object.keys(obj);
        for (const key of keys) {
            if (obj[key] === undefined || obj[key] === null) {
                throw new common_1.BadRequestException(`'${key.toString()}' is empty.`);
            }
        }
    }
}
exports.Asserts = Asserts;
//# sourceMappingURL=asserts.util.js.map
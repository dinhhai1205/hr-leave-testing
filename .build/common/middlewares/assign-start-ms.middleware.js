"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignStartMsMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const iam_1 = require("../../core/iam");
const utils_1 = require("../utils");
let AssignStartMsMiddleware = class AssignStartMsMiddleware {
    use(req, res, next) {
        const startMs = Date.now();
        const bearer = (0, utils_1.extractTokenFromHeader)(req);
        let jwtDecoded = bearer ? (0, jsonwebtoken_1.decode)(bearer) : '(empty)';
        if (jwtDecoded && typeof jwtDecoded !== 'string') {
            jwtDecoded = {
                sub: jwtDecoded?.sub,
                utcOffset: jwtDecoded?.[iam_1.JWT_PAYLOAD_USER_UTC_OFFSET_KEY],
                ranking: jwtDecoded?.[iam_1.JWT_PAYLOAD_USER_RANKING_KEY],
                exp: new Date((jwtDecoded?.exp ?? 0) * 1000),
            };
        }
        Object.assign(req, {
            [iam_1.REQ_CURRENT_CONTEXT_KEY]: { jwtDecoded },
            startMs,
            authInfo: {},
        });
        next();
    }
};
exports.AssignStartMsMiddleware = AssignStartMsMiddleware;
exports.AssignStartMsMiddleware = AssignStartMsMiddleware = __decorate([
    (0, common_1.Injectable)()
], AssignStartMsMiddleware);
//# sourceMappingURL=assign-start-ms.middleware.js.map
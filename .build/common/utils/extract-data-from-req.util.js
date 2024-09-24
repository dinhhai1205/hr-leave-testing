"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDataFromReq = extractDataFromReq;
exports.extractApiLogObj = extractApiLogObj;
const iam_1 = require("../../core/iam");
const safe_json_parse_util_1 = require("./safe-json-parse.util");
const safe_stringify_util_1 = require("./safe-stringify.util");
function extractDataFromReq(req) {
    const { ip, socket, originalUrl, method, body, headers, params } = req;
    const ipAddress = ip || socket.remoteAddress || undefined;
    const userAgent = headers['user-agent'] || undefined;
    const empty = '';
    const currentContext = req[iam_1.REQ_CURRENT_CONTEXT_KEY];
    const authInfo = (0, safe_stringify_util_1.safeStringify)({
        authInfo: req['authInfo'] || empty,
        activeUserData: req[iam_1.REQUEST_USER_KEY] || empty,
        activeEssData: req[iam_1.REQUEST_ESS_KEY] || empty,
        activeAdminData: req[iam_1.REQUEST_ADMIN_KEY] || empty,
    });
    return {
        method,
        url: originalUrl,
        body: JSON.stringify(body || ''),
        companyId: params?.companyId,
        userEmail: req?.authInfo?.authEmail,
        authInfo,
        currentContext: (0, safe_stringify_util_1.safeStringify)(currentContext),
        ipAddress,
        userAgent,
    };
}
function extractApiLogObj(obj, params) {
    return (0, safe_stringify_util_1.safeStringify)({
        method: obj.method,
        url: obj.url,
        statusCode: params.statusCode,
        statusMessage: params.statusMessage,
        timeMs: params.timeMs,
        body: obj.body,
        currentContext: (0, safe_json_parse_util_1.safeJsonParse)({
            text: obj.currentContext,
            defaultValueReturn: '',
        }),
    });
}
//# sourceMappingURL=extract-data-from-req.util.js.map
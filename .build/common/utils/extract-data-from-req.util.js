"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDataFromReq = extractDataFromReq;
exports.extractApiLogObj = extractApiLogObj;
const jsonwebtoken_1 = require("jsonwebtoken");
const database_1 = require("../../core/database");
const iam_1 = require("../../core/iam");
const extract_token_from_header_util_1 = require("./extract-token-from-header.util");
function stringifyObject(obj) {
    if (!obj)
        return '';
    return JSON.stringify(obj);
}
function extractDataFromReq(req) {
    const { ip, socket, originalUrl, method, body, headers, params } = req;
    const ipAddress = ip || socket.remoteAddress || undefined;
    const userAgent = headers['user-agent'] || undefined;
    const empty = '(empty)';
    const bearer = (0, extract_token_from_header_util_1.extractTokenFromHeader)(req);
    const jwtStrPayload = (bearer ? stringifyObject((0, jsonwebtoken_1.decode)(bearer)) : empty)
        .replace(iam_1.JWT_PAYLOAD_USER_RANKING_KEY, 'ranking')
        .replace(iam_1.JWT_PAYLOAD_USER_UTC_OFFSET_KEY, 'utcOffset');
    const currentContext = (0, database_1.databaseType)() === database_1.EDbSqlType.Postgres
        ? req[iam_1.REQ_CURRENT_CONTEXT_KEY]
        : stringifyObject(req[iam_1.REQ_CURRENT_CONTEXT_KEY]);
    const authInfo = `
- jwtPayload: ${jwtStrPayload}
- authInfo: ${stringifyObject(req['authInfo']) || empty}
- activeUserData: ${stringifyObject(req[iam_1.REQUEST_USER_KEY]) || empty}
- activeEssData: ${stringifyObject(req[iam_1.REQUEST_ESS_KEY]) || empty}
- activeAdminData: ${stringifyObject(req[iam_1.REQUEST_ADMIN_KEY]) || empty}
`.trim();
    return {
        method,
        url: originalUrl,
        body: JSON.stringify(body || ''),
        ipAddress,
        userAgent,
        companyId: params?.companyId,
        userEmail: req?.authInfo?.authEmail,
        authInfo,
        currentContext,
    };
}
function extractApiLogObj(obj, params) {
    return JSON.stringify({
        currentContext: obj.currentContext,
        method: obj.method,
        url: obj.url,
        statusCode: params.statusCode,
        statusMessage: params.statusMessage,
        timeMs: params.timeMs,
        body: obj.body,
    });
}
//# sourceMappingURL=extract-data-from-req.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthType = void 0;
var AuthType;
(function (AuthType) {
    AuthType[AuthType["Bearer"] = 0] = "Bearer";
    AuthType[AuthType["Permission"] = 1] = "Permission";
    AuthType[AuthType["ApiKey"] = 2] = "ApiKey";
    AuthType[AuthType["ZohoWebhook"] = 3] = "ZohoWebhook";
    AuthType[AuthType["None"] = 4] = "None";
    AuthType[AuthType["LegacyBearer"] = 5] = "LegacyBearer";
    AuthType[AuthType["LegacyPermission"] = 6] = "LegacyPermission";
    AuthType[AuthType["SlackBot"] = 7] = "SlackBot";
})(AuthType || (exports.AuthType = AuthType = {}));
//# sourceMappingURL=auth-type.enum.js.map
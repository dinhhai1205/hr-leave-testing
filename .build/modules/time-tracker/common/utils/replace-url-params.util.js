"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceUrlParams = replaceUrlParams;
function replaceUrlParams(urlTemplate, params) {
    let url = urlTemplate;
    Object.keys(params).forEach(key => {
        url = url.replace(`:${key}`, params[key]);
    });
    return url;
}
//# sourceMappingURL=replace-url-params.util.js.map
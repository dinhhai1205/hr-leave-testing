"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceUrlWithParams = void 0;
const replace_url_params_util_1 = require("../../common/utils/replace-url-params.util");
const replaceUrlWithParams = (data, params) => {
    return { ...data, url: (0, replace_url_params_util_1.replaceUrlParams)(data.url, params) };
};
exports.replaceUrlWithParams = replaceUrlWithParams;
//# sourceMappingURL=api.util.js.map
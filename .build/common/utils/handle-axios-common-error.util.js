"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAxiosCommonError = handleAxiosCommonError;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const safe_json_parse_util_1 = require("./safe-json-parse.util");
function handleAxiosCommonError(error, errorFormat) {
    if (error.response) {
        let errorResponseData = error.response.data;
        let errorResponseStatus = error.response.status;
        if (errorResponseData instanceof Buffer) {
            errorResponseData = (0, safe_json_parse_util_1.safeJsonParse)({
                text: errorResponseData.toString(),
                defaultValueReturn: {},
            });
        }
        const { messageKey, statusKey } = errorFormat;
        if ((0, class_validator_1.isObject)(errorResponseData)) {
            if (messageKey && errorResponseData[messageKey]) {
                errorResponseData = errorResponseData[messageKey];
            }
            if (statusKey && errorResponseData[statusKey]) {
                errorResponseStatus = errorResponseData[statusKey];
            }
        }
        if (typeof errorResponseStatus !== 'number') {
            errorResponseStatus =
                Number(errorResponseStatus) | common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
        throw new common_1.HttpException(errorResponseData, errorResponseStatus);
    }
    else if (error.request) {
        throw new common_1.InternalServerErrorException(`Request was made but no response received`);
    }
    throw new common_1.InternalServerErrorException(error.message);
}
//# sourceMappingURL=handle-axios-common-error.util.js.map
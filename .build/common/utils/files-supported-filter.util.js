"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesSupportedFilter = void 0;
const common_1 = require("@nestjs/common");
const filesSupportedFilter = (mimetypeList) => {
    return (req, file, callback) => {
        if (!file?.mimetype || !mimetypeList.includes(file.mimetype)) {
            return callback(new common_1.UnsupportedMediaTypeException(), false);
        }
        callback(null, true);
    };
};
exports.filesSupportedFilter = filesSupportedFilter;
//# sourceMappingURL=files-supported-filter.util.js.map
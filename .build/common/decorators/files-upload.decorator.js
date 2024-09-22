"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesUpload = FilesUpload;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const file_upload_dto_1 = require("../dto/file-upload.dto");
const files_upload_dto_1 = require("../dto/files-upload.dto");
const decrypt_file_interceptor_1 = require("../interceptors/decrypt-file.interceptor");
function FilesUpload(option = { singleUpload: true }) {
    const { singleUpload, summary, multerOptions, maxFileCount, additionBodyDto, decryptFile = true, } = option;
    const fieldName = singleUpload ? 'file' : 'files';
    const appliedFileDecorator = singleUpload
        ? (0, platform_express_1.FileInterceptor)(fieldName, multerOptions)
        : (0, platform_express_1.FilesInterceptor)(fieldName, maxFileCount, multerOptions);
    const decoratorList = [];
    if (decryptFile) {
        decoratorList.push((0, common_1.UseInterceptors)(appliedFileDecorator, decrypt_file_interceptor_1.DecryptFileInterceptor));
    }
    else {
        decoratorList.push((0, common_1.UseInterceptors)(appliedFileDecorator));
    }
    decoratorList.push((0, swagger_1.ApiOperation)({ summary: summary || '' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK }), (0, swagger_1.ApiConsumes)('multipart/form-data'));
    const typeofFileUploadDto = singleUpload ? file_upload_dto_1.FileUploadDto : files_upload_dto_1.FilesUploadDto;
    if (additionBodyDto) {
        decoratorList.push((0, swagger_1.ApiBody)({ type: (0, swagger_1.IntersectionType)(additionBodyDto, typeofFileUploadDto) }));
    }
    else {
        decoratorList.push((0, swagger_1.ApiBody)({ type: (0, swagger_1.IntersectionType)(typeofFileUploadDto) }));
    }
    return (0, common_1.applyDecorators)(...decoratorList);
}
//# sourceMappingURL=files-upload.decorator.js.map
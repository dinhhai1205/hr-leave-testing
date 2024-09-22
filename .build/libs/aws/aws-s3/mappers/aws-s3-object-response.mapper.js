"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3ObjectResponseMapper = void 0;
const path_1 = require("path");
const stream_1 = require("stream");
const content_type_constant_1 = require("../../../../common/constants/content-type.constant");
class AwsS3ObjectResponseMapper {
    static toObjectContent(args) {
        const { fileBuffer, objectKey, contentType } = args;
        const fileName = (0, path_1.basename)(objectKey);
        const fileExt = (0, path_1.extname)(objectKey).slice(1).toUpperCase();
        const type = contentType ||
            content_type_constant_1.CONTENT_TYPE[fileExt] ||
            content_type_constant_1.CONTENT_TYPE.BINARY;
        return {
            name: fileName,
            type,
            buffer: fileBuffer,
            length: fileBuffer.byteLength,
            disposition: `attachment; filename="${fileName}"`,
        };
    }
    static toObjectStreaming(args) {
        const { objectKey, readableStream, contentType, contentLength } = args;
        const passthroughStream = new stream_1.PassThrough();
        readableStream.pipe(passthroughStream);
        const fileName = (0, path_1.basename)(objectKey);
        const fileExt = (0, path_1.extname)(objectKey).slice(1).toUpperCase();
        const type = contentType ||
            content_type_constant_1.CONTENT_TYPE[fileExt] ||
            content_type_constant_1.CONTENT_TYPE.BINARY;
        return {
            passthroughStream,
            name: fileName,
            type,
            length: contentLength || 0,
            disposition: `attachment; filename="${fileName}"`,
        };
    }
}
exports.AwsS3ObjectResponseMapper = AwsS3ObjectResponseMapper;
//# sourceMappingURL=aws-s3-object-response.mapper.js.map
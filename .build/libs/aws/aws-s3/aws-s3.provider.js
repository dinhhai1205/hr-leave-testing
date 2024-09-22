"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAwsS3Provider = createAwsS3Provider;
const aws_s3_options_key_constant_1 = require("./constants/aws-s3-options-key.constant");
function createAwsS3Provider(options) {
    return [{ provide: aws_s3_options_key_constant_1.AWS_S3_OPTIONS_KEY, useValue: options || {} }];
}
//# sourceMappingURL=aws-s3.provider.js.map
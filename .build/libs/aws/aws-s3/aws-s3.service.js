"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("../../../config");
const aws_config_1 = require("../../../config/aws.config");
const aws_s3_options_key_constant_1 = require("./constants/aws-s3-options-key.constant");
const aws_s3_object_response_mapper_1 = require("./mappers/aws-s3-object-response.mapper");
let AwsS3Service = class AwsS3Service {
    constructor(awsConfig, awsS3ConfigOptions, appConfig) {
        this.awsConfig = awsConfig;
        this.awsS3ConfigOptions = awsS3ConfigOptions;
        this.appConfig = appConfig;
        this.bucketName = '';
        this.prefixKey = '';
        const { accessKeyId, region, secretAccessKey, bucketPrefix } = this.awsConfig;
        const { bucketName, objectKeyPrefix } = this.awsS3ConfigOptions;
        this.s3Client = new client_s3_1.S3Client({
            credentials: accessKeyId && secretAccessKey
                ? { accessKeyId, secretAccessKey }
                : undefined,
            region,
        });
        this.buildBucketName(bucketName, bucketPrefix);
        this.buildPrefixKey(objectKeyPrefix);
    }
    buildBucketName(bucketName, bucketPrefix) {
        this.bucketName = bucketName;
        if (!bucketPrefix) {
            const { appType } = this.appConfig;
            this.bucketName = appType + `.${this.bucketName}`;
        }
        else {
            this.bucketName = bucketPrefix + `.${this.bucketName}`;
        }
    }
    buildPrefixKey(objectKeyPrefix) {
        if (objectKeyPrefix) {
            this.prefixKey = objectKeyPrefix || '';
        }
    }
    addPrefixKey(key = '') {
        if (!this.prefixKey)
            return key;
        return this.prefixKey + '/' + key;
    }
    async putObjectToS3(input) {
        input.Key = this.addPrefixKey(input.Key);
        const command = new client_s3_1.PutObjectCommand({
            ...input,
            Bucket: input?.Bucket || this.bucketName,
        });
        try {
            return await this.s3Client.send(command);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteObjectsS3(objectKeys) {
        const objectIdentifiers = objectKeys.map(key => ({
            Key: this.addPrefixKey(key),
        }));
        const deleteCommand = new client_s3_1.DeleteObjectsCommand({
            Bucket: this.bucketName,
            Delete: { Objects: objectIdentifiers },
        });
        try {
            return await this.s3Client.send(deleteCommand);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getListObject(input) {
        input.Prefix = this.addPrefixKey(input.Prefix);
        const listObjectCommand = new client_s3_1.ListObjectsV2Command({
            ...input,
            Bucket: this.bucketName,
        });
        try {
            return await this.s3Client.send(listObjectCommand);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getObjectResponse(input) {
        input.Key = this.addPrefixKey(input.Key);
        const getObjectCommand = new client_s3_1.GetObjectCommand({
            ...input,
            Bucket: input?.Bucket || this.bucketName,
        });
        try {
            return await this.s3Client.send(getObjectCommand);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async copyObjectS3(input) {
        const command = new client_s3_1.CopyObjectCommand({
            ...input,
            Bucket: input?.Bucket || this.bucketName,
        });
        try {
            return await this.s3Client.send(command);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getObjectContent(objectKey, input = {}) {
        const awsS3Response = await this.getObjectResponse({
            ...input,
            Key: objectKey,
        });
        if (!awsS3Response) {
            throw new common_1.InternalServerErrorException(`An error occurs when fetching file`);
        }
        const { Body, ContentType } = awsS3Response;
        if (!Body) {
            throw new common_1.InternalServerErrorException(`Fetching file success but missing body`);
        }
        return aws_s3_object_response_mapper_1.AwsS3ObjectResponseMapper.toObjectContent({
            fileBuffer: Buffer.from(await Body.transformToByteArray()),
            objectKey,
            contentType: ContentType,
        });
    }
    async getObjectContents(objectKeys, input = {}) {
        const promises = await Promise.all(objectKeys.map(key => this.getObjectContent(key, input)));
        return promises;
    }
    async getObjectStreamingReadable(objectKey, input = {}) {
        const awsS3Response = await this.getObjectResponse({
            ...input,
            Key: objectKey,
        });
        if (!awsS3Response) {
            throw new common_1.InternalServerErrorException(`An error occurs when fetching file`);
        }
        const { Body: awsResponseBody, ContentType, ContentLength } = awsS3Response;
        if (!awsResponseBody) {
            throw new common_1.InternalServerErrorException(`Fetching file success but missing body`);
        }
        return aws_s3_object_response_mapper_1.AwsS3ObjectResponseMapper.toObjectStreaming({
            objectKey,
            readableStream: awsResponseBody,
            contentLength: ContentLength,
            contentType: ContentType,
        });
    }
};
exports.AwsS3Service = AwsS3Service;
exports.AwsS3Service = AwsS3Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, aws_config_1.InjectAwsConfig)()),
    __param(1, (0, common_1.Inject)(aws_s3_options_key_constant_1.AWS_S3_OPTIONS_KEY)),
    __param(2, (0, common_1.Optional)()),
    __param(2, (0, config_1.InjectAppConfig)()),
    __metadata("design:paramtypes", [Object, Object, Object])
], AwsS3Service);
//# sourceMappingURL=aws-s3.service.js.map
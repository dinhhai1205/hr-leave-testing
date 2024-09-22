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
exports.TermsAndConditionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const node_stream_1 = require("node:stream");
const typeorm_2 = require("typeorm");
const enums_1 = require("../../../../common/enums");
const entities_1 = require("../../../../core/database/entities");
const aws_1 = require("../../../../libs/aws");
let TermsAndConditionsService = class TermsAndConditionsService {
    constructor(repo, awsS3Service) {
        this.repo = repo;
        this.awsS3Service = awsS3Service;
    }
    async getLatestTermsAndConditions() {
        const termsAndConditions = await this.repo.findOne({
            where: { isDeleted: false },
            order: { version: 'desc' },
        });
        if (!termsAndConditions) {
            throw new common_1.NotFoundException('Not found terms and conditions');
        }
        return termsAndConditions;
    }
    async getLatestTermsAndConditionsContent() {
        const latestTermsAndConditions = await this.getLatestTermsAndConditions();
        const keys = (latestTermsAndConditions?.s3Key ?? '').split('/');
        const fileName = keys[keys.length - 1];
        const { Body: awsResBody, ContentLength, ContentType, ContentDisposition, } = await this.awsS3Service.getObjectResponse({
            Key: latestTermsAndConditions?.s3Key,
            ResponseContentDisposition: `attachment; filename="${fileName}"`,
        });
        if (!awsResBody) {
            throw new common_1.NotFoundException('File not found');
        }
        const passThroughStream = new node_stream_1.PassThrough();
        awsResBody.pipe(passThroughStream);
        return new common_1.StreamableFile(passThroughStream, {
            disposition: ContentDisposition,
            length: ContentLength,
            type: ContentType,
        });
    }
    async uploadTermsAndConditions({ originalname, buffer, mimetype, }) {
        let version = 1;
        const latestVersion = await this.repo.findOne({
            where: { isDeleted: false },
            order: { version: 'desc' },
        });
        if (latestVersion?.version) {
            version = latestVersion.version + 1;
        }
        const objectKey = `terms-and-conditions/${version}/${originalname}`;
        await this.awsS3Service.putObjectToS3({
            Key: objectKey,
            ContentType: mimetype,
            Body: buffer,
        });
        await this.repo.save({
            s3Key: objectKey,
            version,
            createdBy: enums_1.EDefaultEmail.HRF_LEAVE,
        });
        return;
    }
    async createTermAndConditions(input) {
        return this.repo.save({
            ...input,
            createdBy: enums_1.EDefaultEmail.HRF_LEAVE,
            createdOn: new Date(),
            isDeleted: false,
        });
    }
    async updateTermsAndConditions(id, body) {
        const existEntity = await this.repo.findOne({
            where: { id, isDeleted: false },
        });
        if (!existEntity)
            throw new common_1.NotFoundException();
        return this.repo.save({
            id: existEntity.id,
            ...body,
            updatedBy: enums_1.EDefaultEmail.HRF_LEAVE,
            updatedOn: new Date(),
        });
    }
    async deleteTermsAndConditions(id) {
        const existEntity = await this.repo.findOne({
            where: { id, isDeleted: false },
        });
        if (!existEntity)
            throw new common_1.NotFoundException();
        return this.repo.save({ id, isDeleted: true });
    }
};
exports.TermsAndConditionsService = TermsAndConditionsService;
exports.TermsAndConditionsService = TermsAndConditionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.TermsAndConditionsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        aws_1.AwsS3Service])
], TermsAndConditionsService);
//# sourceMappingURL=terms-and-conditions.service.js.map
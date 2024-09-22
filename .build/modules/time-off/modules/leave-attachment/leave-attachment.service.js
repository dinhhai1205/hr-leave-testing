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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveAttachmentService = void 0;
const common_1 = require("@nestjs/common");
const node_stream_1 = require("node:stream");
const constants_1 = require("../../../../common/constants");
const enums_1 = require("../../../../common/enums");
const aws_1 = require("../../../../libs/aws");
const company_parameter_service_1 = require("../../../general/modules/company-parameter/company-parameter.service");
const leave_service_1 = require("../leave/services/leave.service");
let LeaveAttachmentService = class LeaveAttachmentService {
    constructor(awsS3Service, leaveService, companyParameterService) {
        this.awsS3Service = awsS3Service;
        this.leaveService = leaveService;
        this.companyParameterService = companyParameterService;
    }
    async uploadLeaveAttachment(param, encryptionInfo) {
        const { companyId, files, leaveId } = param;
        if (files.length) {
            const [leaveRecord, isEncryptedFile] = await Promise.all([
                this.leaveService.checkExist({
                    where: { id: leaveId, companyId, isDeleted: false },
                    select: { id: true, fileCount: true },
                }),
                this.companyParameterService.isEncryptedFile(companyId),
            ]);
            if (isEncryptedFile && !encryptionInfo) {
                throw new common_1.BadRequestException('Missing encrypted information');
            }
            const totalFileSize = files.reduce((acc, file) => acc + file.size, 0);
            if (totalFileSize > 20 * enums_1.EStorageUnits.MB) {
                throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE_ATTACHMENT.SIZE_EXCEEDS(20, 'MB'));
            }
            const folderName = `${companyId}/${leaveId}`;
            const arrPromises = [];
            for (const file of files) {
                const objectKey = `${folderName}/${file.originalname}`;
                arrPromises.push(this.awsS3Service.putObjectToS3({
                    Key: objectKey,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                }));
            }
            await Promise.all(arrPromises);
            await this.updateFileCount(folderName, leaveRecord);
        }
    }
    async deleteLeaveAttachment(companyId, filenames = [], leaveId) {
        if (!filenames.length)
            return;
        const leaveRecord = await this.leaveService.checkExist({
            where: { id: leaveId, companyId, isDeleted: false },
            select: { id: true, fileCount: true },
        });
        const folderName = `${companyId}/${leaveId}`;
        const objectKeys = filenames.map(name => `${folderName}/${name}`);
        const { Deleted = [] } = await this.awsS3Service.deleteObjectsS3(objectKeys);
        if (Deleted.length > 0) {
            await this.updateFileCount(folderName, leaveRecord);
        }
    }
    async getAttachmentContent(companyId, leaveId, fileName) {
        const { Body: awsResBody, ContentLength, ContentType, } = await this.awsS3Service.getObjectResponse({
            Key: `${companyId}/${leaveId}/${fileName}`,
            ResponseContentDisposition: fileName,
        });
        if (!awsResBody) {
            throw new common_1.NotFoundException('File not found');
        }
        const passThroughStream = new node_stream_1.PassThrough();
        awsResBody.pipe(passThroughStream);
        return new common_1.StreamableFile(passThroughStream, {
            disposition: `attachment; filename="${fileName}"`,
            length: ContentLength,
            type: ContentType,
        });
    }
    async getAttachmentContents(companyId, queryInput) {
        const { leaveId, fileName, fileNames, isSelectAll } = queryInput;
        await this.leaveService.checkExist({
            where: { companyId, id: leaveId, isDeleted: false },
            select: { id: true },
        });
        if (fileName) {
            return this.getAttachmentContent(companyId, leaveId, fileName);
        }
        if (fileNames.length) {
            return Promise.all(fileNames.map(name => this.getAttachmentContent(companyId, leaveId, name)));
        }
        if (isSelectAll === 'true') {
            const { KeyCount = 0, Contents = [] } = await this.awsS3Service.getListObject({
                Delimiter: '/',
                Prefix: `${companyId}/${leaveId}/`,
            });
            if (!KeyCount)
                return;
            return Promise.all(Contents?.map(obj => {
                const name = obj.Key?.split('/')[obj.Key.length - 1] || '';
                return this.getAttachmentContent(companyId, leaveId, name);
            }));
        }
        throw new common_1.BadRequestException('Missing file name');
    }
    async updateFileCount(folderName, oldLeaveRecord) {
        const { KeyCount = 0 } = await this.awsS3Service.getListObject({
            Delimiter: '/',
            Prefix: `${folderName}/`,
        });
        oldLeaveRecord.fileCount = KeyCount;
        await this.leaveService.repository.save(oldLeaveRecord);
    }
};
exports.LeaveAttachmentService = LeaveAttachmentService;
exports.LeaveAttachmentService = LeaveAttachmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [aws_1.AwsS3Service,
        leave_service_1.LeaveService,
        company_parameter_service_1.CompanyParameterService])
], LeaveAttachmentService);
//# sourceMappingURL=leave-attachment.service.js.map
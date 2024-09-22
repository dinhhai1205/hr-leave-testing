import { StreamableFile } from '@nestjs/common';
import { LeaveEntity } from '../../../../core/database/entities/leave.entity';
import { AwsS3Service } from '../../../../libs/aws';
import { CompanyParameterService } from '../../../general/modules/company-parameter/company-parameter.service';
import { LeaveService } from '../leave/services/leave.service';
import { FileEncryptionInformationDto } from './dto/file-encryption-infomation.dto';
import { LeaveAttachmentQueryDto } from './dto/leave-attachment-query.dto';
import { LeaveAttachmentUploadDto } from './dto/leave-attachment-upload.dto';
export declare class LeaveAttachmentService {
    private readonly awsS3Service;
    readonly leaveService: LeaveService;
    private readonly companyParameterService;
    constructor(awsS3Service: AwsS3Service, leaveService: LeaveService, companyParameterService: CompanyParameterService);
    uploadLeaveAttachment(param: LeaveAttachmentUploadDto, encryptionInfo?: FileEncryptionInformationDto): Promise<void>;
    deleteLeaveAttachment(companyId: number, filenames: string[] | undefined, leaveId: number): Promise<void>;
    getAttachmentContent(companyId: number, leaveId: string | number, fileName: string): Promise<StreamableFile>;
    getAttachmentContents(companyId: number, queryInput: LeaveAttachmentQueryDto): Promise<StreamableFile | StreamableFile[] | undefined>;
    updateFileCount(folderName: string, oldLeaveRecord: LeaveEntity): Promise<void>;
}

import { IMulterFileUploaded } from '../../../../common/interfaces';
import { FileEncryptionInformationDto } from './dto/file-encryption-infomation.dto';
import { LeaveAttachmentQueryDto } from './dto/leave-attachment-query.dto';
import { LeaveAttachmentService } from './leave-attachment.service';
export declare class LeaveAttachmentController {
    private readonly leaveAttachmentService;
    constructor(leaveAttachmentService: LeaveAttachmentService);
    uploadLeaveAttachment(companyId: number, leaveId: number, files: IMulterFileUploaded[], body?: FileEncryptionInformationDto): Promise<void>;
    deleteLeaveAttachment(companyId: number, filenames: string[], leaveId: number): Promise<void>;
    getLeaveAttachment(companyId: number, query: LeaveAttachmentQueryDto, fileNames?: string[]): Promise<import("@nestjs/common").StreamableFile | import("@nestjs/common").StreamableFile[] | undefined>;
}

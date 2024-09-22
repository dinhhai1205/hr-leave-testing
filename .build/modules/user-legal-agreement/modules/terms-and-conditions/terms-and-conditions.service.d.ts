import { StreamableFile } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EDefaultEmail } from '../../../../common/enums';
import { IMulterFileUploaded } from '../../../../common/interfaces';
import { TermsAndConditionsEntity } from '../../../../core/database/entities';
import { AwsS3Service } from '../../../../libs/aws';
import { TermsAndConditionsCreateDto } from './dto/terms-and-conditions-create.dto';
import { TermsAndConditionsUpdateDto } from './dto/terms-and-conditions-update.dto';
export declare class TermsAndConditionsService {
    private readonly repo;
    private readonly awsS3Service;
    constructor(repo: Repository<TermsAndConditionsEntity>, awsS3Service: AwsS3Service);
    getLatestTermsAndConditions(): Promise<TermsAndConditionsEntity>;
    getLatestTermsAndConditionsContent(): Promise<StreamableFile>;
    uploadTermsAndConditions({ originalname, buffer, mimetype, }: IMulterFileUploaded): Promise<void>;
    createTermAndConditions(input: TermsAndConditionsCreateDto): Promise<{
        createdBy: EDefaultEmail;
        createdOn: Date;
        isDeleted: false;
        bucket: string;
        s3Key: string;
        version: number;
    } & TermsAndConditionsEntity>;
    updateTermsAndConditions(id: number, body: TermsAndConditionsUpdateDto): Promise<{
        updatedBy: EDefaultEmail;
        updatedOn: Date;
        bucket: string;
        s3Key: string;
        version: number;
        id: number;
    } & TermsAndConditionsEntity>;
    deleteTermsAndConditions(id: number): Promise<{
        id: number;
        isDeleted: true;
    } & TermsAndConditionsEntity>;
}

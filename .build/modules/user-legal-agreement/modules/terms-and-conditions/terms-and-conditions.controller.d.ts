import { IMulterFileUploaded } from '../../../../common/interfaces';
import { TermsAndConditionsCreateDto } from './dto/terms-and-conditions-create.dto';
import { TermsAndConditionsUpdateDto } from './dto/terms-and-conditions-update.dto';
import { TermsAndConditionsService } from './terms-and-conditions.service';
export declare class TermsAndConditionsController {
    private readonly termsAndConditionsService;
    constructor(termsAndConditionsService: TermsAndConditionsService);
    getLatestTermsAndConditions(): Promise<number>;
    getLatestTermsAndConditionsContent(): Promise<import("@nestjs/common").StreamableFile>;
    uploadTermsAndConditions(file: IMulterFileUploaded): Promise<void>;
    createTermAndConditions(body: TermsAndConditionsCreateDto): Promise<{
        createdBy: import("../../../../common/enums").EDefaultEmail;
        createdOn: Date;
        isDeleted: false;
        bucket: string;
        s3Key: string;
        version: number;
    } & import("../../../../core/database").TermsAndConditionsEntity>;
    updateTermAndConditions(id: number, body: TermsAndConditionsUpdateDto): Promise<{
        updatedBy: import("../../../../common/enums").EDefaultEmail;
        updatedOn: Date;
        bucket: string;
        s3Key: string;
        version: number;
        id: number;
    } & import("../../../../core/database").TermsAndConditionsEntity>;
    deleteTermAndConditions(id: number): Promise<{
        id: number;
        isDeleted: true;
    } & import("../../../../core/database").TermsAndConditionsEntity>;
}

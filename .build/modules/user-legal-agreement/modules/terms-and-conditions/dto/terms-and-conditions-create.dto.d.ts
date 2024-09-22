import { TermsAndConditionsEntity } from '../../../../../core/database';
import { AbstractEntity } from '../../../../../core/database/entities/abstract.entity';
export declare class TermsAndConditionsCreateDto implements Omit<TermsAndConditionsEntity, keyof AbstractEntity | 'id' | 'createdBy' | 'updatedBy'> {
    bucket: string;
    s3Key: string;
    version: number;
}

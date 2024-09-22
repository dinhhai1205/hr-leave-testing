import { AbstractEntity } from './abstract.entity';
export declare class TermsAndConditionsEntity extends AbstractEntity {
    id: number;
    version: number;
    s3Key: string;
    bucket: string;
    createdBy: string;
    updatedBy: string;
}

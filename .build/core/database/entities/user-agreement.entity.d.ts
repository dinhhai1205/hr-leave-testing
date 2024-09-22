import { AbstractEntity } from './abstract.entity';
export declare class UserAgreementEntity extends AbstractEntity {
    id: number;
    email: string;
    termsAndConditionsId: number;
    agreeAt: Date;
    createdBy: string;
    updatedBy: string;
}

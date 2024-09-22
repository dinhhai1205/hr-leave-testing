import type { IObjectLiteral } from '../../../common/interfaces';
import type { DocumentStatus } from '../enums';
import { DocumentOperationType } from '../enums';
export type DocumentBaseResponse = {
    companyId: number;
    documentId: number;
    documentName: string;
    documentStatus: DocumentStatus;
};
export declare class ESignBaseResponseDto<T extends IObjectLiteral> {
    companyId: number;
    documentId: number;
    documentName: string;
    documentStatus: DocumentStatus;
    activity: string;
    operationType: DocumentOperationType;
    performedByEmail: string;
    ipAddress: string;
    latitude: string;
    longitude: string;
    data: T;
    constructor(args: {
        operationType: keyof typeof DocumentOperationType;
        data: T & {
            companyId: number;
            documentId: number;
            documentName: string;
            documentStatus: DocumentStatus;
            performedByEmail?: string;
            activity?: string;
            ipAddress?: string;
            latitude?: string;
            longitude?: string;
        };
    });
}

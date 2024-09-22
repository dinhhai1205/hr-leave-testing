import { DeepPartial, Repository } from 'typeorm';
import { DocumentActionEntity } from '../../../../core/database/entities/document-action.entity';
import { DocumentEntity } from '../../../../core/database/entities/document.entity';
import { TypeOrmBaseService } from '../../../../core/database/services';
import { CompanyUserRoleService } from '../../../user/modules/company-user-role/company-user-role.service';
import { EmployeeService } from '../../../user/modules/employee/employee.service';
import { DocumentActionStatus, DocumentOperationType, DocumentStatus } from '../../enums';
import { ZohoActionDto } from '../../libs/zoho';
import { UpdateDocumentActionSettingDto } from '../../modules/document-action/dtos/update-document-action-setting.dto';
import { DocumentActionFieldService } from '../document-action-field/document-action-field.service';
export declare class DocumentActionService extends TypeOrmBaseService<DocumentActionEntity> {
    private readonly documentActionRepository;
    private readonly documentActionFieldService;
    private readonly companyUserRoleService;
    private readonly employeeService;
    constructor(documentActionRepository: Repository<DocumentActionEntity>, documentActionFieldService: DocumentActionFieldService, companyUserRoleService: CompanyUserRoleService, employeeService: EmployeeService);
    updateDocumentActionSettings(args: {
        documentActions: DocumentActionEntity[];
        userEmail: string;
        companyId: number;
        documentId: number;
        payload?: UpdateDocumentActionSettingDto[];
        deletedActions?: number[];
        actCommandQuery?: boolean;
    }): Promise<{
        isBulk: boolean;
        entities: DocumentActionEntity[] | UpdateDocumentActionSettingDto[];
    }>;
    deleteMultipleDocumentAction(userEmail: string, documentActions?: DocumentActionEntity[]): Promise<DocumentActionEntity[] | undefined>;
    validateRecipientEmailsBelongToCompany(companyId: number, recipientEmails: string[]): Promise<void>;
    updateDocumentActionStatus({ actionId, userEmail, status, }: {
        actionId: number;
        userEmail: string;
        status: DocumentActionStatus;
    }): Promise<DocumentActionEntity>;
    updateDocumentActionZohoActionId({ actionId, zohoActionId, }: {
        actionId: number;
        zohoActionId: string;
    }): Promise<void>;
    updateZohoDocumentActionInfo(updateDtos: {
        id: number;
        zohoActionId: string;
        updatedOn: Date;
        updatedBy: string;
    }[], zohoActions: ZohoActionDto[]): Promise<({
        id: number;
        zohoActionId: string;
        updatedOn: Date;
        updatedBy: string;
    } & DocumentActionEntity)[]>;
    updateZohoDocumentActionIds(updateDto: Array<{
        id: number;
        zohoActionId: string;
        updatedOn: Date;
        updatedBy: string;
    }>): Promise<({
        id: number;
        zohoActionId: string;
        updatedOn: Date;
        updatedBy: string;
    } & DocumentActionEntity)[]>;
    calculateSignPercentage(documentStatus: DocumentStatus, documentActions: Pick<DocumentActionEntity, 'type' | 'status' | 'recipientEmail'>[]): number;
    updateDocumentActionStatusFromZohoWebhook(document: DocumentEntity, documentAction: DocumentActionEntity, operationType: DocumentOperationType, requestStatus: DocumentStatus, performedByEmail: string, currentDate: Date): Promise<string | (DeepPartial<DocumentActionEntity> & DocumentActionEntity)[]>;
    private getNextSigningOrderActionDtos;
}

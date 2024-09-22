import { ZohoWebHooKPayload } from '../../libs/zoho';
import { DocumentService } from '../../modules/document';
import { DocumentActionService } from '../document-action/document-action.service';
import { DocumentAuditService } from '../document-audit';
import { DocumentFileService } from '../document-file/services';
export declare class ZohoWebhookService {
    private readonly documentService;
    private readonly documentFileService;
    private readonly documentActionService;
    private readonly documentAuditService;
    constructor(documentService: DocumentService, documentFileService: DocumentFileService, documentActionService: DocumentActionService, documentAuditService: DocumentAuditService);
    receiveMessage(zohoWebHookPayload: ZohoWebHooKPayload): Promise<void>;
}

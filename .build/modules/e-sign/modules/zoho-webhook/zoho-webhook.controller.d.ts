import { ZohoWebHooKPayload } from '../../libs/zoho';
import { ZohoWebhookService } from './zoho-webhook.service';
export declare class ZohoWebhookController {
    private readonly zohoWebhookService;
    constructor(zohoWebhookService: ZohoWebhookService);
    receiveMessage(body: ZohoWebHooKPayload): Promise<void>;
}

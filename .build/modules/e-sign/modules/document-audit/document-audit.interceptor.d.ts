import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DocumentAuditService } from './document-audit.service';
export declare class DocumentAuditInterceptor implements NestInterceptor {
    private readonly documentAuditService;
    constructor(documentAuditService: DocumentAuditService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}

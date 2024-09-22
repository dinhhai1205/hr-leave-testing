import type { KeysOf } from '../../../../../common/types';
import type { DocumentActionEntity } from '../../../../../core/database/entities/document-action.entity.ts';
import type { DocumentFileEntity } from '../../../../../core/database/entities/document-file.entity';
export type BaseQueryBuilderGetDocumentOpt = {
    joinFolder: boolean;
    joinDocumentType: boolean;
    joinDocumentAction: boolean;
    joinDocumentFile: boolean;
    excludeDocumentFileFields: KeysOf<DocumentFileEntity>;
    excludeDocumentActionFields: KeysOf<DocumentActionEntity>;
};

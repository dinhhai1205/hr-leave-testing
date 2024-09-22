"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentAuditService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../../common/utils");
const document_audit_entity_1 = require("../../../../core/database/entities/document-audit.entity");
const document_entity_1 = require("../../../../core/database/entities/document.entity");
const services_1 = require("../../../../core/database/services");
const utils_2 = require("../../../../core/database/utils");
let DocumentAuditService = class DocumentAuditService extends services_1.TypeOrmBaseService {
    constructor(documentAuditRepository) {
        super(documentAuditRepository);
        this.documentAuditRepository = documentAuditRepository;
    }
    baseQueryBuilder(companyId, documentId, opts = { selectDocument: true }) {
        const { selectDocument } = opts;
        const documentAuditAlias = (0, utils_1.aliasEntity)(document_audit_entity_1.DocumentAuditEntity);
        const documentAlias = (0, utils_1.aliasEntity)(document_entity_1.DocumentEntity);
        const queryBuilder = this.documentAuditRepository.createQueryBuilder(documentAuditAlias);
        const documentAuditBracket = new utils_2.WhereConditionBuilder(documentAuditAlias)
            .andIsDeletedFalse()
            .andWhere({ field: 'documentId', operator: '=', value: documentId });
        queryBuilder.andWhere(documentAuditBracket.buildBracket());
        const documentAuditColumnNames = (0, utils_2.getColumnNamesEntity)(document_audit_entity_1.DocumentAuditEntity.prototype, { withPrefix: documentAuditAlias, excludeColumns: ['data', 'payload'] });
        queryBuilder.select([
            `${documentAuditAlias}.createdBy`,
            `${documentAuditAlias}.createdOn`,
            `${documentAuditAlias}.updatedBy`,
            `${documentAuditAlias}.updatedOn`,
            ...documentAuditColumnNames,
        ]);
        const documentWhereConditionBuilder = new utils_2.WhereConditionBuilder(documentAlias)
            .andIsDeletedFalse()
            .andWhere({ field: 'companyId', operator: '=', value: companyId })
            .andWhereRaw(`${documentAlias}.id = ${documentAuditAlias}.documentId`)
            .buildSql();
        queryBuilder.innerJoin(document_entity_1.DocumentEntity, documentAlias, documentWhereConditionBuilder.condition, documentWhereConditionBuilder.parameters);
        if (selectDocument) {
            const documentColumnNames = (0, utils_2.getColumnNamesEntity)(document_entity_1.DocumentEntity.prototype, { withPrefix: documentAlias });
            queryBuilder.addSelect(documentColumnNames);
        }
        return { queryBuilder, documentAlias, documentAuditAlias };
    }
    async createDocumentAudit(createDocumentAuditPayloadDto) {
        const { userEmail, companyId, ...createDto } = createDocumentAuditPayloadDto;
        const document = await this.create(createDto, {
            userEmail,
            companyId,
        });
        return document;
    }
    async getAllDocumentAudits(paginationQueryDto) {
        const { companyId, documentId, filterOperationType } = paginationQueryDto;
        const { queryBuilder, documentAuditAlias } = this.baseQueryBuilder(companyId, documentId, { selectDocument: false });
        if (filterOperationType) {
            queryBuilder.andWhere(new utils_2.WhereConditionBuilder(documentAuditAlias)
                .andWhere({
                field: 'operationType',
                operator: '=',
                value: filterOperationType,
            })
                .buildBracket());
        }
        return this.getEntitiesByQuery({
            queryBuilder,
            paginationQueryDto,
            querySearchFields: ['createdBy'],
        });
    }
};
exports.DocumentAuditService = DocumentAuditService;
exports.DocumentAuditService = DocumentAuditService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_audit_entity_1.DocumentAuditEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DocumentAuditService);
//# sourceMappingURL=document-audit.service.js.map
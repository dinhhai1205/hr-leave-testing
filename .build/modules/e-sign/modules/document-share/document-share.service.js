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
exports.DocumentShareService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const database_1 = require("../../../../core/database");
const entities_1 = require("../../../../core/database/entities");
const services_1 = require("../../../../core/database/services");
const dtos_1 = require("../../dtos");
const document_action_service_1 = require("../document-action/document-action.service");
const document_service_1 = require("../document/services/document.service");
let DocumentShareService = class DocumentShareService extends services_1.TypeOrmBaseService {
    constructor(documentShareRepository, documentService, documentActionService) {
        super(documentShareRepository);
        this.documentShareRepository = documentShareRepository;
        this.documentService = documentService;
        this.documentActionService = documentActionService;
    }
    async createDocumentShare(createDocumentSharePayloadDto) {
        const { companyId, documentId, sharedWithEmail, sharedByUser, userEmail } = createDocumentSharePayloadDto;
        const [existDocumentShare, document] = await Promise.all([
            this.documentShareRepository.findOne({
                where: {
                    sharedWithEmail,
                    sharedByUser,
                    companyId,
                    documentId,
                    isDeleted: false,
                },
                select: { id: true },
            }),
            this.documentService.getDocumentById({ companyId, documentId }, {
                joinFolder: false,
                joinDocumentType: false,
                joinDocumentAction: false,
                joinDocumentFile: false,
            }),
            this.documentActionService.validateRecipientEmailsBelongToCompany(companyId, [sharedWithEmail]),
        ]);
        if (existDocumentShare) {
            throw new common_1.ConflictException(`Share for user #${sharedWithEmail} is exist`);
        }
        const newDocumentShare = await this.create(createDocumentSharePayloadDto, {
            userEmail: sharedByUser,
            companyId,
        });
        return new dtos_1.ESignBaseResponseDto({
            operationType: 'RequestCreateShared',
            data: {
                ...newDocumentShare,
                documentId,
                documentName: document.name,
                documentStatus: document.status,
                performedByEmail: userEmail,
            },
        });
    }
    async deleteDocumentShareById(deleteDocumentShareByIdPayloadDto) {
        const { documentShareId, userEmail, companyId, documentId } = deleteDocumentShareByIdPayloadDto;
        const document = await this.documentService.getDocumentById({ companyId, documentId }, {
            joinDocumentAction: false,
            joinDocumentFile: false,
            joinDocumentType: false,
            joinFolder: false,
        });
        await this.delete(documentShareId, { userEmail, companyId });
        return new dtos_1.ESignBaseResponseDto({
            operationType: 'RequestUpdateShared',
            data: {
                message: 'Document share deleted successfully',
                companyId,
                documentId,
                documentName: document.name,
                documentStatus: document.status,
                performedByEmail: userEmail,
            },
        });
    }
    async getAllDocumentShares(payload) {
        const { companyId, documentId, ...paginationQueryDto } = payload;
        const documentShareAlias = entities_1.DocumentShareEntity.name;
        const documentAlias = 'document';
        const queryBuilder = this.documentShareRepository.createQueryBuilder(documentShareAlias);
        queryBuilder.andWhere(new database_1.WhereConditionBuilder(documentShareAlias)
            .andIsDeletedFalse()
            .andWhere({ field: 'companyId', operator: '=', value: companyId })
            .andWhere({ field: 'documentId', operator: '=', value: documentId })
            .buildBracket());
        const documentJoinConditionBuilder = new database_1.WhereConditionBuilder(documentAlias)
            .andWhereRaw(`${documentShareAlias}.documentId = ${documentAlias}.id`)
            .andIsDeletedFalse()
            .buildSql();
        queryBuilder.innerJoin(`${documentShareAlias}.document`, documentAlias, documentJoinConditionBuilder.condition, documentJoinConditionBuilder.parameters);
        const documentShares = await this.getEntitiesByQuery({
            queryBuilder,
            paginationQueryDto,
        });
        return documentShares;
    }
};
exports.DocumentShareService = DocumentShareService;
exports.DocumentShareService = DocumentShareService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.DocumentShareEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        document_service_1.DocumentService,
        document_action_service_1.DocumentActionService])
], DocumentShareService);
//# sourceMappingURL=document-share.service.js.map
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
exports.DocumentTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../../../core/database/entities");
const services_1 = require("../../../../core/database/services");
const utils_1 = require("../../../../core/database/utils");
let DocumentTypeService = class DocumentTypeService extends services_1.TypeOrmBaseService {
    constructor(documentTypeRepository) {
        super(documentTypeRepository);
        this.documentTypeRepository = documentTypeRepository;
    }
    async createDocumentType(createDocumentTypeDto) {
        return this.create(createDocumentTypeDto, {
            userEmail: createDocumentTypeDto.userEmail,
        });
    }
    async getAllDocumentTypes(paginationQueryDto) {
        const alias = entities_1.DocumentTypeEntity.name;
        const queryBuilder = this.documentTypeRepository.createQueryBuilder(alias);
        queryBuilder.andWhere(new utils_1.WhereConditionBuilder(alias)
            .andWhere({
            field: 'companyId',
            operator: '=',
            value: paginationQueryDto.companyId,
        })
            .buildBracket());
        const selectColumns = (0, utils_1.getColumnNamesEntity)(entities_1.DocumentTypeEntity.prototype, {
            withPrefix: alias,
        });
        return this.getEntitiesByQuery({
            queryBuilder,
            paginationQueryDto,
            selectColumns,
        });
    }
};
exports.DocumentTypeService = DocumentTypeService;
exports.DocumentTypeService = DocumentTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.DocumentTypeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DocumentTypeService);
//# sourceMappingURL=document-type.service.js.map
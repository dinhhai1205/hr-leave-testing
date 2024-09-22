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
exports.FolderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../../../core/database/entities");
const services_1 = require("../../../../core/database/services");
const utils_1 = require("../../../../core/database/utils");
let FolderService = class FolderService extends services_1.TypeOrmBaseService {
    constructor(folderRepository) {
        super(folderRepository);
        this.folderRepository = folderRepository;
    }
    async createFolder(createFolderPayloadDto) {
        return this.create(createFolderPayloadDto, {
            userEmail: createFolderPayloadDto.userEmail,
        });
    }
    async getAllFolders(paginationQueryDto) {
        const alias = entities_1.FolderEntity.name;
        const queryBuilder = this.folderRepository.createQueryBuilder(alias);
        queryBuilder.andWhere(new utils_1.WhereConditionBuilder(alias)
            .andWhere({
            field: 'companyId',
            operator: '=',
            value: paginationQueryDto.companyId,
        })
            .buildBracket());
        const selectColumns = (0, utils_1.getColumnNamesEntity)(entities_1.FolderEntity.prototype, {
            withPrefix: alias,
        });
        return this.getEntitiesByQuery({
            queryBuilder,
            paginationQueryDto,
            selectColumns,
        });
    }
};
exports.FolderService = FolderService;
exports.FolderService = FolderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.FolderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FolderService);
//# sourceMappingURL=folder.service.js.map
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
exports.TimeTrackerTagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment = require("moment");
const database_1 = require("../../../../core/database");
let TimeTrackerTagService = class TimeTrackerTagService extends database_1.TypeOrmBaseService {
    constructor(timeTrackerTagRepository) {
        super(timeTrackerTagRepository);
        this.timeTrackerTagRepository = timeTrackerTagRepository;
    }
    async getAllTags(companyId, paginationQueryDto, keywords) {
        const alias = database_1.TimeTrackerTagEntity.name;
        const queryBuilder = this.timeTrackerTagRepository.createQueryBuilder(alias);
        if (keywords) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where('TimeTrackerTagEntity.name ILIKE :keywords', {
                    keywords: `%${keywords}%`,
                })
                    .orWhere('TimeTrackerTagEntity.code ILIKE :keywords', {
                    keywords: `%${keywords}%`,
                })
                    .orWhere('TimeTrackerTagEntity.description ILIKE :keywords', {
                    keywords: `%${keywords}%`,
                });
            }));
        }
        queryBuilder.andWhere('TimeTrackerTagEntity.companyId = :companyId', {
            companyId,
        });
        return this.getEntitiesByQuery({ queryBuilder, paginationQueryDto });
    }
    async getTagById(id, companyId) {
        return this.getOneOrFail({ where: { id, companyId } }, { errMsg: 'Tag not found' });
    }
    async createTag(createTagDto, companyId) {
        const { userEmail, ...payload } = createTagDto;
        const newTag = await this.create(payload, {
            companyId,
            userEmail,
        });
        if (!newTag)
            throw new common_1.BadRequestException('Create Tag Failed');
        return newTag;
    }
    async updateTag(id, updateTagDto, companyId) {
        const { userEmail, ...payload } = updateTagDto;
        const tag = await this.getTagById(id, companyId);
        if (!tag)
            throw new common_1.NotFoundException('Tag not found');
        const updatedTag = await this.update(id, payload, {
            companyId,
            userEmail,
        });
        return updatedTag;
    }
    async archiveTag(id, companyId, userEmail) {
        const tag = await this.getTagById(id, companyId);
        if (!tag)
            throw new common_1.NotFoundException('Tag not found');
        await this.delete(id, {
            companyId,
            userEmail,
        });
        return tag;
    }
    async restoreTag(id, companyId, userEmail) {
        await this.timeTrackerTagRepository.update({ id, companyId }, {
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
            isDeleted: false,
        });
        const tag = await this.getTagById(id, companyId);
        if (!tag)
            throw new common_1.NotFoundException('Tag not found');
        return tag;
    }
    async removeTag(id, companyId) {
        const tag = await this.getTagById(id, companyId);
        if (!tag)
            throw new common_1.NotFoundException('Tag not found');
        await this.timeTrackerTagRepository.delete({ id });
        return tag;
    }
};
exports.TimeTrackerTagService = TimeTrackerTagService;
exports.TimeTrackerTagService = TimeTrackerTagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.TimeTrackerTagEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TimeTrackerTagService);
//# sourceMappingURL=time-tracker-tag.service.js.map
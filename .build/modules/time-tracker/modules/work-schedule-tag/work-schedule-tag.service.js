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
exports.WorkScheduleTagService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../../../core/database");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment = require("moment");
const time_tracker_tag_1 = require("../time-tracker-tag");
let WorkScheduleTagService = class WorkScheduleTagService extends database_1.TypeOrmBaseService {
    constructor(workScheduleTagRepository, workScheduleRepository, timeTrackerTagService) {
        super(workScheduleTagRepository);
        this.workScheduleTagRepository = workScheduleTagRepository;
        this.workScheduleRepository = workScheduleRepository;
        this.timeTrackerTagService = timeTrackerTagService;
    }
    async assignTagForWorkSchedule(createWorkScheduleTagDto, companyId, userEmail) {
        const { tagId, workScheduleId } = createWorkScheduleTagDto;
        const tag = await this.timeTrackerTagService.getTagById(tagId, companyId);
        if (!tag)
            throw new common_1.NotFoundException('Tag not found');
        const WorkSchedule = await this.workScheduleRepository.findOne({
            where: {
                id: workScheduleId,
                companyId: companyId,
            },
        });
        if (!WorkSchedule)
            throw new common_1.NotFoundException('Work Schedule not found');
        const tagWorkScheduleExisted = await this.getOne({
            where: {
                tagId,
                workScheduleId,
                companyId,
            },
        });
        if (tagWorkScheduleExisted)
            throw new common_1.ConflictException('Tag existed in this WorkSchedule');
        const tagWorkSchedule = await this.create({
            tagId,
            workScheduleId,
        }, { userEmail, companyId });
        return tagWorkSchedule;
    }
    async assignMultipleTagForWorkSchedules(createWorkScheduleTagDtos, companyId, userEmail) {
        for (const createWorkScheduleTagDto of createWorkScheduleTagDtos) {
            const { tagId, workScheduleId } = createWorkScheduleTagDto;
            const tag = await this.timeTrackerTagService.getTagById(tagId, companyId);
            if (!tag)
                throw new common_1.NotFoundException('Tag not found');
            const WorkSchedule = await this.workScheduleRepository.findOne({
                where: {
                    id: workScheduleId,
                    companyId: companyId,
                },
            });
            if (!WorkSchedule)
                throw new common_1.NotFoundException('WorkSchedule not found');
            const tagWorkScheduleExisted = await this.getOne({
                where: {
                    tagId,
                    workScheduleId,
                    companyId,
                },
            });
            if (tagWorkScheduleExisted)
                throw new common_1.ConflictException('Tag existed in this WorkSchedule');
        }
        return this.createMulti(createWorkScheduleTagDtos, {
            userEmail,
            companyId,
        });
    }
    async archiveWorkScheduleTag(tagId, workScheduleId, companyId, userEmail) {
        const workScheduleTag = await this.getOne({
            where: {
                workScheduleId,
                tagId,
                companyId,
            },
        });
        if (!workScheduleTag)
            throw new common_1.NotFoundException('Work Schedule Tag not found');
        return this.delete(workScheduleTag.id, {
            userEmail,
            companyId,
        });
    }
    async removeWorkScheduleTag(tagId, workScheduleId, companyId) {
        const workScheduleTag = await this.getOne({
            where: {
                workScheduleId,
                tagId,
                companyId,
            },
        });
        if (!workScheduleTag)
            throw new common_1.NotFoundException('Work Schedule Tag not found');
        await this.workScheduleTagRepository.delete({
            workScheduleId,
            tagId,
            companyId,
        });
        return {
            ...workScheduleTag,
            isDeleted: true,
        };
    }
    async updateMultipleWorkScheduleTag(updateWorkScheduleTagDtos, companyId, userEmail) {
        const result = [];
        for (const updateWorkScheduleTagDto of updateWorkScheduleTagDtos) {
            const { tagId, workScheduleId, ...updatePayload } = updateWorkScheduleTagDto;
            const findCriteria = { companyId };
            if (tagId)
                findCriteria.tagId = tagId;
            if (workScheduleId)
                findCriteria.workScheduleId = workScheduleId;
            const workScheduleTags = await this.workScheduleTagRepository.find({
                where: findCriteria,
            });
            if (workScheduleTags.length === 0)
                throw new common_1.NotFoundException('Work Schedule Tag not found');
            await this.workScheduleTagRepository.update(findCriteria, {
                updatedBy: userEmail,
                updatedOn: moment.utc().toDate(),
                ...updatePayload,
            });
            result.push(...workScheduleTags.map(workScheduleTag => ({
                ...workScheduleTag,
                ...updatePayload,
            })));
        }
        return result;
    }
    async getTagsOfWorkSchedule(workScheduleId, companyId) {
        const workScheduleTags = await this.workScheduleTagRepository.find({
            where: {
                workScheduleId,
                companyId,
            },
        });
        return workScheduleTags;
    }
};
exports.WorkScheduleTagService = WorkScheduleTagService;
exports.WorkScheduleTagService = WorkScheduleTagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.WorkScheduleTagEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(database_1.WorkScheduleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        time_tracker_tag_1.TimeTrackerTagService])
], WorkScheduleTagService);
//# sourceMappingURL=work-schedule-tag.service.js.map
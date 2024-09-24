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
exports.LeaveModuleApiLogService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const leave_module_api_log_entity_1 = require("../../core/database/entities/leave-module-api-log.entity");
const encryption_1 = require("../../core/encryption");
const aws_1 = require("../../libs/aws");
let LeaveModuleApiLogService = class LeaveModuleApiLogService {
    constructor(leaveModuleApiLogRepo, awsS3Service, encryptionService) {
        this.leaveModuleApiLogRepo = leaveModuleApiLogRepo;
        this.awsS3Service = awsS3Service;
        this.encryptionService = encryptionService;
        this.rootFolder = 'z_api_log';
    }
    async create(args) {
        const { files, ...params } = args;
        const entity = this.leaveModuleApiLogRepo.create(params);
        const apiLog = await this.leaveModuleApiLogRepo.save(entity);
        if (files?.length && apiLog) {
            const { id, companyId } = apiLog;
            const companyFolder = `${companyId || 'unknown'}`;
            const promisesStack = [];
            for (const file of files) {
                promisesStack.push(this.awsS3Service.putObjectToS3({
                    Key: `${this.rootFolder}/${companyFolder}/${id}-${file.originalname}`,
                    Body: Buffer.from(file.buffer),
                    ContentLength: Buffer.from(file.buffer).byteLength,
                }));
            }
            try {
                await Promise.allSettled(promisesStack);
            }
            catch (error) {
            }
            finally {
            }
        }
    }
    async deleteLogOverThreeMonths() {
        await this.leaveModuleApiLogRepo.delete({
            createdOn: (0, typeorm_2.LessThan)(moment.utc().add(-3, 'month').toDate()),
        });
    }
};
exports.LeaveModuleApiLogService = LeaveModuleApiLogService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LeaveModuleApiLogService.prototype, "deleteLogOverThreeMonths", null);
exports.LeaveModuleApiLogService = LeaveModuleApiLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(leave_module_api_log_entity_1.LeaveModuleApiLogEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        aws_1.AwsS3Service,
        encryption_1.EncryptionService])
], LeaveModuleApiLogService);
//# sourceMappingURL=leave-module-api-log.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkScheduleTagModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("../../../../core/database");
const work_schedule_tag_controller_1 = require("./work-schedule-tag.controller");
const work_schedule_tag_service_1 = require("./work-schedule-tag.service");
const time_tracker_tag_1 = require("../time-tracker-tag");
let WorkScheduleTagModule = class WorkScheduleTagModule {
};
exports.WorkScheduleTagModule = WorkScheduleTagModule;
exports.WorkScheduleTagModule = WorkScheduleTagModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([database_1.WorkScheduleTagEntity, database_1.WorkScheduleEntity]),
            time_tracker_tag_1.TimeTrackerTagModule,
        ],
        controllers: [work_schedule_tag_controller_1.WorkScheduleTagController],
        providers: [work_schedule_tag_service_1.WorkScheduleTagService],
        exports: [work_schedule_tag_service_1.WorkScheduleTagService],
    })
], WorkScheduleTagModule);
//# sourceMappingURL=work-schedule-tag.module.js.map
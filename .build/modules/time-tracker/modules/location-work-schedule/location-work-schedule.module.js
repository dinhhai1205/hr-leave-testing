"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationWorkScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("../../../../core/database");
const location_work_schedule_service_1 = require("./location-work-schedule.service");
let LocationWorkScheduleModule = class LocationWorkScheduleModule {
};
exports.LocationWorkScheduleModule = LocationWorkScheduleModule;
exports.LocationWorkScheduleModule = LocationWorkScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                database_1.LocationWorkScheduleEntity,
                database_1.LocationEntity,
                database_1.WorkScheduleEntity,
            ]),
        ],
        providers: [location_work_schedule_service_1.LocationWorkScheduleService],
        exports: [location_work_schedule_service_1.LocationWorkScheduleService],
    })
], LocationWorkScheduleModule);
//# sourceMappingURL=location-work-schedule.module.js.map
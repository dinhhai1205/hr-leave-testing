"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTrackerTagModule = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../../../core/database");
const typeorm_1 = require("@nestjs/typeorm");
const time_tracker_tag_controller_1 = require("./time-tracker-tag.controller");
const time_tracker_tag_service_1 = require("./time-tracker-tag.service");
let TimeTrackerTagModule = class TimeTrackerTagModule {
};
exports.TimeTrackerTagModule = TimeTrackerTagModule;
exports.TimeTrackerTagModule = TimeTrackerTagModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([database_1.TimeTrackerTagEntity])],
        controllers: [time_tracker_tag_controller_1.TimeTrackerTagController],
        providers: [time_tracker_tag_service_1.TimeTrackerTagService],
        exports: [time_tracker_tag_service_1.TimeTrackerTagService],
    })
], TimeTrackerTagModule);
//# sourceMappingURL=time-tracker-tag.module.js.map
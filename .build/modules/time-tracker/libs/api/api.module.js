"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTrackerApiModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const api_service_1 = require("./api.service");
const time_tracker_config_1 = require("../../../../config/time-tracker.config");
const config_1 = require("@nestjs/config");
let TimeTrackerApiModule = class TimeTrackerApiModule {
};
exports.TimeTrackerApiModule = TimeTrackerApiModule;
exports.TimeTrackerApiModule = TimeTrackerApiModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, config_1.ConfigModule.forFeature(time_tracker_config_1.timeTrackerConfig)],
        providers: [api_service_1.TimeTrackerApiService],
        exports: [api_service_1.TimeTrackerApiService],
    })
], TimeTrackerApiModule);
//# sourceMappingURL=api.module.js.map
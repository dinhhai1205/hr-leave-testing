"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTrackerStreamImgModule = void 0;
const common_1 = require("@nestjs/common");
const time_tracker_stream_img_service_1 = require("./time-tracker-stream-img.service");
const time_tracker_stream_img_controller_1 = require("./time-tracker-stream-img.controller");
const api_module_1 = require("../../libs/api/api.module");
let TimeTrackerStreamImgModule = class TimeTrackerStreamImgModule {
};
exports.TimeTrackerStreamImgModule = TimeTrackerStreamImgModule;
exports.TimeTrackerStreamImgModule = TimeTrackerStreamImgModule = __decorate([
    (0, common_1.Module)({
        imports: [api_module_1.TimeTrackerApiModule],
        controllers: [time_tracker_stream_img_controller_1.TimeTrackerStreamImgController],
        providers: [time_tracker_stream_img_service_1.TimeTrackerStreamImgService],
        exports: [time_tracker_stream_img_service_1.TimeTrackerStreamImgService],
    })
], TimeTrackerStreamImgModule);
//# sourceMappingURL=time-tracker-stream-img.module.js.map
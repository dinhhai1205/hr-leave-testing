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
exports.TimeTrackerStreamImgController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const iam_1 = require("../../../../core/iam");
const common_2 = require("../../common");
const time_tracker_stream_img_service_1 = require("./time-tracker-stream-img.service");
let TimeTrackerStreamImgController = class TimeTrackerStreamImgController {
    constructor(timeTrackerStreamImgService) {
        this.timeTrackerStreamImgService = timeTrackerStreamImgService;
    }
    async getCompanyImage(key) {
        return this.timeTrackerStreamImgService.getCompanyImage(key);
    }
};
exports.TimeTrackerStreamImgController = TimeTrackerStreamImgController;
__decorate([
    (0, common_1.Get)(`/companys3/:keyEncode/:companyId`),
    (0, iam_1.Auth)(iam_1.AuthType.None, iam_1.AuthType.Permission),
    __param(0, (0, common_1.Param)('keyEncode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeTrackerStreamImgController.prototype, "getCompanyImage", null);
exports.TimeTrackerStreamImgController = TimeTrackerStreamImgController = __decorate([
    (0, common_1.Controller)({ path: common_2.FILE_API_PATH }),
    (0, swagger_1.ApiTags)(common_2.FILE_API_TAG),
    __metadata("design:paramtypes", [time_tracker_stream_img_service_1.TimeTrackerStreamImgService])
], TimeTrackerStreamImgController);
//# sourceMappingURL=time-tracker-stream-img.controller.js.map
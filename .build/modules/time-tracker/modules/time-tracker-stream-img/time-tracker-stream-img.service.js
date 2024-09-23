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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTrackerStreamImgService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const api_service_1 = require("../../libs/api/api.service");
let TimeTrackerStreamImgService = class TimeTrackerStreamImgService {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async getProjectImage(keyEncode) {
        try {
            const res = await (0, axios_1.default)({
                method: 'GET',
                url: `${process.env.TIME_TRACKER_API_URL || 'http://13.250.15.175'}/${keyEncode}`,
                headers: {
                    'tt-authentication': `${process.env.TIME_TRACKER_API_KEY}`,
                },
                responseType: 'arraybuffer',
            });
            const base64 = Buffer.from(res.data, 'binary').toString('base64');
            const contentType = res.headers['content-type'];
            return `data:${contentType};base64,${base64}`;
        }
        catch (error) {
            console.error('Error fetching image:', error.message);
            throw new Error('Failed to fetch image');
        }
    }
    async getCompanyImage(keyEncode) {
        const { data } = await this.apiService.request({
            type: 'STREAM_COMPANY_IMAGE',
            segments: { keyEncode: keyEncode.replace(/\/(?=.)/g, '%2F') },
        });
        return data;
    }
};
exports.TimeTrackerStreamImgService = TimeTrackerStreamImgService;
exports.TimeTrackerStreamImgService = TimeTrackerStreamImgService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.TimeTrackerApiService])
], TimeTrackerStreamImgService);
//# sourceMappingURL=time-tracker-stream-img.service.js.map
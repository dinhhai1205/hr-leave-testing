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
exports.SlackService = void 0;
const common_1 = require("@nestjs/common");
const web_api_1 = require("@slack/web-api");
const slack_config_1 = require("../../config/slack.config");
let SlackService = class SlackService {
    constructor(slackConfig) {
        this.slackConfig = slackConfig;
        this.web = new web_api_1.WebClient(this.slackConfig.botToken);
    }
    async postMessage({ channel, text, blocks = [] }) {
        await this.web.chat.postMessage({
            channel: channel || '#general',
            text,
            blocks,
        });
    }
};
exports.SlackService = SlackService;
exports.SlackService = SlackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, slack_config_1.InjectSlackConfig)()),
    __metadata("design:paramtypes", [Object])
], SlackService);
//# sourceMappingURL=slack.service.js.map
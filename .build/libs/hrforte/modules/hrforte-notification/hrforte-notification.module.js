"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrforteNotificationModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const config_2 = require("../../../../config");
const services_1 = require("../../services");
const hrforte_notification_service_1 = require("./hrforte-notification.service");
const queue_1 = require("./queue");
let HrforteNotificationModule = class HrforteNotificationModule {
};
exports.HrforteNotificationModule = HrforteNotificationModule;
exports.HrforteNotificationModule = HrforteNotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, config_1.ConfigModule.forFeature(config_2.hrforteApiConfig)],
        providers: [services_1.HrforteApiService, hrforte_notification_service_1.HrforteNotificationService, queue_1.SendBulkConsumer],
        exports: [services_1.HrforteApiService],
    })
], HrforteNotificationModule);
//# sourceMappingURL=hrforte-notification.module.js.map
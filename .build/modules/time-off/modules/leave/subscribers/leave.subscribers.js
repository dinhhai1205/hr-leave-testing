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
exports.LeaveEntitySubscriber = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("../../../../../config");
const leave_entity_1 = require("../../../../../core/database/entities/leave.entity");
const leave_service_1 = require("../services/leave.service");
let LeaveEntitySubscriber = class LeaveEntitySubscriber {
    constructor(dataSource, leaveService, dbConfig) {
        this.leaveService = leaveService;
        this.dbConfig = dbConfig;
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return leave_entity_1.LeaveEntity;
    }
    async afterInsert(event) {
        if (this.dbConfig.type === 'mssql') {
            const newNo = await this.leaveService.makeLeaveNo(event.entity.companyId);
            event.entity.leaveNo = newNo;
            await event.manager.save(leave_entity_1.LeaveEntity, event.entity);
        }
    }
};
exports.LeaveEntitySubscriber = LeaveEntitySubscriber;
exports.LeaveEntitySubscriber = LeaveEntitySubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __param(2, (0, config_1.InjectDatabaseConfig)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        leave_service_1.LeaveService, Object])
], LeaveEntitySubscriber);
//# sourceMappingURL=leave.subscribers.js.map
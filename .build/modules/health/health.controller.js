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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const decorators_1 = require("../../common/decorators");
const enums_1 = require("../../common/enums");
let HealthController = class HealthController {
    constructor(health, db, mongo) {
        this.health = health;
        this.db = db;
        this.mongo = mongo;
    }
    healthCheck() {
        return 'Ok';
    }
    check() {
        return this.health.check([
            () => this.db.pingCheck('database'),
            () => this.mongo.pingCheck('mongo'),
        ]);
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.SkipFlag)(enums_1.ESkipFlag.AUTHORIZATION, enums_1.ESkipFlag.API_LOG),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Get)('db'),
    (0, decorators_1.SkipFlag)(enums_1.ESkipFlag.AUTHORIZATION),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.TypeOrmHealthIndicator,
        terminus_1.MongooseHealthIndicator])
], HealthController);
//# sourceMappingURL=health.controller.js.map
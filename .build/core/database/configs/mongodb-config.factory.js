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
exports.MongoDbConfigFactory = void 0;
const common_1 = require("@nestjs/common");
const mongodb_config_1 = require("../../../config/mongodb.config");
let MongoDbConfigFactory = class MongoDbConfigFactory {
    constructor(mongoDbConfig) {
        this.mongoDbConfig = mongoDbConfig;
    }
    createMongooseOptions() {
        const { dbName, host, password: pass, username: user, port, } = this.mongoDbConfig;
        let uri = `mongodb+srv://${host}`;
        if (port) {
            uri = `mongodb://${host}:${port}`;
        }
        const config = {
            uri,
            user,
            pass,
            dbName,
            tls: true,
            retryWrites: true,
            writeConcern: { w: 'majority' },
            minPoolSize: 10,
        };
        if (host === 'localhost') {
            delete config.tls;
        }
        return config;
    }
};
exports.MongoDbConfigFactory = MongoDbConfigFactory;
exports.MongoDbConfigFactory = MongoDbConfigFactory = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongodb_config_1.InjectMongoDbConfig)()),
    __metadata("design:paramtypes", [Object])
], MongoDbConfigFactory);
//# sourceMappingURL=mongodb-config.factory.js.map
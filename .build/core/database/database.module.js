"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const typeorm_1 = require("@nestjs/typeorm");
const utils_1 = require("../../common/utils");
const config_2 = require("../../config");
const configs_1 = require("./configs");
let DatabaseModule = DatabaseModule_1 = class DatabaseModule {
    static forRoot(drivers) {
        drivers = (0, utils_1.uniqueArray)(drivers);
        const dynamicModules = [];
        for (const driver of drivers) {
            if (driver === 'typeorm') {
                dynamicModules.push(this.regisTypeOrmDriver());
            }
            else if (driver === 'mongoose') {
                dynamicModules.push(this.regisMongooseDriver());
            }
        }
        return {
            module: DatabaseModule_1,
            imports: dynamicModules,
        };
    }
    static regisTypeOrmDriver() {
        return typeorm_1.TypeOrmModule.forRootAsync({
            useClass: configs_1.TypeOrmConfigFactory,
            imports: [config_1.ConfigModule.forFeature(config_2.databaseConfig)],
        });
    }
    static regisMongooseDriver() {
        return mongoose_1.MongooseModule.forRootAsync({
            imports: [config_1.ConfigModule.forFeature(config_2.mongoDbConfig)],
            useClass: configs_1.MongoDbConfigFactory,
        });
    }
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = DatabaseModule_1 = __decorate([
    (0, common_1.Module)({})
], DatabaseModule);
//# sourceMappingURL=database.module.js.map
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
exports.TypeOrmConfigFactory = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const config_1 = require("../../../config");
const enums_1 = require("../enums");
const enums_2 = require("../../../common/enums");
let TypeOrmConfigFactory = class TypeOrmConfigFactory {
    constructor(appConfig, databaseConfig) {
        this.appConfig = appConfig;
        this.databaseConfig = databaseConfig;
    }
    createTypeOrmOptions() {
        const { dbName, host, password, port, username, ca, type } = this.databaseConfig;
        const { nodeEnv } = this.appConfig;
        const isLocal = nodeEnv === enums_2.ENodeEnv.LOCAL;
        const config = {
            host,
            port,
            username,
            password,
            database: dbName,
            keepConnectionAlive: true,
            migrationsRun: true,
            synchronize: false,
            namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
            autoLoadEntities: true,
            migrations: [(0, path_1.join)(__dirname, '../migrations/*{.ts,.js}')],
            logging: isLocal,
        };
        switch (type) {
            case enums_1.EDbSqlType.Postgres:
                Object.assign(config, {
                    type: enums_1.EDbSqlType.Postgres,
                });
                if (ca) {
                    Object.assign(config, { ssl: { ca } });
                }
                break;
            case enums_1.EDbSqlType.Mssql:
                Object.assign(config, {
                    type: enums_1.EDbSqlType.Mssql,
                    options: { trustServerCertificate: true },
                });
                break;
            default:
                break;
        }
        return config;
    }
};
exports.TypeOrmConfigFactory = TypeOrmConfigFactory;
exports.TypeOrmConfigFactory = TypeOrmConfigFactory = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, config_1.InjectAppConfig)()),
    __param(1, (0, config_1.InjectDatabaseConfig)()),
    __metadata("design:paramtypes", [Object, Object])
], TypeOrmConfigFactory);
//# sourceMappingURL=typeorm-config.factory.js.map
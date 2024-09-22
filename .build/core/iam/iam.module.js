"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const config_2 = require("../../config");
const octo_user_module_1 = require("../../modules/octopro/modules/octo-user/octo-user.module");
const company_user_role_module_1 = require("../../modules/user/modules/company-user-role/company-user-role.module");
const employee_module_1 = require("../../modules/user/modules/employee/employee.module");
const access_token_service_1 = require("./authentication/access-token.service");
const api_key_service_1 = require("./authentication/api-key.service");
const guards_1 = require("./authentication/guards");
const legacy_access_token_guard_1 = require("./authentication/guards/legacy-access-token.guard");
const legacy_permission_guard_1 = require("./authentication/guards/legacy-permission.guard");
const permission_guard_1 = require("./authentication/guards/permission.guard");
let IamModule = class IamModule {
};
exports.IamModule = IamModule;
exports.IamModule = IamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forFeature(config_2.jwtConfig),
            config_1.ConfigModule.forFeature(config_2.zohoConfig),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule.forFeature(config_2.jwtConfig)],
                useFactory: ({ expiresIn, secret }) => {
                    return {
                        secret: secret,
                        signOptions: {
                            expiresIn,
                        },
                    };
                },
                inject: [config_2.jwtConfig.KEY],
            }),
            employee_module_1.EmployeeModule,
            company_user_role_module_1.CompanyUserRoleModule,
            octo_user_module_1.OctoUserModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.AuthenticationGuard,
            },
            guards_1.AccessTokenGuard,
            guards_1.ApiKeyGuard,
            permission_guard_1.PermissionGuard,
            guards_1.ZohoWebHookGuard,
            access_token_service_1.AccessTokenService,
            api_key_service_1.ApiKeyService,
            guards_1.AuthenticationGuard,
            legacy_access_token_guard_1.LegacyAccessTokenGuard,
            legacy_permission_guard_1.LegacyPermissionGuard,
            guards_1.SlackBotGuard,
        ],
    })
], IamModule);
//# sourceMappingURL=iam.module.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const api_bearer_auth_key_constant_1 = require("./common/constants/api-bearer-auth-key.constant");
const enums_1 = require("./common/enums");
const config_1 = require("./config");
function setupSwagger(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('ESS Leave Module')
        .setDescription('ESS Leave Api ')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, api_bearer_auth_key_constant_1.API_BEARER_AUTH_KEY)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document, {
        jsonDocumentUrl: 'swagger/json',
    });
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: true,
    });
    const { clientUrl, octoClientUrl, appPort, nodeEnv } = app.get(config_1.appConfig.KEY);
    const corsOrigins = [clientUrl, octoClientUrl];
    if (nodeEnv === enums_1.ENodeEnv.LOCAL || nodeEnv === enums_1.ENodeEnv.STAGING) {
        corsOrigins.push('http://localhost:8080');
        corsOrigins.push('http://localhost:3000');
    }
    app.set('trust proxy', true);
    app.disable('x-powered-by');
    app.enableShutdownHooks();
    app.enableVersioning({ type: common_1.VersioningType.URI });
    app.useBodyParser('json', { limit: '10mb' });
    app.enableCors({
        origin: corsOrigins,
        credentials: true,
        exposedHeaders: ['Content-Disposition'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        validationError: { target: false },
    }));
    app.use((0, helmet_1.default)());
    setupSwagger(app);
    await app.init();
    await app.listen(appPort, () => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        common_1.Logger.log(`🏃‍♂️ App running on port: ${appPort}. ⏳ Current local timezone: ${timezone}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
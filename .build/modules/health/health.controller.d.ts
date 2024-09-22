import { HealthCheckService, MongooseHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
export declare class HealthController {
    private health;
    private db;
    private mongo;
    constructor(health: HealthCheckService, db: TypeOrmHealthIndicator, mongo: MongooseHealthIndicator);
    healthCheck(): string;
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}

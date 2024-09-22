import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { LeaveModuleApiLogProducer } from '../../core/queue/producers';
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly appConfig;
    private readonly reflector;
    private readonly leaveModuleApiLogProducer;
    private logger;
    constructor(appConfig: AppConfig, reflector: Reflector, leaveModuleApiLogProducer: LeaveModuleApiLogProducer);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}

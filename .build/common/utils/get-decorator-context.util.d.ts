import type { ExecutionContext } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
export declare const getDecoratorContext: <T>(args: {
    reflector: Reflector;
    key: string;
    context: ExecutionContext;
}) => T | undefined;

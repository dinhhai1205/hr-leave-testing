import type { ExecutionContext } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
export declare function getDecorator<T>(key: string, context: ExecutionContext, reflector: Reflector): T;

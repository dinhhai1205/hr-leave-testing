import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export declare class AssignStartMsMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: (error?: Error) => void): void;
}

import type { FindOneOptions, FindOptionsWhere, QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import type { LoggerService } from '@nestjs/common';
import { PaginationResponseDto } from '../../../common/dto/pagination-response.dto';
import type { PaginationDto } from '../../../common/dto/pagination.dto';
import type { IPermissionActions } from '../../../common/interfaces';
import type { AbstractEntity } from '../entities/abstract.entity';
export declare class LegacyBaseService<E extends AbstractEntity> {
    readonly repository: Repository<E>;
    constructor(repository: Repository<E>);
    readonly entityName: string;
    protected readonly logger: LoggerService;
    protected readonly essentialConditions: {
        isDeleted: boolean;
    };
    checkAuthIsActionAccessLeave(action: keyof IPermissionActions, appMode: string, authRoleDetails?: IPermissionActions): boolean;
    checkAuthIsActionAccessLeaveType(action: keyof IPermissionActions, appMode: string, authRoleDetails?: IPermissionActions): boolean;
    handleTransactionAndRelease(queryRunner: QueryRunner, callback: () => Promise<void>): Promise<void>;
    checkExist(condition: FindOptionsWhere<E> | FindOneOptions<E>): Promise<E>;
    createBaseQueryBuilder(payload: PaginationDto): SelectQueryBuilder<E>;
    getEntitiesByQuery(payload: PaginationDto, callback: () => SelectQueryBuilder<E>): Promise<PaginationResponseDto<E>>;
    getRawByQuery(payload: PaginationDto, callback: () => SelectQueryBuilder<E>): Promise<any[]>;
}

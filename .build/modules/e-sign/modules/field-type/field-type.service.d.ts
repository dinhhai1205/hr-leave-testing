import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../../../../common/dto';
import { FieldTypeEntity } from '../../../../core/database/entities/field-type.entity';
import { TypeOrmBaseService } from '../../../../core/database/services';
import { CreateFieldTypePayloadDto } from '../../modules/field-type/dtos/create-field-type-payload.dto';
export declare class FieldTypeService extends TypeOrmBaseService<FieldTypeEntity> {
    private readonly fieldTypeRepository;
    constructor(fieldTypeRepository: Repository<FieldTypeEntity>);
    createFieldType({ createDto, userEmail }: CreateFieldTypePayloadDto): Promise<FieldTypeEntity[]>;
    getAllFieldTypes(paginationQueryDto: PaginationQueryDto): Promise<import("../../../../common/dto").PaginationResponseDto<FieldTypeEntity>>;
}

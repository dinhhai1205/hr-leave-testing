import { PaginationQueryDto } from '../../../../common/dto';
import { CreateFieldTypeBodyDto } from './dtos/create-field-type-body.dto';
import { FieldTypeService } from './field-type.service';
export declare class FieldTypeController {
    private readonly fieldTypeService;
    constructor(fieldTypeService: FieldTypeService);
    createFieldType(body: CreateFieldTypeBodyDto[]): Promise<import("../../../../core/database").FieldTypeEntity[]>;
    getAllFieldTypes(query: PaginationQueryDto): Promise<import("../../../../common/dto").PaginationResponseDto<import("../../../../core/database").FieldTypeEntity>>;
}

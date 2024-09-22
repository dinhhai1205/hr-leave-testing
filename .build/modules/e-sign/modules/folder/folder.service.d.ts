import { Repository } from 'typeorm';
import { PaginationResponseDto } from '../../../../common/dto';
import { FolderEntity } from '../../../../core/database/entities';
import { TypeOrmBaseService } from '../../../../core/database/services';
import { CreateFolderPayloadDto } from './dtos/create-folder-payload.dto';
import { GetAllFoldersPayloadDto } from './dtos/get-all-folders-payload.dto';
export declare class FolderService extends TypeOrmBaseService<FolderEntity> {
    private readonly folderRepository;
    constructor(folderRepository: Repository<FolderEntity>);
    createFolder(createFolderPayloadDto: CreateFolderPayloadDto): Promise<FolderEntity>;
    getAllFolders(paginationQueryDto: GetAllFoldersPayloadDto): Promise<PaginationResponseDto<FolderEntity>>;
}

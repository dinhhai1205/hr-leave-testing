import { BaseParamDto, PaginationQueryDto } from '../../../../common/dto';
import { IActiveUserData } from '../../../../core/iam/interfaces';
import { CreateFolderBodyDto } from './dtos/create-folder-body.dto';
import { FolderService } from './folder.service';
export declare class FolderController {
    private readonly folderService;
    constructor(folderService: FolderService);
    createFolder({ companyId }: BaseParamDto, body: CreateFolderBodyDto, { userEmail }: IActiveUserData): Promise<import("../../../../core/database").FolderEntity>;
    getAllFolders({ companyId }: BaseParamDto, query: PaginationQueryDto): Promise<import("../../../../common/dto").PaginationResponseDto<import("../../../../core/database").FolderEntity>>;
}

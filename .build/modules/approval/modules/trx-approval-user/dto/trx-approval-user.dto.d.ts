import { AbstractDto } from '../../../../../common/dto/abstract.dto';
import { AspNetUsersDto } from '../../../../user/modules/asp-net-users/dto/asp-net-users.dto';
export declare class TrxApprovalUserDto extends AbstractDto {
    id: number;
    companyId: number;
    moduleId: number;
    recordId: number;
    approverLevel: number;
    userEmail: string;
    createdBy: string;
    aspUser: AspNetUsersDto;
}

import { BaseParamDto } from '../../../../common/dto';
import { ClientService } from './client.service';
import { ClientDto, ClientResponseDto, ClientStatusResponseDto, DeleteClientsDto, DeleteMultiClientsResponseDto, UpdateClientDto } from './dtos';
import { TimeTrackerMapping } from '../../common/decorators/type';
import { PaginationQueryDto } from '../../common';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    getClientById({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping, clientId: string): Promise<ClientResponseDto>;
    getAllClients({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping, paginationQueryDto: PaginationQueryDto): Promise<import("../../../../common/dto").PaginationResponseDto<ClientResponseDto>>;
    createClient({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping, createClientDto: ClientDto): Promise<ClientResponseDto>;
    updateUser({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping, clientId: string, updateClientDto: UpdateClientDto): Promise<ClientResponseDto>;
    deleteMultiClient({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping, deleteClientsDto: DeleteClientsDto): Promise<DeleteMultiClientsResponseDto>;
    deleteClientById({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping, clientId: string): Promise<ClientStatusResponseDto>;
}

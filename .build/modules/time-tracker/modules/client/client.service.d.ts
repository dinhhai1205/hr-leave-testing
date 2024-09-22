import { TimeTrackerApiService } from '../../libs/api/api.service';
import { ClientDto, ClientResponseDto, ClientStatusResponseDto, DeleteClientsDto, DeleteMultiClientsResponseDto, UpdateClientDto } from './dtos';
import { PaginationResponseDto } from '../../../../common/dto';
import { PaginationQueryDto } from '../../common';
export declare class ClientService {
    private readonly apiService;
    constructor(apiService: TimeTrackerApiService);
    createClient({ createClientDto, companyId, }: {
        createClientDto: ClientDto;
        companyId: string;
    }): Promise<ClientResponseDto>;
    getClientById({ clientId, companyId, }: {
        clientId: string;
        companyId: string;
    }): Promise<ClientResponseDto>;
    getAllClients({ companyId, paginationQueryDto, }: {
        companyId: string;
        paginationQueryDto: PaginationQueryDto;
    }): Promise<PaginationResponseDto<ClientResponseDto>>;
    updateClient({ clientId, updateClientDto, companyId, }: {
        clientId: string;
        updateClientDto: UpdateClientDto;
        companyId: string;
    }): Promise<ClientResponseDto>;
    deleteClient({ clientId, companyId, }: {
        clientId: string;
        companyId: string;
    }): Promise<ClientStatusResponseDto>;
    deleteMultiClients({ deleteClientsDto, companyId, }: {
        deleteClientsDto: DeleteClientsDto;
        companyId: string;
    }): Promise<DeleteMultiClientsResponseDto>;
}

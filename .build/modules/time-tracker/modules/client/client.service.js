"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("../../libs/api/api.service");
let ClientService = class ClientService {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async createClient({ createClientDto, companyId, }) {
        const { data } = await this.apiService.request({
            type: 'CREATE_CLIENT',
            data: createClientDto,
            segments: { companyId: companyId },
        });
        return data;
    }
    async getClientById({ clientId, companyId, }) {
        const { data } = await this.apiService.request({
            type: 'GET_CLIENT_BY_ID',
            segments: { companyId: companyId, clientId: clientId },
        });
        return data;
    }
    async getAllClients({ companyId, paginationQueryDto, }) {
        const { data } = await this.apiService.request({
            type: 'GET_ALL_CLIENTS',
            segments: { companyId: companyId },
            params: paginationQueryDto,
        });
        return data;
    }
    async updateClient({ clientId, updateClientDto, companyId, }) {
        const { data } = await this.apiService.request({
            type: 'UPDATE_CLIENT',
            data: updateClientDto,
            segments: { companyId: companyId, clientId: clientId },
        });
        return data;
    }
    async deleteClient({ clientId, companyId, }) {
        const { data } = await this.apiService.request({
            type: 'DELETE_CLIENT',
            segments: { companyId: companyId, clientId: clientId },
        });
        return data;
    }
    async deleteMultiClients({ deleteClientsDto, companyId, }) {
        const { data } = await this.apiService.request({
            type: 'DELETE_MULTIPLE_CLIENT',
            segments: { companyId: companyId },
            data: deleteClientsDto,
        });
        return data;
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.TimeTrackerApiService])
], ClientService);
//# sourceMappingURL=client.service.js.map
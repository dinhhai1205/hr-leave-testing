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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../common/decorators");
const dto_1 = require("../../../../common/dto");
const iam_1 = require("../../../../core/iam");
const time_tracker_path_constant_1 = require("../../common/constants/time-tracker-path.constant");
const client_service_1 = require("./client.service");
const dtos_1 = require("./dtos");
const time_tracker_emp_info_decorator_1 = require("../../common/decorators/time-tracker-emp-info.decorator");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
const enums_1 = require("../../../../common/enums");
const common_2 = require("../../common");
let ClientController = class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    async getClientById({ companyId }, { timeTrackerCompanyId }, clientId) {
        return this.clientService.getClientById({
            clientId,
            companyId: timeTrackerCompanyId,
        });
    }
    async getAllClients({ companyId }, { timeTrackerCompanyId }, paginationQueryDto) {
        return this.clientService.getAllClients({
            companyId: timeTrackerCompanyId,
            paginationQueryDto,
        });
    }
    async createClient({ companyId }, { timeTrackerCompanyId }, createClientDto) {
        return this.clientService.createClient({
            createClientDto,
            companyId: timeTrackerCompanyId,
        });
    }
    async updateUser({ companyId }, { timeTrackerCompanyId }, clientId, updateClientDto) {
        return this.clientService.updateClient({
            clientId,
            updateClientDto,
            companyId: timeTrackerCompanyId,
        });
    }
    async deleteMultiClient({ companyId }, { timeTrackerCompanyId }, deleteClientsDto) {
        return this.clientService.deleteMultiClients({
            companyId: timeTrackerCompanyId,
            deleteClientsDto,
        });
    }
    async deleteClientById({ companyId }, { timeTrackerCompanyId }, clientId) {
        return this.clientService.deleteClient({
            clientId,
            companyId: timeTrackerCompanyId,
        });
    }
};
exports.ClientController = ClientController;
__decorate([
    (0, common_1.Get)(':clientId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get client by Id',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiResponse)({ type: dtos_1.ClientResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Param)('clientId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClientById", null);
__decorate([
    (0, common_1.Get)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all clients of a company',
    }),
    (0, swagger_1.ApiQuery)({ type: common_2.PaginationQueryDto }),
    (0, decorators_1.ApiOkResponsePaginated)(dtos_1.ClientResponseDto),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, common_2.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getAllClients", null);
__decorate([
    (0, common_1.Post)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new client for a company',
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.ClientDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.ClientResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, dtos_1.ClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "createClient", null);
__decorate([
    (0, common_1.Patch)(':clientId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Update client by Id',
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.UpdateClientDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.ClientResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Param)('clientId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, String, dtos_1.UpdateClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete multiple clients',
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.DeleteClientsDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.DeleteMultiClientsResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, dtos_1.DeleteClientsDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "deleteMultiClient", null);
__decorate([
    (0, common_1.Delete)(':clientId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete client by Id',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.ClientStatusResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Param)('clientId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "deleteClientById", null);
exports.ClientController = ClientController = __decorate([
    (0, swagger_1.ApiTags)(time_tracker_path_constant_1.CLIENT_API_TAG),
    (0, common_1.Controller)(time_tracker_path_constant_1.CLIENT_API_PATH),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
//# sourceMappingURL=client.controller.js.map
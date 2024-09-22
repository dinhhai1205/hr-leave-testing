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
exports.DocumentActionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../../common/utils");
const document_action_entity_1 = require("../../../../core/database/entities/document-action.entity");
const services_1 = require("../../../../core/database/services");
const company_user_role_service_1 = require("../../../user/modules/company-user-role/company-user-role.service");
const employee_service_1 = require("../../../user/modules/employee/employee.service");
const constants_1 = require("../../constants");
const enums_1 = require("../../enums");
const create_document_action_setting_dto_1 = require("../../modules/document-action/dtos/create-document-action-setting.dto");
const document_action_field_service_1 = require("../document-action-field/document-action-field.service");
let DocumentActionService = class DocumentActionService extends services_1.TypeOrmBaseService {
    constructor(documentActionRepository, documentActionFieldService, companyUserRoleService, employeeService) {
        super(documentActionRepository);
        this.documentActionRepository = documentActionRepository;
        this.documentActionFieldService = documentActionFieldService;
        this.companyUserRoleService = companyUserRoleService;
        this.employeeService = employeeService;
    }
    async updateDocumentActionSettings(args) {
        const { userEmail, deletedActions = [], payload, companyId, documentId, actCommandQuery = true, } = args;
        let documentActions = args.documentActions || [];
        if (typeof documentActions === 'string') {
            documentActions = (0, utils_1.safeJsonParse)({
                text: documentActions,
                defaultValueReturn: [],
            });
        }
        const mapping = {};
        for (const documentAction of documentActions) {
            mapping[documentAction.id] = documentAction;
        }
        if (deletedActions?.length) {
            const deleteDocumentAction = [];
            for (const actionId of deletedActions) {
                const existingAction = mapping[actionId];
                if (!existingAction) {
                    throw new common_1.NotFoundException(`Not found action #${actionId} to delete`);
                }
                deleteDocumentAction.push(existingAction);
                delete mapping[actionId];
            }
            actCommandQuery &&
                (await this.deleteMultipleDocumentAction(userEmail, deleteDocumentAction));
        }
        if (!payload?.length)
            return { isBulk: false, entities: [] };
        const createDocumentActionDto = [];
        const updateDocumentActionDto = [];
        const documentActionFieldsDto = [];
        const validateCreateDtoPromises = [];
        let bulkAction = null;
        for (let i = 0; i < payload.length; i++) {
            const actionSettingPayload = payload[i];
            const { id, fieldSettings, isBulk } = actionSettingPayload;
            let fields = null;
            if (isBulk === true) {
                if (bulkAction) {
                    throw new common_1.ConflictException(`Existing a recipient at index #${i} is bulk actions`);
                }
                bulkAction = actionSettingPayload;
            }
            if (fieldSettings) {
                documentActionFieldsDto.push(...fieldSettings);
                fields = fieldSettings;
            }
            if (id) {
                const existingDocumentAction = mapping[id];
                if (!existingDocumentAction) {
                    throw new common_1.NotFoundException(`Not found document action with id #${id} to update`);
                }
                if ((0, utils_1.allValueIsSameObjects)(actionSettingPayload, existingDocumentAction)) {
                    continue;
                }
                if (actionSettingPayload?.documentId) {
                    delete actionSettingPayload.documentId;
                }
                updateDocumentActionDto.push({
                    updatedBy: userEmail,
                    updatedOn: moment.utc().toDate(),
                    documentId,
                    fields,
                    ...actionSettingPayload,
                });
                continue;
            }
            const createDto = (0, class_transformer_1.plainToInstance)(create_document_action_setting_dto_1.CreateDocumentActionSettingDto, {
                ...actionSettingPayload,
                documentId,
                companyId,
            });
            validateCreateDtoPromises.push((0, class_validator_1.validateOrReject)(createDto));
            const createEntity = this.createEntity(createDto, { userEmail });
            createDocumentActionDto.push(createEntity);
        }
        validateCreateDtoPromises.length &&
            (await Promise.all(validateCreateDtoPromises));
        await this.documentActionFieldService.validateDocumentActionField(documentActionFieldsDto);
        const actionDtos = [...updateDocumentActionDto, ...createDocumentActionDto];
        const entities = actCommandQuery
            ? await this.documentActionRepository.save(actionDtos)
            : actionDtos;
        return { isBulk: bulkAction ? true : false, entities };
    }
    async deleteMultipleDocumentAction(userEmail, documentActions) {
        if (!documentActions?.length)
            return;
        return Promise.all(documentActions.map(documentAction => {
            if (!documentAction) {
                throw new common_1.InternalServerErrorException('Not found document action to delete');
            }
            const { id } = documentAction;
            if (!id) {
                throw new common_1.InternalServerErrorException('Delete document action failed');
            }
            return this.delete(id, {
                userEmail,
                existingEntity: documentAction,
            });
        }));
    }
    async validateRecipientEmailsBelongToCompany(companyId, recipientEmails) {
        if (!recipientEmails)
            return;
        const [adminEmails, employeeEmails] = await Promise.all([
            this.companyUserRoleService.findAdminsExistWithEmails(companyId, recipientEmails),
            this.employeeService.findEmployeesExistWithEmails(companyId, recipientEmails),
        ]);
        const mergeAdminAndEssEmail = [...adminEmails, ...employeeEmails];
        if (!mergeAdminAndEssEmail) {
            return;
        }
        const emailsSet = new Set(mergeAdminAndEssEmail);
        const uniqueRecipientsEmails = Array.from(emailsSet);
        const recipientEmailsTable = uniqueRecipientsEmails.reduce((prev, curr) => {
            prev[curr] = true;
            return prev;
        }, {});
        for (const email of recipientEmails) {
            if (recipientEmailsTable[email]) {
                continue;
            }
            throw new common_1.BadRequestException(`The user with email ${email} dose not exist in company ${companyId}`);
        }
    }
    async updateDocumentActionStatus({ actionId, userEmail, status, }) {
        return this.update(actionId, {
            status,
        }, { userEmail });
    }
    async updateDocumentActionZohoActionId({ actionId, zohoActionId, }) {
        await this.update(actionId, {
            zohoActionId,
        });
    }
    async updateZohoDocumentActionInfo(updateDtos, zohoActions) {
        const dtoMap = new Map();
        for (let i = 0; i < updateDtos.length; i++) {
            const element = updateDtos[i];
            dtoMap.set(element.zohoActionId, i);
        }
        for (const zohoAction of zohoActions) {
            const updateDtoIndex = dtoMap.get(zohoAction.action_id);
            Object.assign(updateDtos[updateDtoIndex], {
                status: zohoAction.action_status,
            });
        }
        return this.documentActionRepository.save(updateDtos);
    }
    async updateZohoDocumentActionIds(updateDto) {
        return this.documentActionRepository.save(updateDto);
    }
    calculateSignPercentage(documentStatus, documentActions) {
        if (documentStatus === enums_1.DocumentStatus.Draft)
            return 0;
        if (!documentActions?.length)
            return 0;
        const totalActionsPoint = documentActions.length;
        let actionsPoint = 0;
        for (const action of documentActions) {
            const { type, status, recipientEmail } = action;
            if (!constants_1.ACTION_TYPE_PERCENTAGE_TABLE[type]) {
                throw new common_1.NotFoundException(`Cannot find the type ${type} of the email ${recipientEmail} to calculate percentage.`);
            }
            const pointPercent = constants_1.ACTION_TYPE_PERCENTAGE_TABLE[type][status];
            if (pointPercent === undefined) {
                throw new common_1.NotFoundException(`Cannot find the type ${type} and status ${status} of the email ${recipientEmail} to calculate percentage.`);
            }
            if (actionsPoint === 0) {
                actionsPoint = pointPercent;
            }
            else {
                actionsPoint = Number((actionsPoint + pointPercent).toFixed(2));
            }
        }
        if (actionsPoint === 0)
            return 0;
        const percent = Math.round(Number((actionsPoint / totalActionsPoint).toFixed(2)) * 100);
        return percent;
    }
    async updateDocumentActionStatusFromZohoWebhook(document, documentAction, operationType, requestStatus, performedByEmail, currentDate) {
        const actionStatusToUpdate = constants_1.OPERATION_TYPE_ACTION_STATUS_MAPPING[operationType];
        if (!actionStatusToUpdate) {
            return `Skip update action because action status is ${actionStatusToUpdate}`;
        }
        if (documentAction.status === actionStatusToUpdate) {
            return `Skip update action because documentAction.status === actionStatusToUpdate`;
        }
        const updateDtos = [
            {
                id: documentAction.id,
                status: actionStatusToUpdate,
                updatedBy: performedByEmail,
                updatedOn: currentDate,
            },
        ];
        if (document.isSequential &&
            requestStatus !== enums_1.DocumentStatus.Declined &&
            requestStatus !== enums_1.DocumentStatus.Expired &&
            requestStatus !== enums_1.DocumentStatus.Recalled) {
            const allNextActionDtos = this.getNextSigningOrderActionDtos(document.documentActions, documentAction, actionStatusToUpdate);
            updateDtos.push(...allNextActionDtos);
        }
        return this.documentActionRepository.save(updateDtos);
    }
    getNextSigningOrderActionDtos(actions, incomingAction, incomingUpdateStatus) {
        const signingOrderMap = new Map();
        const signingOrders = [];
        let allActionIsSignedViewedApproved = true;
        for (const action of actions) {
            if (!signingOrderMap.has(action.signingOrder)) {
                signingOrderMap.set(action.signingOrder, true);
                signingOrders.push(action.signingOrder);
            }
            if (action.signingOrder === incomingAction.signingOrder) {
                if (action.id === incomingAction.id) {
                    if ((action.type === enums_1.DocumentActionType.Approver &&
                        incomingUpdateStatus !== enums_1.DocumentActionStatus.Approved) ||
                        (action.type === enums_1.DocumentActionType.Sign &&
                            incomingUpdateStatus !== enums_1.DocumentActionStatus.Signed)) {
                        allActionIsSignedViewedApproved = false;
                    }
                }
                else {
                    if ((action.type === enums_1.DocumentActionType.Approver &&
                        action.status !== enums_1.DocumentActionStatus.Approved) ||
                        (action.type === enums_1.DocumentActionType.Sign &&
                            action.status !== enums_1.DocumentActionStatus.Signed)) {
                        allActionIsSignedViewedApproved = false;
                    }
                }
            }
        }
        if (allActionIsSignedViewedApproved === false)
            return [];
        signingOrders.sort((a, b) => a - b);
        const nextSigningOrderMap = new Map();
        for (let i = 0; i < signingOrders.length - 1; i++) {
            nextSigningOrderMap.set(signingOrders[i], signingOrders[i + 1]);
        }
        const nextOrder = nextSigningOrderMap.get(incomingAction.signingOrder);
        if (!nextOrder) {
            return [];
        }
        return actions.reduce((dtos, action) => {
            const { signingOrder, id } = action;
            if (signingOrder === nextOrder) {
                dtos.push({ id, status: enums_1.DocumentActionStatus.Unopened });
            }
            return dtos;
        }, []);
    }
};
exports.DocumentActionService = DocumentActionService;
exports.DocumentActionService = DocumentActionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_action_entity_1.DocumentActionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        document_action_field_service_1.DocumentActionFieldService,
        company_user_role_service_1.CompanyUserRoleService,
        employee_service_1.EmployeeService])
], DocumentActionService);
//# sourceMappingURL=document-action.service.js.map
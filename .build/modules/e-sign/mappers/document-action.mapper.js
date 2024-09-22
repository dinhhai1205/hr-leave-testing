"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentActionMapper = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const utils_1 = require("../../../common/utils");
const entities_1 = require("../../../core/database/entities");
const enums_1 = require("../enums");
const zoho_1 = require("../libs/zoho");
const mappers_1 = require("../mappers");
class DocumentActionMapper {
    static toZohoRequestAction(documentAction) {
        if (!documentAction) {
            throw new common_1.BadRequestException(`Document action is empty`);
        }
        const { type, recipientEmail, recipientName, signingOrder, deliveryMode, inPersonEmail, inPersonName, privateNote, recipientCountrycode, recipientCountrycodeIso, recipientPhonenumber, verifyRecipient, verificationType, verificationCode, language, isBulk = false, } = documentAction;
        const zohoRequestActionDto = new zoho_1.ZohoRequestActionDto();
        zohoRequestActionDto.action_type = type || enums_1.DocumentActionType.Sign;
        zohoRequestActionDto.recipient_email = recipientEmail;
        zohoRequestActionDto.recipient_name = recipientName;
        zohoRequestActionDto.signing_order = signingOrder;
        zohoRequestActionDto.verify_recipient = verifyRecipient || false;
        zohoRequestActionDto.private_notes = privateNote || '';
        zohoRequestActionDto.is_bulk = isBulk;
        zohoRequestActionDto.verification_type =
            verificationType || enums_1.DocumentActionVerificationType.None;
        zohoRequestActionDto.delivery_mode =
            deliveryMode || enums_1.DocumentActionDeliveryMode.Email;
        zohoRequestActionDto.language =
            language || enums_1.DocumentActionLanguageCode.English;
        if (type === enums_1.DocumentActionType.InPerson) {
            if (!inPersonName || !inPersonEmail) {
                throw new common_1.BadRequestException(`In person name and email is require in_person mode`);
            }
            zohoRequestActionDto.in_person_email = inPersonEmail;
            zohoRequestActionDto.in_person_name = inPersonName;
        }
        if (deliveryMode === enums_1.DocumentActionDeliveryMode.EmailAndPhone ||
            verificationType === enums_1.DocumentActionVerificationType.Sms) {
            if (!recipientCountrycode ||
                !recipientCountrycodeIso ||
                !recipientPhonenumber) {
                throw new common_1.BadRequestException(`Countrycode, countryCodeIso, and phonenumber is require with Sms mode`);
            }
            zohoRequestActionDto.recipient_countrycode = recipientCountrycode;
            zohoRequestActionDto.recipient_countrycode_iso = recipientCountrycodeIso;
            zohoRequestActionDto.recipient_phonenumber = recipientPhonenumber;
        }
        if (verifyRecipient === true &&
            verificationType === enums_1.DocumentActionVerificationType.Offline) {
            if (!verificationCode) {
                throw new common_1.BadRequestException(`Verification code is require in OFFLINE mode`);
            }
            zohoRequestActionDto.verification_code = verificationCode;
        }
        return zohoRequestActionDto;
    }
    static toZohoRequestActionSubmit(documentActions, zohoResponseDto, documentFileZohoIdTable, userEmail) {
        const { requests: zohoDocument } = zohoResponseDto;
        const { actions: zohoDocumentAction, is_sequential: isSequential } = zohoDocument;
        const submitZohoRequestActionsDto = [];
        const updateZohoActionsDto = [];
        const firstSigningOrder = documentActions[0].signingOrder;
        const documentActionMap = new Map();
        for (const action of documentActions) {
            const { recipientEmail, recipientName, signingOrder } = action;
            documentActionMap.set(`${recipientEmail}:${recipientName}:${signingOrder}`, action);
        }
        for (let i = 0; i < documentActions.length; i++) {
            const { action_id, action_type, recipient_email, recipient_name, in_person_email, in_person_name, signing_order, } = zohoDocumentAction[i];
            const documentAction = documentActionMap.get(`${recipient_email}:${recipient_name}:${signing_order}`);
            if (!documentAction) {
                throw new common_1.NotFoundException(`Cannot found the action ${recipient_name} ${recipient_email} at index ${i}`);
            }
            const { id, type } = documentAction;
            let fields = documentAction.fields;
            if (typeof fields === 'string') {
                fields = (0, utils_1.safeJsonParse)({ text: fields, defaultValueReturn: null });
            }
            const submitZohoRequestActionDto = new zoho_1.SubmitZohoRequestActionBodyDto();
            submitZohoRequestActionDto.action_id = action_id;
            submitZohoRequestActionDto.action_type =
                action_type;
            submitZohoRequestActionDto.recipient_email = recipient_email;
            submitZohoRequestActionDto.recipient_name = recipient_name;
            if (action_type === enums_1.DocumentActionType.InPerson) {
                if (!in_person_name || !in_person_email) {
                    throw new common_1.BadRequestException(`Missing in person name or email`);
                }
                submitZohoRequestActionDto.in_person_email = in_person_email;
                submitZohoRequestActionDto.in_person_email = in_person_email;
            }
            if (type === enums_1.DocumentActionType.Sign ||
                type === enums_1.DocumentActionType.InPerson) {
                submitZohoRequestActionDto.fields =
                    mappers_1.DocumentActionFieldMapper.toZohoRequestActionField(zohoDocumentAction[i].action_id, documentFileZohoIdTable, fields);
            }
            submitZohoRequestActionsDto.push(submitZohoRequestActionDto);
            const zohoActionDto = {
                id,
                zohoActionId: zohoDocumentAction[i].action_id,
                updatedBy: userEmail,
                updatedOn: moment.utc().toDate(),
            };
            const isFirstIndex = i === 0;
            if (isSequential === false) {
                Object.assign(zohoActionDto, { status: enums_1.DocumentActionStatus.Unopened });
            }
            else {
                if (isFirstIndex) {
                    Object.assign(zohoActionDto, {
                        status: enums_1.DocumentActionStatus.Unopened,
                    });
                }
                else {
                    if (signing_order === firstSigningOrder) {
                        Object.assign(zohoActionDto, {
                            status: enums_1.DocumentActionStatus.Unopened,
                        });
                    }
                    else {
                        Object.assign(zohoActionDto, {
                            status: enums_1.DocumentActionStatus.NoAction,
                        });
                    }
                }
            }
            updateZohoActionsDto.push(zohoActionDto);
        }
        return { submitZohoRequestActionsDto, updateZohoActionsDto };
    }
    static fromTemplate(documentId, userEmail, documentTemplate, templateFileMappingFileTable, customDocumentActions) {
        if (customDocumentActions?.length) {
            if (customDocumentActions.length !== documentTemplate.documentActions.length) {
                throw new common_1.BadRequestException(`Total recipients of payload should be the same with template`);
            }
        }
        const { companyId, documentActions } = documentTemplate;
        const sortedActionsTemplate = this.sortAscDocumentActions(documentActions);
        const sortedActionsPayload = this.sortAscDocumentActions(customDocumentActions);
        const actionsDtos = [];
        for (let i = 0; i < sortedActionsTemplate.length; i++) {
            const actionTemplate = sortedActionsTemplate[i];
            const actionPayload = sortedActionsPayload[i] || {};
            const documentActionEntity = new entities_1.DocumentActionEntity();
            documentActionEntity.companyId = companyId;
            documentActionEntity.type = actionTemplate.type;
            documentActionEntity.signingOrder = actionTemplate.signingOrder;
            documentActionEntity.status = enums_1.DocumentActionStatus.NoAction;
            documentActionEntity.recipientIndex = actionTemplate.recipientIndex;
            documentActionEntity.documentId = documentId;
            documentActionEntity.createdBy = userEmail;
            documentActionEntity.createdOn = moment.utc().toDate();
            documentActionEntity.isDeleted = false;
            Object.assign(documentActionEntity, {
                fields: actionTemplate.fields.map(field => ({
                    ...field,
                    documentId,
                    documentFileId: templateFileMappingFileTable[`${field.documentFileId}`],
                })),
            });
            documentActionEntity.recipientName =
                actionPayload.recipientName || actionTemplate.recipientName;
            documentActionEntity.recipientEmail =
                actionPayload.recipientEmail || actionTemplate.recipientEmail;
            documentActionEntity.deliveryMode =
                actionPayload.deliveryMode || actionTemplate.deliveryMode;
            documentActionEntity.privateNote =
                actionPayload.privateNote || actionTemplate.privateNote;
            documentActionEntity.recipientCountrycode =
                actionPayload.recipientCountrycode ||
                    actionTemplate.recipientCountrycode;
            documentActionEntity.recipientCountrycodeIso =
                actionPayload.recipientCountrycodeIso ||
                    actionTemplate.recipientCountrycodeIso;
            documentActionEntity.recipientPhonenumber =
                actionPayload.recipientPhonenumber ||
                    actionTemplate.recipientPhonenumber;
            documentActionEntity.verifyRecipient =
                actionPayload.verifyRecipient || actionTemplate.verifyRecipient;
            documentActionEntity.verificationType =
                actionPayload.verificationType || actionTemplate.verificationType;
            documentActionEntity.verificationCode =
                actionPayload.verificationCode || actionTemplate.verificationCode;
            documentActionEntity.language =
                actionPayload.language || actionTemplate.language;
            actionsDtos.push(documentActionEntity);
        }
        return actionsDtos;
    }
    static sortAscDocumentActions(documentActions) {
        if (!documentActions?.length)
            return [];
        return documentActions.sort((actionA, actionB) => {
            if (actionA.recipientIndex < actionB.recipientIndex) {
                return -1;
            }
            else if (actionA.recipientIndex > actionB.recipientIndex) {
                return 1;
            }
            return 0;
        });
    }
}
exports.DocumentActionMapper = DocumentActionMapper;
//# sourceMappingURL=document-action.mapper.js.map
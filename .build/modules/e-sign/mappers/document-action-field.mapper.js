"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentActionFieldMapper = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../common/utils");
const enums_1 = require("../enums");
const zoho_1 = require("../libs/zoho");
const keysOfZohoFieldDtoTable = {
    [enums_1.FieldCategory.Checkbox]: 'check_boxes',
    [enums_1.FieldCategory.TextField]: 'text_fields',
    [enums_1.FieldCategory.Image]: 'image_fields',
    [enums_1.FieldCategory.DateField]: 'date_fields',
    [enums_1.FieldCategory.RadioGroup]: 'radio_groups',
    [enums_1.FieldCategory.DropDown]: 'dropdown_fields',
};
const keysOfZohoFieldDtoSpecificTable = {
    [enums_1.FieldCategory.Checkbox]: zoho_1.ZohoCheckBoxDto.getKeys(),
    [enums_1.FieldCategory.TextField]: zoho_1.ZohoTextFieldDto.getKeys(),
    [enums_1.FieldCategory.Image]: zoho_1.ZohoImageFieldDto.getKeys(),
    [enums_1.FieldCategory.DateField]: zoho_1.ZohoDateFieldDto.getKeys(),
    [enums_1.FieldCategory.RadioGroup]: zoho_1.ZohoRadioGroupDto.getKeys(),
    [enums_1.FieldCategory.DropDown]: zoho_1.ZohoDropdownDto.getKeys(),
};
class DocumentActionFieldMapper {
    static toZohoRequestActionField(actionId, documentFileZohoIdTable, documentActionFields) {
        if (!documentActionFields?.length) {
            throw new common_1.BadRequestException('Cannot parse to request action field because fields is empty');
        }
        if (typeof documentActionFields === 'string') {
            documentActionFields = (0, utils_1.safeJsonParse)({
                text: documentActionFields,
                defaultValueReturn: [],
            });
        }
        const zohoRequestActionFieldDto = {};
        for (let i = 0; i < documentActionFields.length; i++) {
            const documentActionField = documentActionFields[i];
            const { fieldCategory, documentFileId } = documentActionField;
            if (!fieldCategory) {
                throw new common_1.BadRequestException(`Missing field category. Field index #${i}`);
            }
            if (!documentFileId) {
                throw new common_1.BadRequestException(`Missing document file id. Field index #${i}`);
            }
            const keysOfZohoFieldDto = keysOfZohoFieldDtoTable[fieldCategory];
            const keysOfZohoFieldDtoSpecific = keysOfZohoFieldDtoSpecificTable[fieldCategory];
            const objectZohoFieldDtoSpecific = {};
            for (const keyOfZohoClassSpecific of keysOfZohoFieldDtoSpecific) {
                if (keyOfZohoClassSpecific === 'document_id') {
                    Object.assign(objectZohoFieldDtoSpecific, {
                        document_id: documentFileZohoIdTable[`${documentFileId}`],
                    });
                    continue;
                }
                if (keyOfZohoClassSpecific === 'action_id') {
                    Object.assign(objectZohoFieldDtoSpecific, { action_id: actionId });
                    continue;
                }
                const keyOfDocumentActionField = (0, utils_1.snakeToCamelCase)(keyOfZohoClassSpecific);
                const fieldValue = documentActionField[keyOfDocumentActionField];
                if (fieldValue === undefined || fieldValue === null)
                    continue;
                if ((0, class_validator_1.isObject)(fieldValue) || Array.isArray(fieldValue)) {
                    Object.assign(objectZohoFieldDtoSpecific, {
                        [keyOfZohoClassSpecific]: (0, utils_1.convertObjectKeyToSnakeCase)(fieldValue, [
                            'dropdownValueId',
                            'subFieldId',
                        ]),
                    });
                }
                else {
                    Object.assign(objectZohoFieldDtoSpecific, {
                        [keyOfZohoClassSpecific]: fieldValue,
                    });
                }
            }
            if ((0, utils_1.isEmptyObject)(objectZohoFieldDtoSpecific))
                continue;
            if (!zohoRequestActionFieldDto[keysOfZohoFieldDto]) {
                zohoRequestActionFieldDto[keysOfZohoFieldDto] = [];
            }
            zohoRequestActionFieldDto[keysOfZohoFieldDto]?.push(objectZohoFieldDtoSpecific);
        }
        return zohoRequestActionFieldDto;
    }
}
exports.DocumentActionFieldMapper = DocumentActionFieldMapper;
//# sourceMappingURL=document-action-field.mapper.js.map
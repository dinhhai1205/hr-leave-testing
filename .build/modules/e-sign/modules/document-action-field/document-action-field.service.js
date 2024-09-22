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
exports.DocumentActionFieldService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../enums");
const dtos_1 = require("../../modules/document-action-field/dtos");
const field_type_service_1 = require("../field-type/field-type.service");
let DocumentActionFieldService = class DocumentActionFieldService {
    constructor(fieldTypeService) {
        this.fieldTypeService = fieldTypeService;
    }
    async validateDocumentActionField(fields) {
        const errors = [];
        if (fields?.length < 0)
            return;
        const { data: fieldTypes } = await this.fieldTypeService.getAllFieldTypes({
            isDeleted: false,
            page: 1,
            q: '',
            take: 20,
            isSelectAll: false,
        });
        const fieldTypesTable = fieldTypes.reduce((prev, curr) => {
            prev[curr.id] = curr;
            return prev;
        }, {});
        for (const fieldData of fields) {
            const fieldTypeDb = fieldTypesTable[fieldData.fieldTypeId];
            if (fieldTypeDb.fieldTypeName !== fieldData.fieldTypeName) {
                throw new common_1.BadRequestException(`FieldTypeName: ${fieldData.fieldTypeName} does not match fieldTypeId: ${fieldData.fieldTypeId}`);
            }
            const checkFieldData = this.checkFieldCategory(fieldData.fieldTypeName, fieldData.fieldCategory);
            if (!checkFieldData) {
                throw new common_1.BadRequestException(`Field type name ${fieldData.fieldTypeName} does not belong to ${fieldData.fieldCategory} category`);
            }
            const fieldDto = (0, class_transformer_1.plainToClass)(dtos_1.FieldSettingsDto, fieldData);
            const validationErrors = await (0, class_validator_1.validate)(fieldDto);
            if (validationErrors.length > 0) {
                validationErrors.forEach(error => {
                    if (error.constraints) {
                        Object.entries(error.constraints).forEach(([key, value]) => {
                            errors.push(value);
                        });
                    }
                    else {
                        errors.push(`An error happened with property ${error.property}`);
                    }
                });
            }
            if (fieldDto.textProperty) {
                const textPropertyErrors = await (0, class_validator_1.validate)(fieldDto.textProperty);
                if (textPropertyErrors.length > 0) {
                    textPropertyErrors.forEach(error => {
                        if (error.constraints) {
                            for (const [, value] of Object.entries(error.constraints)) {
                                errors.push(value);
                            }
                        }
                        else {
                            errors.push(`An error happened with property ${error.property}`);
                        }
                    });
                }
            }
            fieldDto.subFields?.forEach(async (subField) => {
                const subFieldErrors = await (0, class_validator_1.validate)(subField);
                if (subFieldErrors.length > 0) {
                    subFieldErrors.forEach(error => {
                        if (error.constraints) {
                            for (const [, value] of Object.entries(error.constraints)) {
                                errors.push(value);
                            }
                        }
                        else {
                            errors.push(`An error happened with property ${error.property}`);
                        }
                    });
                }
            });
            fieldDto.dropdownValues?.forEach(async (dropdownValue) => {
                const dropdownValueErrors = await (0, class_validator_1.validate)(dropdownValue);
                if (dropdownValueErrors.length > 0) {
                    dropdownValueErrors.forEach(error => {
                        if (error.constraints) {
                            for (const [, value] of Object.entries(error.constraints)) {
                                errors.push(value);
                            }
                        }
                        else {
                            errors.push(`An error happened with property ${error.property}`);
                        }
                    });
                }
            });
        }
        if (errors?.length) {
            throw new common_1.BadRequestException(errors);
        }
    }
    checkFieldCategory(fieldTypeName, fieldCategory) {
        switch (fieldTypeName) {
            case enums_1.FieldTypeName.Name:
            case enums_1.FieldTypeName.JobTitle:
            case enums_1.FieldTypeName.Company:
            case enums_1.FieldTypeName.Textfield:
            case enums_1.FieldTypeName.Email:
                return fieldCategory === enums_1.FieldCategory.TextField;
            case enums_1.FieldTypeName.RadioGroup:
                return fieldCategory === enums_1.FieldCategory.RadioGroup;
            case enums_1.FieldTypeName.Checkbox:
                return fieldCategory === enums_1.FieldCategory.Checkbox;
            case enums_1.FieldTypeName.Stamp:
            case enums_1.FieldTypeName.Initial:
            case enums_1.FieldTypeName.Image:
            case enums_1.FieldTypeName.Signature:
                return fieldCategory === enums_1.FieldCategory.Image;
            case enums_1.FieldTypeName.Date:
            case enums_1.FieldTypeName.CustomDate:
                return fieldCategory === enums_1.FieldCategory.DateField;
            case enums_1.FieldTypeName.Dropdown:
                return fieldCategory === enums_1.FieldCategory.DropDown;
            default:
                return false;
        }
    }
};
exports.DocumentActionFieldService = DocumentActionFieldService;
exports.DocumentActionFieldService = DocumentActionFieldService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [field_type_service_1.FieldTypeService])
], DocumentActionFieldService);
//# sourceMappingURL=document-action-field.service.js.map
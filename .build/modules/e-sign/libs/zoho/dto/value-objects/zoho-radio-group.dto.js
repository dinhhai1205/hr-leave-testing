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
exports.ZohoRadioGroupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const zoho_field_common_property_dto_1 = require("./zoho-field-common-property.dto");
class ZohoRadioGroupDto extends (0, swagger_1.PickType)(zoho_field_common_property_dto_1.ZohoFieldCommonProperty, [
    'field_name',
    'field_label',
    'field_type_name',
    'document_id',
    'action_id',
    'is_mandatory',
    'page_no',
    'default_value',
]) {
    static getKeys() {
        return [
            'field_name',
            'field_label',
            'field_type_name',
            'document_id',
            'action_id',
            'is_mandatory',
            'page_no',
            'default_value',
            'sub_fields',
        ];
    }
}
exports.ZohoRadioGroupDto = ZohoRadioGroupDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ZohoRadioGroupDto.prototype, "sub_fields", void 0);
//# sourceMappingURL=zoho-radio-group.dto.js.map
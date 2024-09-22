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
exports.ZohoRadioGroupSubFieldDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const zoho_field_common_property_dto_1 = require("./zoho-field-common-property.dto");
class ZohoRadioGroupSubFieldDto extends (0, swagger_1.PickType)(zoho_field_common_property_dto_1.ZohoFieldCommonProperty, [
    'document_id',
    'page_no',
    'x_value',
    'y_value',
    'width',
    'height',
    'x_coord',
    'y_coord',
    'abs_width',
    'abs_height',
]) {
}
exports.ZohoRadioGroupSubFieldDto = ZohoRadioGroupSubFieldDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRadioGroupSubFieldDto.prototype, "sub_field_name", void 0);
//# sourceMappingURL=zoho-radio-group-sub-field.dto.js.map
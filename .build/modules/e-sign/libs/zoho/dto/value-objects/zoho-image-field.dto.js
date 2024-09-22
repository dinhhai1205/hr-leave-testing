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
exports.ZohoImageFieldDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const zoho_field_common_property_dto_1 = require("./zoho-field-common-property.dto");
class ZohoImageFieldDto extends (0, swagger_1.OmitType)(zoho_field_common_property_dto_1.ZohoFieldCommonProperty, [
    'default_value',
    'description_tooltip',
]) {
    static getKeys() {
        return [
            'field_name',
            'field_label',
            'field_type_name',
            'document_id',
            'action_id',
            'is_mandatory',
            'x_coord',
            'y_coord',
            'x_value',
            'y_value',
            'width',
            'height',
            'abs_width',
            'abs_height',
            'page_no',
            'is_resizable',
            'is_draggable',
        ];
    }
}
exports.ZohoImageFieldDto = ZohoImageFieldDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Boolean)
], ZohoImageFieldDto.prototype, "is_resizable", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Boolean)
], ZohoImageFieldDto.prototype, "is_draggable", void 0);
//# sourceMappingURL=zoho-image-field.dto.js.map
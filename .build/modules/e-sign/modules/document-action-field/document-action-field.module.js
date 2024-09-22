"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentActionFieldModule = void 0;
const common_1 = require("@nestjs/common");
const field_type_module_1 = require("../field-type/field-type.module");
const document_action_field_service_1 = require("./document-action-field.service");
let DocumentActionFieldModule = class DocumentActionFieldModule {
};
exports.DocumentActionFieldModule = DocumentActionFieldModule;
exports.DocumentActionFieldModule = DocumentActionFieldModule = __decorate([
    (0, common_1.Module)({
        imports: [field_type_module_1.FieldTypeModule],
        providers: [document_action_field_service_1.DocumentActionFieldService],
        exports: [document_action_field_service_1.DocumentActionFieldService],
    })
], DocumentActionFieldModule);
//# sourceMappingURL=document-action-field.module.js.map
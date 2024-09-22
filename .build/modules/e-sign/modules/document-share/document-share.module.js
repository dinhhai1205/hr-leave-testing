"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentShareModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../../../core/database/entities");
const document_audit_1 = require("../../modules/document-audit");
const document_action_module_1 = require("../document-action/document-action.module");
const document_module_1 = require("../document/document.module");
const document_share_controller_1 = require("./document-share.controller");
const document_share_service_1 = require("./document-share.service");
let DocumentShareModule = class DocumentShareModule {
};
exports.DocumentShareModule = DocumentShareModule;
exports.DocumentShareModule = DocumentShareModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.DocumentShareEntity]),
            document_module_1.DocumentModule,
            document_action_module_1.DocumentActionModule,
            document_audit_1.DocumentAuditModule,
        ],
        providers: [document_share_service_1.DocumentShareService],
        controllers: [document_share_controller_1.DocumentShareController],
    })
], DocumentShareModule);
//# sourceMappingURL=document-share.module.js.map
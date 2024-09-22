"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrtrxHdrModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const prtrx_hdr_entity_1 = require("../../../../core/database/entities/prtrx-hdr.entity");
const prtrx_hdr_service_1 = require("./prtrx-hdr.service");
let PrtrxHdrModule = class PrtrxHdrModule {
};
exports.PrtrxHdrModule = PrtrxHdrModule;
exports.PrtrxHdrModule = PrtrxHdrModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([prtrx_hdr_entity_1.PrtrxHdrEntity])],
        providers: [prtrx_hdr_service_1.PrtrxHdrService],
        exports: [prtrx_hdr_service_1.PrtrxHdrService],
    })
], PrtrxHdrModule);
//# sourceMappingURL=prtrx-hdr.module.js.map
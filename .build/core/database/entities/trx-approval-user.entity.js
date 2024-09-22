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
exports.TrxApprovalUserEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
const enums_2 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
const leave_entity_1 = require("./leave.entity");
let TrxApprovalUserEntity = class TrxApprovalUserEntity extends abstract_entity_1.AbstractEntity {
};
exports.TrxApprovalUserEntity = TrxApprovalUserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], TrxApprovalUserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TrxApprovalUserEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TrxApprovalUserEntity.prototype, "moduleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TrxApprovalUserEntity.prototype, "recordId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TrxApprovalUserEntity.prototype, "approverLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TrxApprovalUserEntity.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TrxApprovalUserEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TrxApprovalUserEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => leave_entity_1.LeaveEntity),
    (0, typeorm_1.JoinColumn)({ name: 'record_id' }),
    __metadata("design:type", leave_entity_1.LeaveEntity)
], TrxApprovalUserEntity.prototype, "leave", void 0);
exports.TrxApprovalUserEntity = TrxApprovalUserEntity = __decorate([
    (0, typeorm_1.Entity)(enums_2.ETableName.TRX_APPROVAL_USER)
], TrxApprovalUserEntity);
//# sourceMappingURL=trx-approval-user.entity.js.map
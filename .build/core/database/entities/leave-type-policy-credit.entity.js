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
exports.LeaveTypePolicyCreditEntity = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const abstract_entity_1 = require("./abstract.entity");
const employee_entity_1 = require("./employee.entity");
const leave_type_policy_credit_trx_entity_1 = require("./leave-type-policy-credit-trx.entity");
const leave_type_policy_entity_1 = require("./leave-type-policy.entity");
let LeaveTypePolicyCreditEntity = class LeaveTypePolicyCreditEntity extends abstract_entity_1.AbstractEntity {
};
exports.LeaveTypePolicyCreditEntity = LeaveTypePolicyCreditEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypePolicyCreditEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditEntity.prototype, "leaveTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditEntity.prototype, "leavePolicyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditEntity.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditEntity.prototype, "credit", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditEntity.prototype, "creditRemaining", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: (0, utils_1.columnType)('DATETIME'), nullable: true }),
    __metadata("design:type", Date)
], LeaveTypePolicyCreditEntity.prototype, "creditedOn", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditEntity.prototype, "carryForward", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditEntity.prototype, "carryForwardRemaining", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: (0, utils_1.columnType)('DATETIME'), nullable: true }),
    __metadata("design:type", Date)
], LeaveTypePolicyCreditEntity.prototype, "carryForwardOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ ...constants_1.BIGINT_COLUMN_TYPE, nullable: true }),
    __metadata("design:type", Object)
], LeaveTypePolicyCreditEntity.prototype, "carryToLtId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: (0, utils_1.columnType)('DATETIME'), nullable: true }),
    __metadata("design:type", Date)
], LeaveTypePolicyCreditEntity.prototype, "expiresOn", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => leave_type_policy_entity_1.LeaveTypePolicyEntity, record => record.leaveTypePolicyCredits),
    (0, typeorm_1.JoinColumn)({ name: 'leave_policy_id' }),
    __metadata("design:type", leave_type_policy_entity_1.LeaveTypePolicyEntity)
], LeaveTypePolicyCreditEntity.prototype, "leavePolicy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.EmployeeEntity),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], LeaveTypePolicyCreditEntity.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => leave_type_policy_entity_1.LeaveTypePolicyEntity, entity => entity.employeePolicyCredit),
    (0, typeorm_1.JoinColumn)({ name: 'leave_policy_id' }),
    __metadata("design:type", leave_type_policy_entity_1.LeaveTypePolicyEntity)
], LeaveTypePolicyCreditEntity.prototype, "employeePolicy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => leave_type_policy_credit_trx_entity_1.LeaveTypePolicyCreditTrxEntity, entity => entity.policyCredit),
    __metadata("design:type", Array)
], LeaveTypePolicyCreditEntity.prototype, "creditTrxs", void 0);
exports.LeaveTypePolicyCreditEntity = LeaveTypePolicyCreditEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.LEAVE_TYPE_POLICY_CREDIT })
], LeaveTypePolicyCreditEntity);
//# sourceMappingURL=leave-type-policy-credit.entity.js.map
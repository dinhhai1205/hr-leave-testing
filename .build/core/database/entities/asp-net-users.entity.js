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
exports.AspNetUsersEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const employee_entity_1 = require("./employee.entity");
let AspNetUsersEntity = class AspNetUsersEntity {
};
exports.AspNetUsersEntity = AspNetUsersEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { name: 'Id' }),
    __metadata("design:type", Number)
], AspNetUsersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Email' }),
    __metadata("design:type", String)
], AspNetUsersEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'FullName' }),
    __metadata("design:type", String)
], AspNetUsersEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'UserPhotoUrl' }),
    __metadata("design:type", String)
], AspNetUsersEntity.prototype, "userPhotoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'UtcOffset',
        type: 'double precision',
        transformer: {
            from: (value) => {
                if (!value)
                    return 0;
                const integerPart = Math.floor(value);
                const decimalPart = value - integerPart;
                return decimalPart
                    ? integerPart * 60 + decimalPart * 60
                    : integerPart * 60;
            },
            to: (value) => value,
        },
    }),
    __metadata("design:type", Number)
], AspNetUsersEntity.prototype, "utcOffset", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.EmployeeEntity, record => record.aspNetUsers),
    (0, typeorm_1.JoinColumn)({ name: 'Email' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], AspNetUsersEntity.prototype, "employee", void 0);
exports.AspNetUsersEntity = AspNetUsersEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.ASP_NET_USER })
], AspNetUsersEntity);
//# sourceMappingURL=asp-net-users.entity.js.map
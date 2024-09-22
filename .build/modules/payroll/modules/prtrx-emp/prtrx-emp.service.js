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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrtrxEmpService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const database_1 = require("../../../../core/database");
const prtrx_emp_entity_1 = require("../../../../core/database/entities/prtrx-emp.entity");
let PrtrxEmpService = class PrtrxEmpService extends database_1.TypeOrmBaseService {
    constructor(prtrxEmpRepository) {
        super(prtrxEmpRepository);
        this.prtrxEmpRepository = prtrxEmpRepository;
    }
    async getEmployeesByPrtrxHdrId(hdrId, included) {
        if (!included) {
            return this.prtrxEmpRepository.find({
                where: { payrollTrxHeaderId: hdrId, isDeleted: false },
                select: ['employeeId'],
            });
        }
        return this.prtrxEmpRepository.find({
            where: { payrollTrxHeaderId: hdrId, included, isDeleted: false },
            select: ['employeeId'],
        });
    }
};
exports.PrtrxEmpService = PrtrxEmpService;
exports.PrtrxEmpService = PrtrxEmpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prtrx_emp_entity_1.PrtrxEmpEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PrtrxEmpService);
//# sourceMappingURL=prtrx-emp.service.js.map
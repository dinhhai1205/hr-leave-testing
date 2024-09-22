"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypeAssignmentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const leave_type_assigment_entity_1 = require("../../../../core/database/entities/leave-type-assigment.entity");
const leave_type_assigment_controller_1 = require("./leave-type-assigment.controller");
const leave_type_assigment_service_1 = require("./leave-type-assigment.service");
let LeaveTypeAssignmentModule = class LeaveTypeAssignmentModule {
};
exports.LeaveTypeAssignmentModule = LeaveTypeAssignmentModule;
exports.LeaveTypeAssignmentModule = LeaveTypeAssignmentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([leave_type_assigment_entity_1.LeaveTypeAssignmentEntity])],
        providers: [leave_type_assigment_service_1.LeaveTypeAssignmentService],
        exports: [leave_type_assigment_service_1.LeaveTypeAssignmentService],
        controllers: [leave_type_assigment_controller_1.LeaveTypeAssignmentController],
    })
], LeaveTypeAssignmentModule);
//# sourceMappingURL=leave-type-assigment.module.js.map
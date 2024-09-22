"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.EmployeeSchema = new mongoose_1.Schema({
    EmployeeNo: String,
    FullNameLocal: String,
    FullNameEn: String,
    JobPositionCode: String,
    JobPositionName: String,
    JoinDate: Date,
    LastWorkingDate: Date,
    PaidDays: Number,
    NonPaidDay: Number,
}, { _id: false });
//# sourceMappingURL=employee.schema.js.map
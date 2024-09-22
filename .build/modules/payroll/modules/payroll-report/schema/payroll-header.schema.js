"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollHeaderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PayrollHeaderSchema = new mongoose_1.Schema({
    PayrollNo: Number,
    Year: Number,
    DateFrom: Date,
    DateTo: Date,
    StatusId: Number,
    CountryCode: String,
}, { _id: false });
//# sourceMappingURL=payroll-header.schema.js.map
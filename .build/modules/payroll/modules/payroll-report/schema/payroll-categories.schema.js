"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollCategoriesSchema = exports.PayrollCategoriesDetailSchema = exports.PayrollElementSetSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PayrollElementSetSchema = new mongoose_1.Schema({
    _id: Number,
    Code: String,
    Name: String,
    GlCode: String,
    Tags: String,
    Amount: String,
}, { strict: false });
exports.PayrollCategoriesDetailSchema = new mongoose_1.Schema({
    Code: String,
    Name: String,
    Total: String,
    PayElementSets: mongoose_1.Schema.Types.Mixed,
}, { _id: false, strict: false });
exports.PayrollCategoriesSchema = new mongoose_1.Schema({
    'A-100': exports.PayrollCategoriesDetailSchema,
    'A-110': exports.PayrollCategoriesDetailSchema,
    'B-200': exports.PayrollCategoriesDetailSchema,
    'B-210': exports.PayrollCategoriesDetailSchema,
    'C-100': exports.PayrollCategoriesDetailSchema,
    'C-110': exports.PayrollCategoriesDetailSchema,
    'E-100': exports.PayrollCategoriesDetailSchema,
    'E-110': exports.PayrollCategoriesDetailSchema,
    'F-100': exports.PayrollCategoriesDetailSchema,
    'F-110': exports.PayrollCategoriesDetailSchema,
    'X-100': exports.PayrollCategoriesDetailSchema,
}, { _id: false, strict: false });
//# sourceMappingURL=payroll-categories.schema.js.map
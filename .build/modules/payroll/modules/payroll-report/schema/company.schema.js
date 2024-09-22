"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanySchema = void 0;
const mongoose_1 = require("mongoose");
exports.CompanySchema = new mongoose_1.Schema({
    Code: String,
    Name: String,
    ShortName: String,
    CountryCode: String,
    CountryName: String,
}, { _id: false });
//# sourceMappingURL=company.schema.js.map
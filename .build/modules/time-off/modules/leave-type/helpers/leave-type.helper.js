"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypeHelper = void 0;
const common_1 = require("@nestjs/common");
const csv_parse_1 = require("csv-parse");
const ExcelJS = require("exceljs");
const path_1 = require("path");
const stream_1 = require("stream");
const constants_1 = require("../../../../../common/constants");
let LeaveTypeHelper = class LeaveTypeHelper {
    readCsvFile(file) {
        const { buffer: fileBuffer, originalname } = file;
        const extensionFile = (0, path_1.extname)(originalname);
        if (extensionFile !== '.csv') {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.INVALID(`'${originalname}' file. Expect .csv but got '${extensionFile}'`));
        }
        return new Promise((resolve, reject) => {
            const hashTable = {};
            const listEmployeeRef = [];
            let listLeaveTypeName = [];
            let isFirstCsvLine = true;
            (0, csv_parse_1.parse)(fileBuffer, {
                delimiter: ',',
                rtrim: true,
                relax_column_count: true,
                skip_empty_lines: true,
            })
                .on('data', (row) => {
                if (isFirstCsvLine) {
                    listLeaveTypeName = row.slice(2);
                    isFirstCsvLine = false;
                }
                else {
                    if (row[0]) {
                        listEmployeeRef.push(`${row[0]}`);
                        for (let i = 0; i < listLeaveTypeName.length; i++) {
                            const balance = Number(`${row[i + 2]}`);
                            if (isNaN(balance))
                                continue;
                            hashTable[`${row[0]}:${listLeaveTypeName[i]}`] = balance;
                        }
                    }
                }
            })
                .on('end', () => {
                resolve({
                    listLeaveTypeName,
                    listEmployeeRef,
                    hashTable,
                    totalNumberLtbCanBeHave: listEmployeeRef.length * listLeaveTypeName.length,
                });
            })
                .on('error', error => {
                reject(error);
            });
        });
    }
    async readExcelFile(file) {
        const { buffer: fileBuffer, originalname, mimetype } = file;
        if (mimetype !== constants_1.CONTENT_TYPE.XLSX) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.INVALID(`'${originalname}' file. Expect .xlsx but got ${(0, path_1.extname)(originalname)}`));
        }
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(fileBuffer);
        const worksheet = workbook.worksheets[0];
        const listLeaveTypeName = worksheet.getRow(1).values.slice(3);
        const listEmployeeRef = worksheet.getColumn(1).values.slice(2);
        const hashTable = {};
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            if (rowNumber !== 1) {
                const employeeRef = row.getCell(1).value;
                if (employeeRef) {
                    for (let index = 0; index < listLeaveTypeName.length; index++) {
                        const name = listLeaveTypeName[index];
                        const balance = Number(worksheet.getCell(rowNumber, index + 3).value);
                        if (!isNaN(balance)) {
                            hashTable[`${employeeRef}:${name}`] = balance;
                        }
                    }
                }
            }
        });
        return {
            listLeaveTypeName,
            listEmployeeRef,
            hashTable,
            totalNumberLtbCanBeHave: listEmployeeRef.length * listLeaveTypeName.length,
        };
    }
    buildHeaderRowLeaveTypeBalance(leaveTypes) {
        const leaveTypeColumnIndex = {};
        const headerRow = leaveTypes.reduce((acc, { name: ltName = '', id }, currentIndex) => {
            leaveTypeColumnIndex[id] = currentIndex + 3;
            ltName ? acc.push(ltName) : acc.push(`lt_unknown_${id}`);
            return acc;
        }, ['Employee Ref', 'Full Name (Local)', 'Full Name (English)']);
        return { leaveTypeColumnIndex, headerRow };
    }
    pushRowDataLeaveTypeBalance(args) {
        const { employees, leaveTypeColumnIndex, provider } = args;
        let dataRows = [];
        for (let index = 0; index < employees.length; index++) {
            const employee = employees[index];
            const employeeId = employee.id;
            const nextEmpId = employees[index + 1]?.id || undefined;
            const ltId = employee.ltId;
            const ltbBalance = Number(employee.ltBalance || 0);
            if (!employeeId)
                continue;
            if (!dataRows[0])
                dataRows[0] = employee.employeeRef;
            if (!dataRows[1])
                dataRows[1] = employee.fullNameLocal;
            if (!dataRows[2])
                dataRows[2] = employee.fullNameEn;
            dataRows[leaveTypeColumnIndex[ltId]] = ltbBalance;
            if (nextEmpId === undefined || nextEmpId !== employeeId) {
                dataRows.push('\n');
            }
            const latestDataRow = dataRows[dataRows.length - 1];
            if (latestDataRow === '\n') {
                if (provider instanceof stream_1.Readable) {
                    provider.push(dataRows.join(','));
                }
                else {
                    provider.addRow(dataRows);
                }
                dataRows = [];
            }
        }
    }
};
exports.LeaveTypeHelper = LeaveTypeHelper;
exports.LeaveTypeHelper = LeaveTypeHelper = __decorate([
    (0, common_1.Injectable)()
], LeaveTypeHelper);
//# sourceMappingURL=leave-type.helper.js.map
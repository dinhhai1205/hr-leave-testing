"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveAssignmentTestData = void 0;
const common_test_data_1 = require("../test-data/common.test-data");
const company_test_data_1 = require("./company.test-data");
const leave_type_test_data_1 = require("./leave-type.test-data");
exports.leaveAssignmentTestData = [
    {
        id: 1010,
        companyId: company_test_data_1.companyTestData.id,
        ltId: leave_type_test_data_1.leaveTypeTestData[0].id,
        genderIds: '',
        mariStsIds: '',
        jobGradeIds: '',
        orgEleIds: '',
        contractTypeIds: '',
        employeeIds: '',
        ...common_test_data_1.commonTestData,
        company: {},
        leaveType: {},
    },
];
//# sourceMappingURL=leave-type-assigment.test-data.js.map
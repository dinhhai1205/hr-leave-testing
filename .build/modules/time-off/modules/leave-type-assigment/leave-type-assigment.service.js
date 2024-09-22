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
exports.LeaveTypeAssignmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../common/constants");
const utils_1 = require("../../../../common/utils");
const entities_1 = require("../../../../core/database/entities");
const services_1 = require("../../../../core/database/services");
let LeaveTypeAssignmentService = class LeaveTypeAssignmentService extends services_1.LegacyBaseService {
    constructor(leaveTypeAssignmentRepository) {
        super(leaveTypeAssignmentRepository);
        this.leaveTypeAssignmentRepository = leaveTypeAssignmentRepository;
    }
    checkValidateForCreateLeave(employee, leaveAssignment) {
        if (!employee) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: 'Employee Record Not Found!',
            });
        }
        if (!leaveAssignment)
            return true;
        let messageError = '';
        const { employeeIds, mariStsIds, genderIds, jobGradeIds, orgEleIds, contractTypeIds, } = leaveAssignment;
        const { id, maritalStatusId, jobGradeId, contractType, organizationElementId, gender, } = employee;
        if (employeeIds && employeeIds?.split(',').find(x => x === id.toString())) {
            return true;
        }
        if (genderIds && !genderIds.split(',').find(x => x === gender)) {
            messageError = constants_1.ERR_MSG.LEAVE_TYPE_ASSIGNMENT.GENDER_ERROR;
        }
        if (mariStsIds &&
            !mariStsIds.split(',').find(x => x === maritalStatusId?.toString())) {
            messageError = constants_1.ERR_MSG.LEAVE_TYPE_ASSIGNMENT.MAR_STS_ERROR;
        }
        if (jobGradeIds &&
            !jobGradeIds.split(',').find(x => x === jobGradeId?.toString())) {
            messageError = constants_1.ERR_MSG.LEAVE_TYPE_ASSIGNMENT.JOBGRADE_ERROR;
        }
        if (orgEleIds &&
            !orgEleIds.split(',').find(x => x === organizationElementId?.toString())) {
            messageError = constants_1.ERR_MSG.LEAVE_TYPE_ASSIGNMENT.ORGELE_ERROR;
        }
        if (contractTypeIds && !contractTypeIds.includes(contractType)) {
            messageError = constants_1.ERR_MSG.LEAVE_TYPE_ASSIGNMENT.CONTRACT_TYPE_ERROR;
        }
        if (messageError)
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: messageError,
            });
        return true;
    }
    async getLeaveTypeAssignment(filter, authInfo) {
        const emptyProp = (0, utils_1.hasUndefinedOrNullObjV2)(filter);
        if (emptyProp)
            throw new common_1.BadRequestException(constants_1.ERR_MSG.EMPTY(emptyProp));
        const { companyId, leaveTypeId } = filter;
        const leaveTypeAssignment = await this.leaveTypeAssignmentRepository.findOne({
            where: { ltId: leaveTypeId, companyId, isDeleted: false },
        });
        if (!leaveTypeAssignment) {
            return this.leaveTypeAssignmentRepository.save({
                companyId,
                ltId: leaveTypeId,
                isDeleted: false,
                genderIds: '',
                mariStsIds: '',
                jobGradeIds: '',
                orgEleIds: '',
                contractTypeIds: '',
                employeeIds: '',
                createdBy: authInfo.authEmail,
                createdOn: new Date(),
            });
        }
        return leaveTypeAssignment;
    }
    async updateLeaveTypeAssignment(companyId, input, authInfo) {
        const leaveAssignment = await this.repository.findOne({
            where: { ltId: input.leaveTypeId, id: input.id, companyId },
        });
        if (!leaveAssignment)
            throw new common_1.NotFoundException(constants_1.ERR_MSG.NOT_FOUND('Leave assignment', `id ${input.id}`));
        delete input.id;
        delete input.leaveTypeId;
        input = this.sort(input);
        Object.entries(input).forEach(([prop, element]) => {
            if (typeof element === 'string') {
                Object.assign(leaveAssignment, { [prop]: element });
            }
            else if (typeof element === 'boolean' && element === true) {
                const cutProp = this.lowercaseFirstCharacter(prop.substring(3, prop.length - 1)) +
                    'Ids';
                Object.assign(leaveAssignment, { [cutProp]: '' });
            }
        });
        leaveAssignment.updatedBy = authInfo.authEmail;
        leaveAssignment.updatedOn = new Date();
        return this.repository.save(leaveAssignment);
    }
    lowercaseFirstCharacter(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
    sort(obj) {
        const keys = Object.keys(obj).sort((a, b) => {
            if (a.startsWith('all') && !b.startsWith('all')) {
                return 1;
            }
            else if (!a.startsWith('all') && b.startsWith('all')) {
                return -1;
            }
            else {
                return 0;
            }
        });
        const sortedObj = {};
        for (const key of keys) {
            if (key in obj) {
                sortedObj[key] = obj[key];
            }
        }
        return sortedObj;
    }
    async getOne(options) {
        return this.leaveTypeAssignmentRepository.findOne(options);
    }
    isEmpValidAssignment(employee, assignment) {
        const { id: employeeId, maritalStatusId: mariStsId, jobGradeId, contractType: contractTypeId, organizationElementId: orgEleId, gender: genderId, } = employee;
        const { employeeIds, mariStsIds, jobGradeIds, contractTypeIds, orgEleIds, genderIds, } = assignment;
        if (employeeIds?.trim()?.length) {
            const employeeMap = this.createFieldMap(employeeIds);
            if (employeeMap.has(employeeId.toString())) {
                return true;
            }
        }
        const fieldChecks = [
            { field: mariStsIds, value: mariStsId ?? '' },
            { field: genderIds, value: genderId ?? '' },
            { field: jobGradeIds, value: jobGradeId ?? '' },
            { field: contractTypeIds, value: contractTypeId ?? '' },
            { field: orgEleIds, value: orgEleId ?? '' },
        ];
        for (const { field, value } of fieldChecks) {
            if (field?.trim()?.length) {
                const map = this.createFieldMap(field);
                if (!map.has(value.toString()))
                    return false;
            }
        }
        return true;
    }
    createFieldMap(fields) {
        return new Map(fields
            .trim()
            .split(',')
            .map(field => [field, true]));
    }
};
exports.LeaveTypeAssignmentService = LeaveTypeAssignmentService;
exports.LeaveTypeAssignmentService = LeaveTypeAssignmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.LeaveTypeAssignmentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LeaveTypeAssignmentService);
//# sourceMappingURL=leave-type-assigment.service.js.map
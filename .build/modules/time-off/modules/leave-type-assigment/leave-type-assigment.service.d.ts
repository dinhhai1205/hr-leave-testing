import { FindOneOptions, Repository } from 'typeorm';
import { IAuthInfo } from '../../../../common/interfaces';
import { EmployeeEntity, LeaveTypeAssignmentEntity } from '../../../../core/database/entities';
import { LegacyBaseService } from '../../../../core/database/services';
import { LeaveTypeAssignmentUpdate } from './dto/leave-type-assigment-update.dto';
export declare class LeaveTypeAssignmentService extends LegacyBaseService<LeaveTypeAssignmentEntity> {
    readonly leaveTypeAssignmentRepository: Repository<LeaveTypeAssignmentEntity>;
    constructor(leaveTypeAssignmentRepository: Repository<LeaveTypeAssignmentEntity>);
    checkValidateForCreateLeave(employee: EmployeeEntity | null, leaveAssignment: LeaveTypeAssignmentEntity | null): boolean;
    getLeaveTypeAssignment(filter: {
        companyId: number;
        leaveTypeId: number;
    }, authInfo: IAuthInfo): Promise<LeaveTypeAssignmentEntity>;
    updateLeaveTypeAssignment(companyId: number, input: LeaveTypeAssignmentUpdate, authInfo: IAuthInfo): Promise<LeaveTypeAssignmentEntity>;
    lowercaseFirstCharacter(str: string): string;
    sort<T extends object, K extends keyof T>(obj: T): T;
    getOne(options: FindOneOptions<LeaveTypeAssignmentEntity>): Promise<LeaveTypeAssignmentEntity | null>;
    isEmpValidAssignment(employee: Pick<EmployeeEntity, 'id' | 'maritalStatusId' | 'jobGradeId' | 'organizationElementId' | 'contractType' | 'gender'>, assignment: Pick<LeaveTypeAssignmentEntity, 'employeeIds' | 'mariStsIds' | 'genderIds' | 'jobGradeIds' | 'orgEleIds' | 'contractTypeIds'>): boolean;
    private createFieldMap;
}

import { BreakType, UnitTime, WorkArrangement } from '../../../modules/time-tracker/common';
import { EWorkScheduleState } from '../../../modules/time-tracker/modules/work-schedule/enums/work-schedule-state.enum';
import { IWorkScheduleAssignee } from '../../../modules/time-tracker/modules/work-schedule/interfaces/work-schedule-assignee.interface';
import { IWorkScheduleGroupAssignee } from '../../../modules/time-tracker/modules/work-schedule/interfaces/work-schedule-group-assignee.interface';
import { IWorkSchedulePublishHistory } from '../../../modules/time-tracker/modules/work-schedule/interfaces/work-schedule-publish-history.interface';
import { AutoDeductionEntity } from './auto-deduction.entity';
import { BaseAppEntity } from './base-app.entity';
import { BreakRuleEntity } from './break-rule.entity';
import { DayScheduleEntity } from './day-schedule.entity';
import { EmployeeEntity } from './employee.entity';
import { LocationWorkScheduleEntity } from './location-work-schedule.entity';
import { OrganizationStructureEntity } from './organization-structure.entity';
import { WorkScheduleTagEntity } from './work-schedule-tag.entity';
import { EWorkSchedulePublishType } from '../../../modules/time-tracker/modules/work-schedule/enums/work-schedule-publish-type.enum';
import { WorkScheduleAssignmentEntity } from './work-schedule-assignment.entity';
export declare class WorkScheduleEntity extends BaseAppEntity {
    ttWorkScheduleId: string;
    name: string;
    utcOffset: number;
    workArrangement: WorkArrangement;
    breakType: BreakType;
    default: boolean;
    weeklyHours: number;
    unitTime: UnitTime;
    excludeEarlyClockIn: boolean;
    companyId: number;
    overtimeId: number;
    endWorkDayAt: string;
    publishType: EWorkSchedulePublishType;
    color: string;
    startDate: Date;
    endDate: Date;
    state: EWorkScheduleState;
    threshold: number;
    publishHistories: IWorkSchedulePublishHistory[];
    assignees: IWorkScheduleAssignee;
    groupAssignees: IWorkScheduleGroupAssignee;
    autoDeductions: AutoDeductionEntity[];
    breaks: BreakRuleEntity[];
    locationWorkSchedules: LocationWorkScheduleEntity[];
    daySchedules: DayScheduleEntity[];
    workScheduleAssignment: WorkScheduleAssignmentEntity[];
    employees: EmployeeEntity[];
    workScheduleTags: WorkScheduleTagEntity[];
    organizationStructures: OrganizationStructureEntity[];
}

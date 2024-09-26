import type { EmployeeEntity } from '../../../../../core/database';
import type { IHrforteNotificationParam } from '../../../../../libs/hrforte';
export declare class WorkScheduleAssignmentHrforteNotificationMapper {
    static toParams(params: {
        clientUrl: string;
        actorEmail: string;
        workScheduleId: number;
        workScheduleName: string;
        employees: Array<Pick<EmployeeEntity, 'email'>>;
        dateFrom: string;
        dateTo: string;
        verb: string;
    }): IHrforteNotificationParam[];
}

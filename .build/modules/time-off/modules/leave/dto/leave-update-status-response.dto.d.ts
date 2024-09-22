import { LeaveEntity } from '../../../../../core/database/entities/leave.entity';
export declare class leaveUpdateStatusResponseDto {
    records: LeaveEntity[];
    errorIds: number[];
    errorMessage: string;
}

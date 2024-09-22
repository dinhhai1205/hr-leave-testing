import type { EUserRanking } from '../../../common/enums';
export interface IActiveUserData {
    userEmail: string;
    userRanking: EUserRanking;
    utcOffset: number;
    isAdmin: boolean;
}

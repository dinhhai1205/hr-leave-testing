import type { Request } from 'express';
import type { TIME_TRACKER_DATA } from '../constants/time-tracker-data.constant';
import type { IActiveAdminData, IActiveEssData, IActiveUserData, REQUEST_ADMIN_KEY, REQUEST_ESS_KEY, REQUEST_USER_KEY } from '../../../../core/iam';
export interface IRequestData extends Request {
    [TIME_TRACKER_DATA]: any;
    [REQUEST_USER_KEY]: IActiveUserData;
    [REQUEST_ADMIN_KEY]?: IActiveAdminData;
    [REQUEST_ESS_KEY]?: IActiveEssData;
}

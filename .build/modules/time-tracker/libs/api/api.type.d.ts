import type { AxiosRequestConfig, Method } from 'axios';
import type { ObjectLiteral } from 'typeorm';
import type { TimeTrackerUrl } from './constants/api-url.constants';
export type RequestConfig<TData> = Pick<AxiosRequestConfig<TData>, 'headers' | 'data' | 'responseType' | 'params'> & {
    segments?: ObjectLiteral;
} & ({
    type?: undefined;
    method: Method;
    url: string;
} | {
    type: TimeTrackerUrl;
});
export type RequestOptions = {
    useMasterApiKey?: boolean;
};

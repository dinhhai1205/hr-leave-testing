type DataFromRequest = {
    method: string;
    url: string;
    body: string;
    ipAddress: string;
    userAgent: string;
    companyId: string;
    userEmail: string;
    authInfo: string;
    currentContext: string;
};
export declare function extractDataFromReq(req: any): {
    method: any;
    url: any;
    body: string;
    companyId: any;
    userEmail: any;
    authInfo: string;
    currentContext: string;
    ipAddress: any;
    userAgent: any;
};
export declare function extractApiLogObj(obj: DataFromRequest, params: {
    statusCode: number;
    statusMessage: string;
    timeMs: number;
}): string;
export {};

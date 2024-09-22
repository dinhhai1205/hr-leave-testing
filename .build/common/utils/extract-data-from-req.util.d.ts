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
export declare function extractDataFromReq(req: any): DataFromRequest;
export declare function extractApiLogObj(obj: DataFromRequest, params: {
    statusCode: number;
    statusMessage: string;
    timeMs: number;
}): string;
export {};

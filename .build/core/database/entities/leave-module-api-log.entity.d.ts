export declare class LeaveModuleApiLogEntity {
    id: number;
    companyId: string;
    method: string;
    url: string;
    body: string;
    statusCode: number;
    statusMessage: string;
    ipAddress: string;
    userAgent: string;
    timeMs: number;
    createdOn: Date;
    userEmail: string;
    authInfo?: string;
    cause?: string;
    currentContext?: string;
}

export interface IHrforteNotificationParam {
    actorEmail: string;
    audienceEmail: string;
    recordNumber: string;
    recordKey: number;
    dateFrom: string;
    dateTo: string;
    moduleId?: number;
    moduleName: string;
    verb: string;
    recordUrl?: string;
    message?: string;
}

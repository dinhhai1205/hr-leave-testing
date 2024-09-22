export type SAMLDto = {
    SAMLResponse: string;
};
export declare class AzureSSODto {
    id: number;
    companyId: number;
    enable: boolean;
    metadataUrl: string;
    createdOn: Date;
    updatedOn: Date | null;
    createdBy: string;
    updatedBy: string;
}

type CompanyUserRole = {
    companyUserRoleId: number;
    roleHeaderId: number;
    orgElementListJson: string;
};
export type CompanyUserRolePermission = (CompanyUserRole & {
    leave: string;
}) | (CompanyUserRole & {
    payroll: string;
}) | (CompanyUserRole & {
    approval: string;
}) | (CompanyUserRole & {
    esign: string;
});
export {};

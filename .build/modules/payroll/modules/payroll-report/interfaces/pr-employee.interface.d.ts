export interface IPrEmployee {
    EmployeeNo: string;
    FullNameLocal: string;
    FullNameEn: string | null;
    JobPositionCode: string;
    JobPositionName: string;
    JoinDate: Date;
    LastWorkingDate: Date;
    PaidDays: number;
    NonPaidDay: number;
    ContractCurrencyId: number;
}

export interface IHourTrackingInMinuteInterface {
    workedHour: number;
    breakHourUnpaid: number;
    breakPaid: number;
    overTime: {
        regular: number;
        dailyOvertime: number;
        dailyDoubleOvertime: number;
        weeklyOvertime: number;
        restDayOvertime: number;
        publicHolidayOvertime: number;
    };
    autoDeduction: number;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OctoDashboardService = void 0;
const common_1 = require("@nestjs/common");
require("core-js/actual/array/group-by");
const moment = require("moment");
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../../common/enums");
const company_1 = require("../../../general/modules/company");
const company_parameter_1 = require("../../../general/modules/company-parameter");
const country_1 = require("../../../general/modules/country");
const usd_forex_service_1 = require("../../../general/modules/usd-forex/usd-forex.service");
const constants_1 = require("../../../payroll/modules/payroll-report/constants");
const payroll_report_service_1 = require("../../../payroll/modules/payroll-report/payroll-report.service");
const prtrx_hdr_service_1 = require("../../../payroll/modules/prtrx-hdr/prtrx-hdr.service");
const employee_contract_service_1 = require("../../../user/modules/employee-contract/employee-contract.service");
const employee_service_1 = require("../../../user/modules/employee/employee.service");
const octo_company_service_1 = require("../octo-company/octo-company.service");
const octo_task_service_1 = require("../octo-task/octo-task.service");
let OctoDashboardService = class OctoDashboardService {
    constructor(countryService, octoTaskService, employeeService, prtrxHdrService, employeeContractService, companyParameterService, payrollReportService, octoCompanyService, companyService, usdForexService) {
        this.countryService = countryService;
        this.octoTaskService = octoTaskService;
        this.employeeService = employeeService;
        this.prtrxHdrService = prtrxHdrService;
        this.employeeContractService = employeeContractService;
        this.companyParameterService = companyParameterService;
        this.payrollReportService = payrollReportService;
        this.octoCompanyService = octoCompanyService;
        this.companyService = companyService;
        this.usdForexService = usdForexService;
    }
    async getAllClientIds(octoCompanyId) {
        const octoCompanyCode = await this.octoCompanyService.getOctoCompanyCode(octoCompanyId);
        return this.companyService.getAllClientIds(octoCompanyCode);
    }
    async getHeaderDashboard(octoCompanyId) {
        const { currentDate } = this.startAndEndDateInCurrentYear();
        const clientIds = await this.getAllClientIds(octoCompanyId);
        const [totalCountry, totalWorkforce, totalLeaver, totalJoiner, totalPendingTask, totalPayrollFinalized,] = await Promise.all([
            this.countryService.getTotalCountries(clientIds),
            this.employeeService.getTotalEmployees(clientIds),
            this.employeeService.getTotalLeaverEmployees({
                companyIds: clientIds,
                currentDate,
            }),
            this.employeeService.getTotalJoinerEmployees({
                companyIds: clientIds,
                currentDate,
            }),
            this.octoTaskService.getTotalPendingTasks({
                companyId: octoCompanyId,
                currentDate,
            }),
            this.prtrxHdrService.getTotalPayrollFinalized(clientIds, {
                dateFrom: (0, typeorm_1.MoreThanOrEqual)(currentDate.clone().startOf('month').toDate()),
                dateTo: (0, typeorm_1.MoreThanOrEqual)(currentDate.clone().endOf('month').toDate()),
            }),
        ]);
        return {
            totalEntity: clientIds.length,
            totalCountry,
            totalWorkforce,
            totalLeaver,
            totalJoiner,
            totalVendor: 0,
            totalPendingTask,
            totalPayrollFinalized,
        };
    }
    async getPayrollDashboard(categoryType, octoCompanyId, input) {
        const clientIds = await this.getAllClientIds(octoCompanyId);
        if (!clientIds.length)
            return [];
        input.companyIds = clientIds;
        const countryNames = [];
        const currencyCodes = [];
        const countryCodes = (await this.countryService.getAllCountries(clientIds, input?.countryCodes)).map(({ countryCode, countryName, currencyCode }) => {
            countryNames.push(countryName);
            currencyCodes.push(currencyCode);
            return countryCode;
        });
        if (input?.currencyCodes?.length) {
            currencyCodes.push(...input.currencyCodes);
        }
        else if (input?.currencyCode) {
            currencyCodes.push(input.currencyCode);
        }
        const [totalPayCategories, exchangeRates] = await Promise.all([
            categoryType === 'normal'
                ? this.getPayrollPayCategoriesDashboard(input, countryCodes)
                : this.getPayrollAggregateDashboard(input, countryCodes),
            this.usdForexService.getExchangeRates(currencyCodes),
        ]);
        const exchangeRateMapping = exchangeRates.reduce((prev, curr) => {
            prev[curr.currencyCode] = curr.rate;
            return prev;
        }, {});
        const desireRate = exchangeRateMapping[(input?.currencyCodes || [])[0] || input?.currencyCode || 'USD'];
        return countryCodes.map((countryCode, i) => {
            const exchangeRate = exchangeRateMapping[currencyCodes[i]];
            const totalCategories = totalPayCategories[i];
            const result = {};
            for (const [categoryCode, total] of Object.entries(totalCategories)) {
                if (exchangeRate === 0)
                    continue;
                const convertedToUsd = +total / exchangeRate;
                result[categoryCode] = (convertedToUsd * desireRate).toFixed(2);
            }
            return {
                ...result,
                countryCode,
                countryName: countryNames[i],
                currencyCode: currencyCodes[i],
                exchangeRate,
            };
        });
    }
    async getPayrollPayCategoriesDashboard(input, countryCodes) {
        const { currencyCodes, payrollCyclesFrom, payrollCyclesTo, companyIds } = input;
        const totalPayCategoriesPromises = [];
        const categories = (input.categories?.length
            ? input.categories
            : Object.keys(enums_1.ESystemGenNormalCategories)).map(category => `PayCategories.${category}`);
        for (const countryCode of countryCodes) {
            totalPayCategoriesPromises.push(this.payrollReportService.getTotalPayCategories({
                categoryType: 'normal',
                input: {
                    categories,
                    countryCodes: [countryCode],
                    currencyCodes,
                    payrollCyclesFrom,
                    payrollCyclesTo,
                    companyIds,
                },
            }));
        }
        return Promise.all(totalPayCategoriesPromises);
    }
    async getWorkforceDashboard(octoCompanyId, input) {
        const octoCompanyCode = await this.octoCompanyService.getOctoCompanyCode(octoCompanyId);
        const { contractTypes, countryCodes } = input;
        const clients = await this.companyService.getAllClients(octoCompanyCode, countryCodes);
        const mapping = clients.reduce((prev, client) => {
            const countryCode = client?.companyParameter?.country?.code || 'EMPTY';
            const countryName = client?.companyParameter?.country?.name || 'EMPTY';
            if (!prev[countryCode])
                prev[countryCode] = {};
            if (!prev[countryCode]['companyIds']) {
                prev[countryCode]['companyIds'] = [];
            }
            prev[countryCode]['companyIds'].push(client.id);
            prev[countryCode]['countryName'] = countryName;
            return prev;
        }, {});
        const listCountry = [];
        const totalEmployeePromises = [];
        for (const [countryCode, { companyIds, countryName }] of Object.entries(mapping)) {
            totalEmployeePromises.push(this.employeeService.getTotalEmployeeByContract(companyIds, contractTypes));
            listCountry.push({ countryCode, countryName });
        }
        const totalEmployees = await Promise.all(totalEmployeePromises);
        return listCountry.map((country, i) => {
            const totalEmpByContractType = totalEmployees[i] || {};
            return { ...country, ...totalEmpByContractType };
        });
    }
    async getPayrollAggregateDashboard(input, countryCodes) {
        const { currencyCodes, payrollCyclesFrom, payrollCyclesTo, categories, companyIds, } = input;
        const totalPayCategoriesPromises = [];
        for (const countryCode of countryCodes) {
            totalPayCategoriesPromises.push(this.payrollReportService.getTotalPayCategories({
                categoryType: 'aggregate',
                input: {
                    categories: categories?.length
                        ? categories
                        : Object.keys(enums_1.ESystemGenAggregateCategories),
                    countryCodes: [countryCode],
                    currencyCodes,
                    payrollCyclesFrom,
                    payrollCyclesTo,
                    companyIds,
                },
                specificCategoryForAggregate: 'X-100',
            }));
        }
        return Promise.all(totalPayCategoriesPromises);
    }
    async getInsightSummaryDashboard(args) {
        const { clientId } = args;
        const { currentDate, startDateOfYear, endDateOfYear } = this.startAndEndDateInCurrentYear();
        const [totalLeaver, totalJoiner, totalActiveEmployees, totalInActiveEmployees, totalProbationEmployeeContract, localCurrency,] = await Promise.all([
            this.employeeService.getTotalLeaverEmployees({
                companyIds: [clientId],
                currentDate,
            }),
            this.employeeService.getTotalJoinerEmployees({
                companyIds: [clientId],
                currentDate,
            }),
            this.employeeService.getTotalEmployees([clientId], { active: true }),
            this.employeeService.getTotalEmployees([clientId], { active: false }),
            this.employeeContractService.getTotalProbationEmployeeContract(clientId, {
                contractType: enums_1.EEmployeeContractType.PROBATION_CONTRACT,
                dateFrom: (0, typeorm_1.Between)(startDateOfYear.toDate(), endDateOfYear.toDate()),
                dateTo: (0, typeorm_1.MoreThan)(currentDate.toDate()),
            }),
            this.companyParameterService.getLocalCurrencyOfCompany(clientId),
        ]);
        const totalEmployees = totalActiveEmployees + totalInActiveEmployees;
        return {
            totalEmployees,
            totalJoiner,
            totalLeaver,
            totalProbationEmployeeContract,
            totalActiveEmployees,
            localCurrency,
        };
    }
    async getInsightDashboard(args) {
        const { clientId } = args;
        const { currentDate } = this.startAndEndDateInCurrentYear();
        const categoryCodes = Object.keys(constants_1.PAY_ELEMENT_KEY_INSIGHT);
        const currentYear = currentDate.year();
        const ranges = [];
        const totalPromiseAllPromises = [];
        for (let month = 0; month < 12; month++) {
            const currentMonthYear = `${currentYear}-${month + 1}`;
            ranges.push(currentMonthYear);
            const totalPayCategoriesPromises = [];
            for (const categoryCode of categoryCodes) {
                totalPayCategoriesPromises.push(this.payrollReportService.getTotalPayCategories({
                    categoryType: 'aggregate',
                    input: {
                        categories: constants_1.PAY_ELEMENT_KEY_INSIGHT[categoryCode],
                        countryCodes: [],
                        currencyCodes: [],
                        payrollCyclesFrom: currentMonthYear,
                        payrollCyclesTo: currentMonthYear,
                        companyIds: [clientId],
                    },
                    specificCategoryForAggregate: categoryCode,
                }));
            }
            totalPromiseAllPromises.push(Promise.all(totalPayCategoriesPromises));
        }
        const totalPromiseAll = await Promise.all(totalPromiseAllPromises);
        return {
            countryCode: '',
            data: ranges.map((dateRange, i) => {
                const listTotalCategory = totalPromiseAll[i].reduce((accumulator, current) => ({ ...accumulator, ...current }), {});
                return { ...listTotalCategory, dateRange };
            }),
        };
    }
    async getListCountryOctoDashboard(octoCompanyId) {
        const clientIds = await this.getAllClientIds(octoCompanyId);
        return this.countryService.getAllCountries(clientIds);
    }
    startAndEndDateInCurrentYear() {
        const currentDate = moment.utc();
        const startDateOfYear = moment
            .utc({ year: currentDate.year() })
            .startOf('year');
        const endDateOfYear = moment
            .utc({ year: currentDate.year() })
            .endOf('year');
        return { currentDate, startDateOfYear, endDateOfYear };
    }
};
exports.OctoDashboardService = OctoDashboardService;
exports.OctoDashboardService = OctoDashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [country_1.CountryService,
        octo_task_service_1.OctoTaskService,
        employee_service_1.EmployeeService,
        prtrx_hdr_service_1.PrtrxHdrService,
        employee_contract_service_1.EmployeeContractService,
        company_parameter_1.CompanyParameterService,
        payroll_report_service_1.PayrollReportService,
        octo_company_service_1.OctoCompanyService,
        company_1.CompanyService,
        usd_forex_service_1.UsdForexService])
], OctoDashboardService);
//# sourceMappingURL=octo-dashboard.service.js.map
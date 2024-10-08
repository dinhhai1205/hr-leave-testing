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
exports.ExportTimeEntriesExcelFileService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../../common/constants");
const api_service_1 = require("../../../libs/api/api.service");
let ExportTimeEntriesExcelFileService = class ExportTimeEntriesExcelFileService {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async handleGenerateRawExcelFile(companyId, timeEntryOverviewDto) {
        const { data } = await this.apiService.request({
            type: 'GET_EXCEL_FILE',
            segments: { companyId: companyId },
            responseType: 'arraybuffer',
            params: timeEntryOverviewDto,
        });
        const fileBuffer = Buffer.from(data);
        return new common_1.StreamableFile(fileBuffer, {
            disposition: `attachment; filename="time-sheet-overview.xlsx"`,
            type: constants_1.CONTENT_TYPE.XLSX,
            length: fileBuffer.byteLength,
        });
    }
};
exports.ExportTimeEntriesExcelFileService = ExportTimeEntriesExcelFileService;
exports.ExportTimeEntriesExcelFileService = ExportTimeEntriesExcelFileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.TimeTrackerApiService])
], ExportTimeEntriesExcelFileService);
//# sourceMappingURL=export-time-entries-excel-file.service.js.map
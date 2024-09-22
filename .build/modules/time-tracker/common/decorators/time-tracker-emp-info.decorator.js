"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTrackerEmpInfo = void 0;
const common_1 = require("@nestjs/common");
const time_tracker_data_constant_1 = require("../constants/time-tracker-data.constant");
exports.TimeTrackerEmpInfo = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    const timeTrackerMapping = request?.[time_tracker_data_constant_1.TIME_TRACKER_DATA];
    return timeTrackerMapping;
});
//# sourceMappingURL=time-tracker-emp-info.decorator.js.map
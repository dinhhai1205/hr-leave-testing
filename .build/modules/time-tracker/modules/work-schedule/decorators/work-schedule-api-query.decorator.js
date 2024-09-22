"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkScheduleApiQuery = exports.ESORT = exports.WorkScheduleQuery = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const work_schedule_state_enum_1 = require("../../work-schedule/enums/work-schedule-state.enum");
exports.WorkScheduleQuery = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.query;
});
var ESORT;
(function (ESORT) {
    ESORT["ASC"] = "ASC";
    ESORT["DESC"] = "DESC";
})(ESORT || (exports.ESORT = ESORT = {}));
const WorkScheduleApiQuery = () => {
    return (target, key, descriptor) => {
        (0, swagger_1.ApiQuery)({
            name: 'state',
            enum: work_schedule_state_enum_1.EWorkScheduleState,
            required: false,
            description: `${work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED} || ${work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED} || ${work_schedule_state_enum_1.EWorkScheduleState.EXPIRED}`,
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'q',
            type: String,
            required: false,
            description: 'q',
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'page',
            type: Number,
            required: false,
            description: 'page',
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'take',
            type: Number,
            required: false,
            description: 'take',
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'sort',
            enum: ESORT,
            required: false,
            description: 'sort by createdOn',
        })(target, key, descriptor);
    };
};
exports.WorkScheduleApiQuery = WorkScheduleApiQuery;
//# sourceMappingURL=work-schedule-api-query.decorator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkScheduleAssignmentApiQuery = exports.WorkScheduleAssignmentQuery = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const work_schedule_state_enum_1 = require("../../work-schedule/enums/work-schedule-state.enum");
exports.WorkScheduleAssignmentQuery = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.query;
});
const WorkScheduleAssignmentApiQuery = () => {
    return (target, key, descriptor) => {
        (0, swagger_1.ApiQuery)({
            name: 'startDate',
            type: Date,
            required: false,
            description: 'from date',
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'endDate',
            type: Date,
            required: false,
            description: 'to date',
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'state',
            enum: work_schedule_state_enum_1.EWorkScheduleState,
            required: false,
            description: `${work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED} || ${work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED} || ${work_schedule_state_enum_1.EWorkScheduleState.EXPIRED}`,
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'workScheduleIds',
            type: [Number],
            required: false,
            description: 'list of work schedules',
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'employeeIds',
            type: [Number],
            required: false,
            description: 'list of work employee id',
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'orgPaths',
            type: [String],
            required: false,
            description: 'list of org path id',
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'groupIds',
            type: [Number],
            required: false,
            description: 'list of work group id',
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
    };
};
exports.WorkScheduleAssignmentApiQuery = WorkScheduleAssignmentApiQuery;
//# sourceMappingURL=work-schedule-api-query.decorator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardApiQuery = exports.DashboardQuery = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../../common");
exports.DashboardQuery = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.query;
});
const DashboardApiQuery = () => {
    return (target, key, descriptor) => {
        (0, swagger_1.ApiQuery)({
            name: 'from',
            type: Date,
            required: true,
            description: 'from date',
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'to',
            type: Date,
            required: true,
            description: 'to date',
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'groupId',
            type: String,
            required: false,
            description: 'Group Id',
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'scheduleId',
            type: String,
            required: false,
            description: 'Schedule Id',
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'locationId',
            type: String,
            required: false,
            description: 'Location Id',
        })(target, key, descriptor);
        (0, swagger_1.ApiQuery)({
            name: 'filter',
            type: String,
            enum: common_2.DashboardFilter,
            required: true,
            description: 'filter by',
        })(target, key, descriptor);
    };
};
exports.DashboardApiQuery = DashboardApiQuery;
//# sourceMappingURL=dashboard-api-query.decorator.js.map
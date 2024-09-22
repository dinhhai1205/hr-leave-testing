"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var QueueModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueModule = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const config_2 = require("../../config");
const config_3 = require("./config");
const producers_1 = require("./producers");
const slack_producer_1 = require("./producers/slack.producer");
const { ConfigurableModuleClass, OPTIONS_TYPE } = new common_1.ConfigurableModuleBuilder().build();
let QueueModule = QueueModule_1 = class QueueModule extends ConfigurableModuleClass {
    static forRoot(options = {}) {
        return {
            module: QueueModule_1,
            global: options.isGlobal || false,
            imports: [
                bullmq_1.BullModule.forRootAsync({
                    useClass: config_3.BullConfigFactory,
                    imports: [config_1.ConfigModule.forFeature(config_2.redisConfig)],
                }),
            ],
        };
    }
    static register(options) {
        const producers = [];
        const bullModules = options.queues.map(name => {
            switch (name) {
                case 'HRFORTE_NOTIFICATION':
                    producers.push(producers_1.HrforteNotificationProducer);
                    break;
                case 'LEAVE_MODULE_API_LOG':
                    producers.push(producers_1.LeaveModuleApiLogProducer);
                    break;
                case 'LEAVE_TYPE_POLICY':
                    producers.push(producers_1.LeaveTypePolicyProducer);
                    break;
                case 'SLACK':
                    producers.push(slack_producer_1.SlackProducer);
                    break;
                case 'WORK_SCHEDULE_ASSIGNMENT':
                    producers.push(producers_1.LeaveWorkScheduleAssignmentProducer);
                    break;
                case 'WORK_SCHEDULE':
                    producers.push(producers_1.LeaveWorkScheduleProducer);
                    break;
                default:
                    break;
            }
            return bullmq_1.BullModule.registerQueue({ name });
        });
        const flowProducers = (options.flows || []).map(flow => bullmq_1.BullModule.registerFlowProducer({
            name: flow,
        }));
        return {
            ...super.register(options),
            global: options.isGlobal,
            imports: [...bullModules, ...flowProducers],
            exports: [...bullModules, ...producers, ...flowProducers],
            providers: producers,
        };
    }
};
exports.QueueModule = QueueModule;
exports.QueueModule = QueueModule = QueueModule_1 = __decorate([
    (0, common_1.Module)({})
], QueueModule);
//# sourceMappingURL=queue.module.js.map
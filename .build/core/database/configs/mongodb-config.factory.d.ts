import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { MongoDbConfig } from '../../../config/mongodb.config';
export declare class MongoDbConfigFactory implements MongooseOptionsFactory {
    private readonly mongoDbConfig;
    constructor(mongoDbConfig: MongoDbConfig);
    createMongooseOptions(): MongooseModuleOptions;
}

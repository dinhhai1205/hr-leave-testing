"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiUtil = void 0;
const Joi = require("joi");
class JoiUtil {
    static stringRequire() {
        return Joi.string().required();
    }
    static stringOptional() {
        return Joi.string().optional();
    }
    static numberRequire() {
        return Joi.number().required();
    }
    static numberOptional() {
        return Joi.number().optional();
    }
    static validate(config) {
        const { joiKeyMapConfigKeys, joiSchemaObject, joiValues, keysNotInProcessEnv, } = this.buildJoiSchema(config);
        const { error, value: validatedConfig } = joiSchemaObject.validate(joiValues, { allowUnknown: true, abortEarly: false });
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return this.assignVariablesToProcess(joiKeyMapConfigKeys, validatedConfig, keysNotInProcessEnv);
    }
    static buildJoiSchema(config) {
        const configEntries = Object.entries(config);
        const joiObject = {};
        const joiValues = {};
        const joiKeyMapConfigKeys = new Map();
        const keysNotInProcessEnv = [];
        for (const [configKey, value] of configEntries) {
            const { key: joiKey, joi: schema } = value;
            joiObject[joiKey] = schema;
            joiValues[joiKey] = process.env[joiKey];
            joiKeyMapConfigKeys.set(joiKey, configKey);
            if (!(joiKey in process.env))
                keysNotInProcessEnv.push(joiKey);
        }
        return {
            joiKeyMapConfigKeys,
            joiSchemaObject: Joi.object(joiObject),
            joiValues,
            keysNotInProcessEnv,
        };
    }
    static assignVariablesToProcess(joiKeyMapConfigKeys, validatedConfig, keysNotInProcessEnv) {
        const configs = {};
        keysNotInProcessEnv.forEach(key => {
            const value = validatedConfig[key];
            if (typeof value === 'string') {
                process.env[key] = value;
            }
            else if (typeof value === 'boolean' || typeof value === 'number') {
                process.env[key] = `${value}`;
            }
        });
        joiKeyMapConfigKeys.forEach((configKey, joiKey) => {
            configs[configKey] = validatedConfig[joiKey];
        });
        return configs;
    }
}
exports.JoiUtil = JoiUtil;
//# sourceMappingURL=joi.util.js.map
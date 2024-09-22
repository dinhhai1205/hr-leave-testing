"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumnNamesEntity = getColumnNamesEntity;
const typeorm_1 = require("typeorm");
const camel_to_snake_case_util_1 = require("../../../common/utils/camel-to-snake-case.util");
const init_props_object_util_1 = require("../../../common/utils/init-props-object.util");
function getColumnNamesEntity(entity, options = {}) {
    const { snakeCase, providedId = true, withPrefix, excludeColumns, } = (0, init_props_object_util_1.initPropsObject)(options, {
        providedId: true,
        snakeCase: false,
        excludeColumns: [],
    });
    const columns = [];
    const metadata = (0, typeorm_1.getMetadataArgsStorage)();
    if (!metadata.columns.length)
        return [];
    if (providedId) {
        columns.push(withPrefix ? `${withPrefix}.id` : 'id');
    }
    for (const columnMetadata of metadata.columns) {
        if (columnMetadata.target === entity.constructor &&
            columnMetadata.propertyName) {
            const columnWithoutPrefix = columnMetadata.propertyName;
            if (excludeColumns.length &&
                excludeColumns.includes(columnWithoutPrefix)) {
                continue;
            }
            const columnName = withPrefix
                ? `${withPrefix}.${columnWithoutPrefix}`
                : columnWithoutPrefix;
            snakeCase === true
                ? columns.push((0, camel_to_snake_case_util_1.camelToSnakeCase)(columnName))
                : columns.push(columnName);
        }
    }
    return columns;
}
//# sourceMappingURL=get-columns-name-entity.util.js.map
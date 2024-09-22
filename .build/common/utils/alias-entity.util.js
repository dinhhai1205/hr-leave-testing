"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliasEntity = aliasEntity;
function aliasEntity(entity) {
    let entityName = entity['name'];
    entityName = entityName.replace('Entity', '');
    const spacedStr = entityName.replace(/([a-z])([A-Z])/g, '$1 $2');
    const camelCasedStr = spacedStr
        .split(' ')
        .map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
        .join('');
    return camelCasedStr;
}
//# sourceMappingURL=alias-entity.util.js.map
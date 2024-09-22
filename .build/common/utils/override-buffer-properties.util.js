"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideBufferProperties = overrideBufferProperties;
function overrideBufferProperties(obj, newValue) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    const seenObjects = new WeakSet();
    const stack = [{ parent: null, key: null, value: obj }];
    while (stack.length > 0) {
        const { parent, key, value } = stack.pop();
        if (typeof value !== 'object' || value === null) {
            continue;
        }
        if (Buffer.isBuffer(value) || value?.type === 'Buffer') {
            if (parent) {
                Object.assign(parent, { [key]: newValue });
            }
            continue;
        }
        if (seenObjects.has(value)) {
            continue;
        }
        seenObjects.add(value);
        Object.entries(value).forEach(([key, val]) => {
            stack.push({ parent: value, key, value: val });
        });
    }
    return obj;
}
//# sourceMappingURL=override-buffer-properties.util.js.map
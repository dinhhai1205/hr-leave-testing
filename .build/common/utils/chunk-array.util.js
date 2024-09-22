"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkArray = chunkArray;
function chunkArray(array, chunkSize = 50) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}
//# sourceMappingURL=chunk-array.util.js.map
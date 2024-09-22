"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrailingWords = getTrailingWords;
function getTrailingWords(str) {
    const words = str.match(/[A-Z][a-z]+/g);
    if (!words)
        return '';
    const selectedWords = words.slice(1);
    const formattedWords = selectedWords.join(' ');
    return formattedWords;
}
//# sourceMappingURL=get-trailing-words.util.js.map
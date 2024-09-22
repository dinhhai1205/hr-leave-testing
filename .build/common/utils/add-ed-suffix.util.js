"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEdSuffix = addEdSuffix;
function addEdSuffix(verb) {
    if (verb.length <= 1 || verb.endsWith('ed') || verb.endsWith('ing')) {
        return verb;
    }
    const irregularVerbs = {
        go: 'went',
        be: 'been',
        have: 'had',
        do: 'done',
    };
    if (verb in irregularVerbs) {
        return irregularVerbs[verb];
    }
    const regularVerbEndings = {
        e: 'ed',
        y: 'ied',
    };
    const lastLetter = verb[verb.length - 1];
    if (lastLetter in regularVerbEndings) {
        const suffix = regularVerbEndings[lastLetter];
        return verb.slice(0, -1) + suffix;
    }
    else if (isCVC(verb)) {
        return verb + lastLetter + 'ed';
    }
    else {
        return verb + 'ed';
    }
}
function isCVC(word) {
    if (word.length >= 3) {
        const lastLetter = word[word.length - 1];
        const secondLastLetter = word[word.length - 2];
        const thirdLastLetter = word[word.length - 3];
        return (isConsonant(thirdLastLetter) &&
            isVowel(secondLastLetter) &&
            isConsonant(lastLetter));
    }
    return false;
}
function isVowel(char) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return vowels.includes(char.toLowerCase());
}
function isConsonant(char) {
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    return consonants.includes(char.toLowerCase());
}
//# sourceMappingURL=add-ed-suffix.util.js.map
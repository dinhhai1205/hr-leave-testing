"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFormatOutputGetOverviewTimeEntries = handleFormatOutputGetOverviewTimeEntries;
exports.handleFormatOutputGetDetailTimeEntries = handleFormatOutputGetDetailTimeEntries;
function handleFormatOutputGetOverviewTimeEntries(input) {
    return { data: input, itemsCount: input.length };
}
function handleFormatOutputGetDetailTimeEntries(input) {
    return { data: input };
}
//# sourceMappingURL=format-output-time-entries.js.map
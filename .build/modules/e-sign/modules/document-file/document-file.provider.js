"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocumentFileProvider = createDocumentFileProvider;
const document_file_module_options_key_constant_1 = require("./constants/document-file-module-options-key.constant");
function createDocumentFileProvider(options) {
    return [
        {
            provide: document_file_module_options_key_constant_1.DOCUMENT_FILE_MODULE_OPTIONS_KEY,
            useValue: options || {},
        },
    ];
}
//# sourceMappingURL=document-file.provider.js.map
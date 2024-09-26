"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateService = void 0;
const client_translate_1 = require("@aws-sdk/client-translate");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../common/constants");
const utils_1 = require("../../common/utils");
const aws_1 = require("../../libs/aws");
let TranslateService = class TranslateService {
    constructor(awsTranslateService) {
        this.awsTranslateService = awsTranslateService;
        this.translateClient = this.awsTranslateService.translateClient;
    }
    async getTranslatedFile(params) {
        const { langCode, file, fileDataObj } = params;
        if (!file && !fileDataObj)
            return {};
        const { sourceLanguageCode, targetLanguageCode } = langCode;
        const fileObj = fileDataObj
            ? fileDataObj
            : (0, utils_1.safeJsonParse)({
                text: file.buffer.toString(),
                defaultValueReturn: {},
            });
        const listKeys = [];
        const listContents = [];
        for (const [key, content] of Object.entries(fileObj)) {
            if (!key || !content)
                continue;
            if (typeof key !== 'string') {
                throw new common_1.BadRequestException(`The key ${key} must be a string`);
            }
            let contentToTranslate = content;
            if (typeof content !== 'string') {
                contentToTranslate = contentToTranslate.toString();
            }
            listKeys.push(key);
            listContents.push(contentToTranslate.trim());
        }
        if (!listContents.length) {
            throw new common_1.BadRequestException('File content is empty');
        }
        const data = listContents.join('\n');
        const translatedText = await this.translateFile({ buffer: Buffer.from(data), mimetype: constants_1.CONTENT_TYPE.TXT }, { sourceLanguageCode, targetLanguageCode });
        const listContentTranslated = translatedText.split('\n');
        const contentTranslatedLength = listContentTranslated.length;
        const translatedResult = {};
        for (let index = 0; index < contentTranslatedLength; index++) {
            const content = listContentTranslated[index]
                ? listContentTranslated[index]
                : listContents[index];
            const key = listKeys[index];
            if (content && key)
                translatedResult[key] = content;
        }
        return translatedResult;
    }
    async translateFile(file, { sourceLanguageCode, targetLanguageCode }) {
        const command = new client_translate_1.TranslateDocumentCommand({
            Document: {
                Content: file.buffer,
                ContentType: file.mimetype,
            },
            SourceLanguageCode: sourceLanguageCode,
            TargetLanguageCode: targetLanguageCode,
            Settings: {},
        });
        const response = await this.translateClient.send(command);
        if (!response.TranslatedDocument || !response.TranslatedDocument?.Content) {
            throw new common_1.BadRequestException('Translated file is empty');
        }
        const content = response.TranslatedDocument.Content;
        const decoder = new TextDecoder();
        return decoder.decode(content);
    }
    async translateText(text, { sourceLanguageCode, targetLanguageCode }) {
        const command = new client_translate_1.TranslateTextCommand({
            Text: text,
            SourceLanguageCode: sourceLanguageCode,
            TargetLanguageCode: targetLanguageCode,
        });
        const { TranslatedText: translatedText } = await this.translateClient.send(command);
        return translatedText ? translatedText : '';
    }
    async compareChanges(files) {
        const oldBufferFile = files[0]?.buffer;
        const bufferFileToCompare = files[1]?.buffer;
        if (!oldBufferFile || !bufferFileToCompare) {
            throw new common_1.BadRequestException('File is missing.');
        }
        const oldFileContent = (0, utils_1.safeJsonParse)({
            text: oldBufferFile.toString(),
            defaultValueReturn: {},
        });
        const newFileContent = (0, utils_1.safeJsonParse)({
            text: bufferFileToCompare.toString(),
            defaultValueReturn: {},
        });
        const result = {};
        for (const [key, newValue] of Object.entries(newFileContent)) {
            if (!oldFileContent[key] || newValue !== oldFileContent[key]) {
                result[key] = newValue;
            }
        }
        return result;
    }
};
exports.TranslateService = TranslateService;
exports.TranslateService = TranslateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [aws_1.AwsTranslateService])
], TranslateService);
//# sourceMappingURL=translate.service.js.map
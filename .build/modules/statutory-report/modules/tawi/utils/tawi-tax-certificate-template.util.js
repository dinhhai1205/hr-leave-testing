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
exports.TawiTaxCertificateTemplateUtil = void 0;
const common_1 = require("@nestjs/common");
const fontkit = require("@pdf-lib/fontkit");
const pdf_lib_1 = require("pdf-lib");
const aws_1 = require("../../../../../libs/aws");
const enums_1 = require("../enums");
let TawiTaxCertificateTemplateUtil = class TawiTaxCertificateTemplateUtil {
    constructor(awsS3Service) {
        this.awsS3Service = awsS3Service;
        this.fileNames = [
            'affix-corporate-seal-en.png',
            'affix-corporate-seal-th.png',
            'Sarabun-Regular.ttf',
            'Sarabun-SemiBold.ttf',
        ];
    }
    async getPdfAssets() {
        const promises = [];
        for (const fileName of this.fileNames) {
            const input = {
                Key: fileName,
                ResponseContentDisposition: fileName,
            };
            promises.push(this.awsS3Service.getObjectResponse(input));
        }
        const awsResponses = await Promise.all(promises);
        const fileBufferPromises = [];
        for (let i = 0; i < awsResponses.length; i++) {
            const { Body: awsBody } = awsResponses[i];
            if (!awsBody) {
                throw new common_1.InternalServerErrorException(`An error occurs when fetch assets for PDF processing. (${this.fileNames[i]})`);
            }
            fileBufferPromises.push(awsBody.transformToByteArray());
        }
        const [imgSealEn, imgSealTh, fontSabunRegular, fontSabunBold] = await Promise.all(fileBufferPromises);
        return { fontSabunRegular, fontSabunBold, imgSealEn, imgSealTh };
    }
    async generateWithholdingTaxCertificate(propData, lang, year) {
        const [pdfDoc, pdfAssets] = await Promise.all([
            pdf_lib_1.PDFDocument.create(),
            this.getPdfAssets(),
        ]);
        pdfDoc.registerFontkit(fontkit);
        const { imgSealEn, imgSealTh, fontSabunRegular, fontSabunBold } = pdfAssets;
        const [font, fontBold] = await Promise.all([
            pdfDoc.embedFont(fontSabunRegular, { subset: true }),
            pdfDoc.embedFont(fontSabunBold, { subset: true }),
        ]);
        let dataContent = {
            formFieldPositions: [],
            checkboxData: [],
            borderLines: [],
        };
        for (const tawiData of propData) {
            const page = pdfDoc.addPage();
            const { width: pageWidth } = page.getSize();
            const fontSize = 8;
            const fontHeader = 12;
            const fontColor = (0, pdf_lib_1.rgb)(0, 0, 0);
            let pngImage;
            switch (lang) {
                case enums_1.ETawiReportLanguageSupported.EN:
                    dataContent = this.generateEngContent(pageWidth, fontBold, fontSize, fontHeader);
                    pngImage = await pdfDoc.embedPng(imgSealEn);
                    break;
                case enums_1.ETawiReportLanguageSupported.TH:
                    dataContent = this.generateThaiContent(pageWidth, fontBold, fontSize, fontHeader);
                    pngImage = await pdfDoc.embedPng(imgSealTh);
                    break;
                default:
                    dataContent = {
                        formFieldPositions: [],
                        checkboxData: [],
                        borderLines: [],
                    };
                    pngImage = null;
                    break;
            }
            const formFieldPositions = dataContent.formFieldPositions;
            pngImage &&
                page.drawImage(pngImage, {
                    x: 480,
                    y: 100,
                    width: 40,
                    height: 40,
                });
            const checkboxData = dataContent.checkboxData;
            for (const { name, x, y, fontSize, checked } of checkboxData) {
                page.drawText('[', {
                    x: x,
                    y: y,
                    size: fontSize,
                    font,
                });
                if (checked) {
                    page.drawText('X', {
                        x: x + 4,
                        y: y,
                        size: fontSize,
                        font,
                        color: (0, pdf_lib_1.rgb)(0, 0, 0),
                    });
                }
                page.drawText(']', {
                    x: x + 10,
                    y: y,
                    size: fontSize,
                    font,
                });
                page.drawText(name, {
                    x: x + 15,
                    y: y - 1,
                    size: fontSize,
                    font,
                    color: (0, pdf_lib_1.rgb)(0, 0, 0),
                });
            }
            const drawBorders = (page) => {
                const borderLines = dataContent.borderLines;
                for (const line of borderLines) {
                    page.drawLine({
                        start: line.start,
                        end: line.end,
                        thickness: 1,
                        color: (0, pdf_lib_1.rgb)(0, 0, 0),
                        opacity: 0.75,
                    });
                }
            };
            drawBorders(page);
            const bytax = (year + 543)?.toFixed(0);
            const { companyNameLocal = '', companyTaxCode = '', companyAddress = '', idCardNumber = '', employeeFullNameLocal = '', employeeAddress = '', incomeSubjTax = 0, totalPIT = 0, totalSSO = 0, totalProvidentFund = 0, } = tawiData;
            const formFieldPositionsToUpdate = [
                { name: 'companyNameLocal', value: companyNameLocal },
                { name: 'companyTaxCode', value: String(companyTaxCode || '') },
                { name: 'companyAddress', value: companyAddress },
                { name: 'idCardNumber', value: String(idCardNumber || '') },
                { name: 'employeeFullNameLocal', value: employeeFullNameLocal },
                { name: 'employeeAddress', value: employeeAddress },
                { name: 'bytax', value: bytax },
                { name: 'incomeSubjTax', value: incomeSubjTax.toFixed(2) },
                { name: 'totalPIT', value: totalPIT.toFixed(2) },
                { name: 'totalSSO', value: totalSSO.toFixed(2) },
                { name: 'totalProvidentFund', value: totalProvidentFund.toFixed(1) },
            ];
            for (const field of formFieldPositions) {
                const fieldToUpdateIndex = formFieldPositionsToUpdate.findIndex(f => f.name === field.name);
                if (fieldToUpdateIndex !== -1) {
                    field.name = formFieldPositionsToUpdate[fieldToUpdateIndex].value;
                }
            }
            for (const field of formFieldPositions) {
                page.drawText(field.name, {
                    x: field.x,
                    y: field.y,
                    size: field.fontSize,
                    font: font,
                    color: fontColor,
                });
            }
        }
        const pdfBuffer = await pdfDoc.save();
        const pdfLength = pdfBuffer.byteLength;
        const pdfType = pdfBuffer.constructor.name;
        return { pdfBuffer, pdfLength, pdfType };
    }
    generateEngContent(pageWidth, fontBold, fontSize, fontHeader) {
        const formFieldPositions = [
            {
                name: 'Withholding Tax Certificate',
                x: pageWidth / 2 - 60,
                y: 776,
                font: fontBold,
                fontSize: fontHeader,
            },
            { name: 'book No.......', x: 510, y: 777, fontSize: fontSize },
            {
                name: 'Section 50 Bis of the Revenue Code',
                x: pageWidth / 2 - 53,
                y: 766,
                font: fontBold,
                fontSize: fontSize - 1,
            },
            { name: 'No................', x: 510, y: 766, fontSize: fontSize },
            {
                name: 'The person liable to withhold tax',
                x: 35,
                y: 755,
                font: fontBold,
                fontSize: fontSize,
            },
            {
                name: 'Personal Identification No........................................................................................',
                x: pageWidth / 2 - 53,
                y: 755,
                fontSize: fontSize,
            },
            {
                name: 'companyTaxCode',
                x: pageWidth / 2 + 50,
                y: 757,
                fontSize: fontSize,
            },
            {
                name: 'Name......................................................................................',
                x: 35,
                y: 742,
                fontSize: fontSize,
            },
            {
                name: 'companyNameLocal',
                x: 70,
                y: 745,
                fontSize: fontSize,
            },
            {
                name: 'Tax Identification No..........................................................',
                x: pageWidth / 2,
                y: 742,
                fontSize: fontSize,
            },
            {
                name: 'companyTaxCode',
                x: pageWidth / 2 + 80,
                y: 745,
                fontSize: fontSize,
            },
            {
                name: '(Clearly specify a person, juristic, company, association or a body of person)',
                x: 56,
                y: 737,
                fontSize: fontSize - 3,
            },
            {
                name: 'Address.........................................................................................................................................................................................................',
                x: 35,
                y: 726,
                fontSize: fontSize,
            },
            {
                name: 'companyAddress',
                x: 80,
                y: 728,
                fontSize: fontSize,
            },
            {
                name: '(Clearly specify detail of address)',
                x: 70,
                y: 721,
                fontSize: fontSize - 3,
            },
            {
                name: 'Taxpayer from whom tax is withheld ',
                x: 35,
                y: 713,
                font: fontBold,
                fontSize: fontSize,
            },
            {
                name: 'Personal Identification No. ............................................................................',
                x: pageWidth / 2 - 53,
                y: 713,
                fontSize: fontSize,
            },
            {
                name: 'idCardNumber',
                x: pageWidth / 2 + 50,
                y: 715,
                fontSize: fontSize,
            },
            {
                name: 'Name......................................................................................',
                x: 35,
                y: 702,
                fontSize: fontSize,
            },
            {
                name: 'employeeFullNameLocal',
                x: 70,
                y: 704,
                fontSize: fontSize,
            },
            {
                name: 'Tax Identification No..........................................................',
                x: pageWidth / 2,
                y: 702,
                fontSize: fontSize,
            },
            {
                name: '(Clearly specify a person, juristic, company, association or a body of person)',
                x: 56,
                y: 697,
                fontSize: fontSize - 2,
            },
            {
                name: 'Address.........................................................................................................................................................................................................',
                x: 35,
                y: 683,
                fontSize: fontSize,
            },
            {
                name: 'employeeAddress',
                x: 80,
                y: 685,
                fontSize: fontSize,
            },
            {
                name: '(Clearly specify detail of address)',
                x: 70,
                y: 678,
                fontSize: fontSize - 2,
            },
            {
                name: 'Sequence No. ................ in Form',
                x: 35,
                y: 665,
                fontSize: fontSize,
            },
            {
                name: '(For the purpose of examination)',
                x: 35,
                y: 650,
                fontSize: fontSize,
            },
            {
                name: 'Type of income',
                x: 150,
                y: 636,
                font: fontBold,
                fontSize: fontSize,
            },
            {
                name: 'Date paid',
                x: 300,
                y: 636,
                font: fontBold,
                fontSize: fontSize,
            },
            {
                name: 'Amount paid',
                x: 370,
                y: 636,
                font: fontBold,
                fontSize: fontSize,
            },
            {
                name: 'Tax withheld',
                x: 450,
                y: 636,
                font: fontBold,
                fontSize: fontSize,
            },
            {
                name: '1. Salary, wage, pension, etc. under Section 40(1)',
                x: 35,
                y: 623,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 623,
                fontSize: fontSize,
            },
            {
                name: 'bytax',
                x: 297,
                y: 625,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 623,
                fontSize: fontSize,
            },
            {
                name: 'incomeSubjTax',
                x: 370,
                y: 625,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 623,
                fontSize: fontSize,
            },
            {
                name: 'totalPIT',
                x: 450,
                y: 625,
                fontSize: fontSize,
            },
            {
                name: '2. Commissions etc. under Section 40(2)',
                x: 35,
                y: 612,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 612,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 612,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 612,
                fontSize: fontSize,
            },
            {
                name: '3. Royalties etc. under Section 40(3)',
                x: 35,
                y: 601,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 601,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 601,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 601,
                fontSize: fontSize,
            },
            {
                name: '4. (a) Interest, etc. under Section 40(4)(a)',
                x: 35,
                y: 590,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 590,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 590,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 590,
                fontSize: fontSize,
            },
            {
                name: '(b) Dividend, share of profit etc. under Section 40(4)(b)',
                x: 44,
                y: 578,
                fontSize: fontSize,
            },
            {
                name: '(1) In the case where the receipient of the dividend is entitled to a',
                x: 53,
                y: 567,
                fontSize: fontSize,
            },
            {
                name: 'tax credit because the dividends is paid from net profit of business which',
                x: 35,
                y: 556,
                fontSize: fontSize,
            },
            {
                name: 'has paid income tax in these following tax rate:',
                x: 35,
                y: 545,
                fontSize: fontSize,
            },
            {
                name: '(1.1) 30 percent of net profit.',
                x: 60,
                y: 534,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 534,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 534,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 534,
                fontSize: fontSize,
            },
            {
                name: '(1.2) 25 percent of net profit.',
                x: 60,
                y: 523,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 523,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 523,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 523,
                fontSize: fontSize,
            },
            {
                name: '(1.3) 20 percent of net profit.',
                x: 60,
                y: 512,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 512,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 512,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 512,
                fontSize: fontSize,
            },
            {
                name: '(1.4) Other rate (specify)...........percent of net profit.',
                x: 60,
                y: 501,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 501,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 501,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 501,
                fontSize: fontSize,
            },
            {
                name: '(2) In the case where the receipient of the dividend is not entitled to',
                x: 53,
                y: 490,
                fontSize: fontSize,
            },
            {
                name: 'a tax credit because the dividends is paid from',
                x: 35,
                y: 479,
                fontSize: fontSize,
            },
            {
                name: '(2.1) Net profit of business that is exempted from income tax.',
                x: 60,
                y: 468,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 468,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 468,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 468,
                fontSize: fontSize,
            },
            {
                name: '(2.2) Dividend on share of profit which is exempted from ',
                x: 60,
                y: 457,
                fontSize: fontSize,
            },
            {
                name: 'calculated income tax.',
                x: 60,
                y: 446,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 446,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 446,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 446,
                fontSize: fontSize,
            },
            {
                name: '(2.3) The portion of net profit after deduction of net loss carried',
                x: 60,
                y: 435,
                fontSize: fontSize,
            },
            {
                name: 'forward for five years up to the present accounting period.',
                x: 35,
                y: 424,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 424,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 424,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 424,
                fontSize: fontSize,
            },
            {
                name: '(2.4) Recognition of profits using the equity method.',
                x: 60,
                y: 413,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 413,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 413,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 413,
                fontSize: fontSize,
            },
            {
                name: '(2.5) Others (Please specify).............................',
                x: 60,
                y: 402,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 402,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 402,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 402,
                fontSize: fontSize,
            },
            {
                name: '5. Payment of income subject to withholding tax according to ',
                x: 35,
                y: 391,
                fontSize: fontSize,
            },
            {
                name: 'the Revenue. Department’s Instruction issued under Section 3 Tredecim,',
                x: 35,
                y: 380,
                fontSize: fontSize,
            },
            {
                name: 'such as prizes, any reductions or benefits due to sales promotions, prices ',
                x: 35,
                y: 369,
                fontSize: fontSize,
            },
            {
                name: 'received from contests, competitions or lucky draws, public',
                x: 35,
                y: 358,
                fontSize: fontSize,
            },
            {
                name: 'entertainers’ income, income derived from performance of work,',
                x: 35,
                y: 348,
                fontSize: fontSize,
            },
            {
                name: 'advertisement fees, rents, transportation fees, services fees,',
                x: 35,
                y: 337,
                fontSize: fontSize,
            },
            {
                name: 'insurance premiums against loss, etc.',
                x: 35,
                y: 326,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 326,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 326,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 326,
                fontSize: fontSize,
            },
            {
                name: '6. Others (Please specify)............................... ',
                x: 35,
                y: 315,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 315,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 315,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 315,
                fontSize: fontSize,
            },
            {
                name: 'Total amount of income and total amount of withholding tax',
                x: 120,
                y: 284,
                fontSize: fontSize,
            },
            {
                name: 'incomeSubjTax',
                x: 370,
                y: 284,
                fontSize: fontSize,
            },
            {
                name: 'totalPIT',
                x: 450,
                y: 284,
                fontSize: fontSize,
            },
            {
                name: 'Total withholding tax (in letters): ..............................................................................................................................',
                x: 35,
                y: 262,
                fontSize: fontSize,
            },
            {
                name: 'Amount paid to : Government Pension Fund / Government Permanent Employee Fund / Private Teachers Aid Fund.  .......................',
                x: 35,
                y: 240,
                fontSize: fontSize,
            },
            {
                name: '0.0',
                x: 455,
                y: 241,
                fontSize: fontSize,
            },
            {
                name: 'Social Security Fund ...............................',
                x: 97,
                y: 218,
                fontSize: fontSize,
            },
            {
                name: 'totalSSO',
                x: 175,
                y: 220,
                fontSize: fontSize,
            },
            {
                name: 'Provident Fund .................................',
                x: 265,
                y: 218,
                fontSize: fontSize,
            },
            {
                name: 'totalProvidentFund',
                x: 330,
                y: 220,
                fontSize: fontSize,
            },
            {
                name: 'Payer : ',
                x: 35,
                y: 186,
                fontSize: fontSize,
            },
            {
                name: 'Warning :The person liable to issue a withholding tax certificate.',
                x: 35,
                y: 142,
                fontSize: fontSize,
            },
            {
                name: 'I hereby certify that the particulars given above are true',
                x: 300,
                y: 142,
                fontSize: fontSize,
            },
            {
                name: 'fails to comply with Section 50 Bis of the Revenue Code shall be',
                x: 35,
                y: 131,
                fontSize: fontSize,
            },
            {
                name: 'sign...................................................................payer',
                x: 300,
                y: 131,
                fontSize: fontSize,
            },
            {
                name: 'subject to criminal charges under Section 35 of the Revenue',
                x: 35,
                y: 120,
                fontSize: fontSize,
            },
            {
                name: '............/................./................',
                x: 350,
                y: 120,
                fontSize: fontSize,
            },
            {
                name: 'Code.',
                x: 35,
                y: 109,
                fontSize: fontSize,
            },
            {
                name: 'Date/month/year issuing tax certificate',
                x: 330,
                y: 109,
                fontSize: fontSize,
            },
        ];
        const checkboxData = [
            {
                name: 'copy 1 (to be attached with income receiver’s tax return)',
                x: 34,
                y: 810,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: 'copy 2 (to be kept by income receiver as reference)',
                x: 34,
                y: 799,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: 'copy 3 (to be kept by income payer)',
                x: 34,
                y: 788,
                fontSize: fontSize,
                checked: false,
            },
            { name: 'P.N.D.1a', x: 170, y: 665, fontSize: fontSize, checked: true },
            {
                name: 'P.N.D.1a Ex',
                x: 240,
                y: 665,
                fontSize: fontSize,
                checked: false,
            },
            { name: 'P.N.D.2', x: 320, y: 665, fontSize: fontSize, checked: false },
            { name: 'P.N.D.3', x: 390, y: 665, fontSize: fontSize, checked: false },
            {
                name: 'P.N.D.2a',
                x: 170,
                y: 650,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: 'P.N.D.3a',
                x: 240,
                y: 650,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: 'P.N.D.53',
                x: 320,
                y: 650,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: '(1) Withhold at source ',
                x: 80,
                y: 186,
                fontSize: fontSize,
                checked: true,
            },
            {
                name: '(2) Pay every time',
                x: 180,
                y: 186,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: '(3) Pay one time',
                x: 280,
                y: 186,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: '(4) others (Please specify) ......',
                x: 380,
                y: 186,
                fontSize: fontSize,
                checked: false,
            },
        ];
        const borderLines = [
            { start: { x: 34, y: 645 }, end: { x: 520, y: 645 } },
            { start: { x: 34, y: 645 }, end: { x: 34, y: 305 } },
            { start: { x: 34, y: 305 }, end: { x: 520, y: 305 } },
            { start: { x: 520, y: 305 }, end: { x: 520, y: 645 } },
            { start: { x: 34, y: 632 }, end: { x: 520, y: 632 } },
            { start: { x: 295, y: 645 }, end: { x: 295, y: 305 } },
            { start: { x: 365, y: 645 }, end: { x: 365, y: 277 } },
            { start: { x: 445, y: 645 }, end: { x: 445, y: 277 } },
            { start: { x: 34, y: 305 }, end: { x: 34, y: 258 } },
            { start: { x: 34, y: 258 }, end: { x: 520, y: 258 } },
            { start: { x: 520, y: 258 }, end: { x: 520, y: 305 } },
            { start: { x: 34, y: 277 }, end: { x: 520, y: 277 } },
            { start: { x: 34, y: 250 }, end: { x: 520, y: 250 } },
            { start: { x: 34, y: 250 }, end: { x: 34, y: 210 } },
            { start: { x: 520, y: 250 }, end: { x: 520, y: 210 } },
            { start: { x: 34, y: 210 }, end: { x: 520, y: 210 } },
            { start: { x: 34, y: 200 }, end: { x: 520, y: 200 } },
            { start: { x: 34, y: 200 }, end: { x: 34, y: 177 } },
            { start: { x: 520, y: 200 }, end: { x: 520, y: 177 } },
            { start: { x: 34, y: 177 }, end: { x: 520, y: 177 } },
            { start: { x: 34, y: 150 }, end: { x: 275, y: 150 } },
            { start: { x: 34, y: 150 }, end: { x: 275, y: 150 } },
            { start: { x: 290, y: 150 }, end: { x: 520, y: 150 } },
            { start: { x: 290, y: 150 }, end: { x: 520, y: 150 } },
            { start: { x: 34, y: 150 }, end: { x: 34, y: 105 } },
            { start: { x: 34, y: 105 }, end: { x: 275, y: 105 } },
            { start: { x: 275, y: 105 }, end: { x: 275, y: 150 } },
            { start: { x: 290, y: 105 }, end: { x: 520, y: 105 } },
            { start: { x: 290, y: 150 }, end: { x: 290, y: 105 } },
            { start: { x: 290, y: 150 }, end: { x: 290, y: 105 } },
            { start: { x: 520, y: 150 }, end: { x: 520, y: 105 } },
        ];
        return { formFieldPositions, checkboxData, borderLines };
    }
    generateThaiContent(pageWidth, fontBold, fontSize, fontHeader) {
        const formFieldPositions = [
            {
                name: 'หนังส ื อรับรองการหักภาษีณ ทจ่ีาย',
                x: pageWidth / 2 - 60,
                y: 776,
                font: fontBold,
                fontSize: fontHeader,
            },
            { name: 'เล่มท.......', x: 510, y: 777, fontSize: fontSize },
            {
                name: 'ตามมาตรา 50 ทวิแหงประมวลร ่ ษฎากร',
                x: pageWidth / 2 - 53,
                y: 766,
                font: fontBold,
                fontSize: fontSize - 1,
            },
            { name: 'เลขท................', x: 510, y: 766, fontSize: fontSize },
            {
                name: 'ผู้มีหน้าที่หักภาษีณ ที่จ่าย',
                x: 35,
                y: 755,
                font: fontBold,
                fontSize: fontSize,
            },
            {
                name: 'เลขประจำตัวผู้เสียภาษีอากร (13 หลัก)........................................................................................',
                x: pageWidth / 2 - 53,
                y: 755,
                fontSize: fontSize,
            },
            {
                name: 'companyTaxCode',
                x: pageWidth / 2 + 80,
                y: 757,
                fontSize: fontSize,
            },
            {
                name: 'ชื่อ......................................................................................',
                x: 35,
                y: 742,
                fontSize: fontSize,
            },
            {
                name: 'companyNameLocal',
                x: 70,
                y: 745,
                fontSize: fontSize,
            },
            {
                name: 'เลขประจำตัวผู้เสียภาษีอากร..........................................................',
                x: pageWidth / 2 - 53,
                y: 742,
                fontSize: fontSize,
            },
            {
                name: 'companyTaxCode',
                x: pageWidth / 2 + 70,
                y: 745,
                fontSize: fontSize,
            },
            {
                name: '(ให้ระบุว่าเป็น บุคคล นิติบุคคล บริษัท สมาคม หรือคณะบุคคล)',
                x: 56,
                y: 737,
                fontSize: fontSize - 3,
            },
            {
                name: 'ที่อยู่.........................................................................................................................................................................................................',
                x: 35,
                y: 726,
                fontSize: fontSize,
            },
            {
                name: 'companyAddress',
                x: 80,
                y: 728,
                fontSize: fontSize,
            },
            {
                name: '(ให้ระบุชื่ออาคาร/หมู่บ้าน ห้องเลขที่ชั้นที่ เลขที่ ตรอก/ซอย หมู่ที่ถนน ตำบล/แขวง อำเภอ/เขต จังหวัด)',
                x: 70,
                y: 721,
                fontSize: fontSize - 3,
            },
            {
                name: 'ผู้ถูกหักภาษีณ ที่จ่าย',
                x: 35,
                y: 713,
                font: fontBold,
                fontSize: fontSize,
            },
            {
                name: 'เลขประจำตัวผู้เสียภาษีอากร (13 หลัก). ............................................................................',
                x: pageWidth / 2 - 53,
                y: 713,
                fontSize: fontSize,
            },
            {
                name: 'idCardNumber',
                x: pageWidth / 2 + 85,
                y: 715,
                fontSize: fontSize,
            },
            {
                name: 'ชื่อ......................................................................................',
                x: 35,
                y: 702,
                fontSize: fontSize,
            },
            {
                name: 'employeeFullNameLocal',
                x: 70,
                y: 704,
                fontSize: fontSize,
            },
            {
                name: 'เลขประจำตัวผู้เสียภาษีอากร..........................................................',
                x: pageWidth / 2,
                y: 702,
                fontSize: fontSize,
            },
            {
                name: '(ให้ระบุว่าเป็น บุคคล นิติบุคคล บริษัท สมาคม หรือคณะบุคคล)',
                x: 56,
                y: 697,
                fontSize: fontSize - 2,
            },
            {
                name: 'ที่อยู่.........................................................................................................................................................................................................',
                x: 35,
                y: 683,
                fontSize: fontSize,
            },
            {
                name: 'employeeAddress',
                x: 80,
                y: 685,
                fontSize: fontSize,
            },
            {
                name: '(ให้ระบุชื่ออาคาร/หมู่บ้าน ห้องเลขที่ชั้นที่ เลขที่ ตรอก/ซอย หมู่ที่ถนน ตำบล/แขวง อำเภอ/เขต จังหวัด)',
                x: 70,
                y: 678,
                fontSize: fontSize - 2,
            },
            {
                name: 'ลำดับท. ................ ในแบบ',
                x: 35,
                y: 665,
                fontSize: fontSize,
            },
            {
                name: '(ให้สามารถอ้างอิงหรือสอบยันกันได้ระหว่างลำดับที่ตาม )',
                x: 35,
                y: 658,
                fontSize: fontSize - 2,
            },
            {
                name: '(หนังสือรับรองฯ กับแบบยื่นรายการภาษีหักที่จ่าย)',
                x: 35,
                y: 650,
                fontSize: fontSize - 2,
            },
            {
                name: 'ประเภทเงินได ิ พ้ งประเม ึ นทิ จ่าย',
                x: 150,
                y: 636,
                font: fontBold,
                fontSize: fontSize,
            },
            {
                name: 'วน เด ั ือน',
                x: 300,
                y: 636,
                font: fontBold,
                fontSize: fontSize,
            },
            {
                name: 'หรอปื ภาษ ี ีทจ่ีาย',
                x: 300,
                y: 626,
                font: fontBold,
                fontSize: fontSize,
            },
            {
                name: 'จำนวนเงิน จ่าย',
                x: 370,
                y: 636,
                font: fontBold,
                fontSize: fontSize,
            },
            {
                name: 'ภาษทีห่ีกั ',
                x: 450,
                y: 636,
                font: fontBold,
                fontSize: fontSize,
            },
            {
                name: 'และนำสงไว ่ ้',
                x: 450,
                y: 626,
                font: fontBold,
                fontSize: fontSize,
            },
            {
                name: '1. เงนเด ิ อน ค ื าจ่ าง เบ ้ ยเล้ี ยง โบน ้ี ส ฯลฯ ตามมาตรา ั 40 (1)',
                x: 35,
                y: 613,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 613,
                fontSize: fontSize,
            },
            {
                name: 'bytax',
                x: 297,
                y: 615,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 613,
                fontSize: fontSize,
            },
            {
                name: 'incomeSubjTax',
                x: 370,
                y: 615,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 613,
                fontSize: fontSize,
            },
            {
                name: 'totalPIT',
                x: 450,
                y: 615,
                fontSize: fontSize,
            },
            {
                name: '2. คาธรรมเน ่ ยม ค ี านายหน ่ า ฯลฯ ตามมาตรา ้ 40 (2)',
                x: 35,
                y: 602,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 602,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 602,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 602,
                fontSize: fontSize,
            },
            {
                name: '3. คาแห ่ งล่ ขสิ ทธิ ์ิฯลฯ ตามมาตรา 40 (3)',
                x: 35,
                y: 591,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 591,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 591,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 591,
                fontSize: fontSize,
            },
            {
                name: '4. (ก) ดอกเบี้ย ฯลฯ ตามมาตรา 40 (4) (ก)',
                x: 35,
                y: 581,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 581,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 581,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 581,
                fontSize: fontSize,
            },
            {
                name: '(ข) เงนปิ นผล เง ั นสิ วนแบ ่ งกำไร ฯลฯ ตามมาตรา ่ 40 (4) (ข)',
                x: 44,
                y: 568,
                fontSize: fontSize,
            },
            {
                name: '(1) กรณีผู้ได้รับเงินปันผลได้รับเครดิตภาษี โดยจ่ายจาก',
                x: 53,
                y: 557,
                fontSize: fontSize,
            },
            {
                name: 'กำไรสทธุ ของก ิ จการท ิ ต่ีองเส ้ ยภาษ ี เงี นได ิ น้ ติบิคคลในอ ุ ตราด ั งนั ้',
                x: 53,
                y: 546,
                fontSize: fontSize,
            },
            {
                name: '(1.1) อตราร ั อยละ ้ 30 ของกำไรสทธ',
                x: 60,
                y: 534,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 534,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 534,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 534,
                fontSize: fontSize,
            },
            {
                name: '(1.2) อตราร ั อยละ ้ 25 ของกำไรสทธ',
                x: 60,
                y: 523,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 523,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 523,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 523,
                fontSize: fontSize,
            },
            {
                name: '(1.3) อตราร ั อยละ ้ 20 ของกำไรสทธุ ',
                x: 60,
                y: 512,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 512,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 512,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 512,
                fontSize: fontSize,
            },
            {
                name: '(1.4) อตราอ ั น ๆ ่ื (ระบ)ุ...................... ของกำไรสทธ',
                x: 60,
                y: 501,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 501,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 501,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 501,
                fontSize: fontSize,
            },
            {
                name: '(2) กรณีผู้ได้รับเงินปันผลไม่ได้รับเครดิตภาษี เนื่องจากจ่ายจาก',
                x: 53,
                y: 490,
                fontSize: fontSize,
            },
            {
                name: '(2.1) กำไรสทธุ ของก ิ จการท ิ ได่ี ร้ บยกเว ั นภาษ ้ เงี นได ิ น้ ติบิคคล',
                x: 60,
                y: 478,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 478,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 478,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 478,
                fontSize: fontSize,
            },
            {
                name: '(2.2) เงนปิ นผลหร ั อเง ื นสิ วนแบ ่ งของกำไรท ่ ได่ี ร้ บยกเว ั นไม ้ ต่  ',
                x: 60,
                y: 467,
                fontSize: fontSize,
            },
            {
                name: 'องนำมารวม คำนวณเปนรายได ็ เพ้ อเส ่ื ยภาษ ี เงี นได ิ น้ ติบิคคล',
                x: 60,
                y: 456,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 456,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 456,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 456,
                fontSize: fontSize,
            },
            {
                name: '(2.3) กำไรสทธุ สิวนท ่ ได่ี ห้ กผลขาดท ั นสุ ทธุ ยกมาไม ิ เก่ นิ 5 ป',
                x: 60,
                y: 445,
                fontSize: fontSize,
            },
            {
                name: 'กอนรอบระยะเวลาบ ่ ญช ั ปี ปีจจั บุ น',
                x: 60,
                y: 434,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 434,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 434,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 434,
                fontSize: fontSize,
            },
            {
                name: '2.4 กำไรทร่ีบรั ทางบ ู้ ญช ั โดยว ี ธิสีวนได ่ เส้ ยี (equity method)',
                x: 60,
                y: 423,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 423,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 423,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 423,
                fontSize: fontSize,
            },
            {
                name: '(2.5) อน ๆ ่ื (ระบ).............................',
                x: 60,
                y: 412,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 412,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 412,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 412,
                fontSize: fontSize,
            },
            {
                name: '5. การจายเง ่ นได ิ ท้ ต่ีองห ้ กภาษ ั ีณ ทจ่ีาย ตามคำส ่ งกรมสรรพากรท ่ั',
                x: 35,
                y: 391,
                fontSize: fontSize,
            },
            {
                name: 'ออกตามมาตรา 3 เตรส เชน รางว ่ ล ส ั วนลดหร ่ อประโยชน ื ใด ๆ เน ์ ',
                x: 45,
                y: 380,
                fontSize: fontSize,
            },
            {
                name: 'องจากการส ่ื งเสร ่ มการขาย รางว ิ ล, ในการประกวด การแขงข่ น การช ั    ',
                x: 45,
                y: 369,
                fontSize: fontSize,
            },
            {
                name: 'งโชค ค ิ าแสดงของน ่ กแสดงสาธารณะ ค ั าจ่ าง ทำของ คาโฆษณา ค ่ ่าเช่า   ',
                x: 45,
                y: 358,
                fontSize: fontSize,
            },
            {
                name: 'คาขนส ่ง ค่ ่าบริการ คาเบ่ ยประก ้ี นวั นาศภ ิ ย ฯลฯ',
                x: 45,
                y: 348,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 348,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 348,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 348,
                fontSize: fontSize,
            },
            {
                name: '6. อน ๆ ่ื (ระบ)............................... ',
                x: 35,
                y: 335,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 295,
                y: 335,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 370,
                y: 335,
                fontSize: fontSize,
            },
            {
                name: '..........................',
                x: 450,
                y: 335,
                fontSize: fontSize,
            },
            {
                name: 'รวมเงิน จ่ายและภาษ ่ ทีห่ีกำส ั ง',
                x: 120,
                y: 284,
                fontSize: fontSize,
            },
            {
                name: 'incomeSubjTax',
                x: 370,
                y: 284,
                fontSize: fontSize,
            },
            {
                name: 'totalPIT',
                x: 450,
                y: 284,
                fontSize: fontSize,
            },
            {
                name: 'รวมเงินภาษีที่หักนำส่ง (ตัวอักษร): ..............................................................................................................................',
                x: 35,
                y: 262,
                fontSize: fontSize,
            },
            {
                name: 'เงิน จ่ายเ ่ า้ กบข./กสจ./กองทุนสงเคราะห์ครูโรงเรียนเอกชน.................บาท',
                x: 35,
                y: 230,
                fontSize: fontSize - 1,
            },
            {
                name: '0.0',
                x: 210,
                y: 232,
                fontSize: fontSize,
            },
            {
                name: 'กองทุนประกันสังคม ...................บาท',
                x: 255,
                y: 230,
                fontSize: fontSize,
            },
            {
                name: 'totalSSO',
                x: 325,
                y: 232,
                fontSize: fontSize,
            },
            {
                name: 'กองทุนสำรองเล ุ ยงช ้ี พ ..................บาท',
                x: 380,
                y: 230,
                fontSize: fontSize,
            },
            {
                name: 'totalProvidentFund',
                x: 470,
                y: 232,
                fontSize: fontSize,
            },
            {
                name: 'ผู้จ่ายเงิน : ',
                x: 35,
                y: 186,
                fontSize: fontSize,
            },
            {
                name: 'คำเตอน :ผู้มีหน้าที่ออกหนังสือรับรองการหักภาษีณ ที่จ่าย.',
                x: 35,
                y: 142,
                fontSize: fontSize,
            },
            {
                name: 'ขอรบรองว ั าข่ อความและต ้ วเลขด ั งกล ั าวข ่ างต ้ นถ้ กตู องตรงก ้ บความจร ั งทิ กประการ',
                x: 255,
                y: 142,
                fontSize: fontSize - 1,
            },
            {
                name: 'ฝาฝ่ นไม ื ปฏ่ บิ ตั ตามมาตรา ิ 50 ทวิแหงประมวล',
                x: 35,
                y: 131,
                fontSize: fontSize,
            },
            {
                name: 'ลงชอ...............................................................ผู้ชายเว่ น',
                x: 275,
                y: 131,
                fontSize: fontSize,
            },
            {
                name: 'รษฎากร ต ั องร ้ บโทษทางอาญาตามมาตรา ั 35',
                x: 35,
                y: 120,
                fontSize: fontSize,
            },
            {
                name: '............/................./................',
                x: 275,
                y: 120,
                fontSize: fontSize,
            },
            {
                name: 'รษฎากร ต ั องร ้ บโทษทางอาญาตามมาตรา ั 35.',
                x: 35,
                y: 109,
                fontSize: fontSize,
            },
            {
                name: '(วน เด ั อน ป ื ีทออกหน ่ี งสั อรื บรองฯ ั )',
                x: 275,
                y: 109,
                fontSize: fontSize,
            },
        ];
        const checkboxData = [
            {
                name: 'ฉบบทั ่ี1 (สำหรบผั ถู้กหู กภาษ ั ีณ ทจ่ีาย ใช ่ แนบพร ้ อมก ้ บแบบแสดงรายการภาษ ั )',
                x: 34,
                y: 810,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: 'ฉบบทั ่ี2 (สำหรบผั ถู้กหู กภาษ ั ีณ ทจ่ีาย เก ่ บไว ็ เป้ นหล ็ กฐาน ั )',
                x: 34,
                y: 799,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: '(1) ภ.ง.ด.1ก',
                x: 170,
                y: 665,
                fontSize: fontSize,
                checked: true,
            },
            {
                name: '(2) ภ.ง.ด.1ก พเศษ',
                x: 240,
                y: 665,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: '(3) ภ.ง.ด.2',
                x: 320,
                y: 665,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: '(4) ภ.ง.ด.3',
                x: 390,
                y: 665,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: '(5) ภ.ง.ด.2ก',
                x: 170,
                y: 650,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: '(6) ภ.ง.ด.3ก',
                x: 240,
                y: 650,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: '(7) ภ.ง.ด.53',
                x: 320,
                y: 650,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: '(1) หักณที่จ่าย ',
                x: 80,
                y: 186,
                fontSize: fontSize,
                checked: true,
            },
            {
                name: '(2) ออกให้ตลอดไป',
                x: 180,
                y: 186,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: '(3) ออกให้ครั้งเดียว',
                x: 280,
                y: 186,
                fontSize: fontSize,
                checked: false,
            },
            {
                name: '(4) อื่น ๆ (ระบุ) ......',
                x: 380,
                y: 186,
                fontSize: fontSize,
                checked: false,
            },
        ];
        const borderLines = [
            { start: { x: 34, y: 645 }, end: { x: 520, y: 645 } },
            { start: { x: 34, y: 645 }, end: { x: 34, y: 305 } },
            { start: { x: 34, y: 305 }, end: { x: 520, y: 305 } },
            { start: { x: 520, y: 305 }, end: { x: 520, y: 645 } },
            { start: { x: 34, y: 622 }, end: { x: 520, y: 622 } },
            { start: { x: 295, y: 645 }, end: { x: 295, y: 305 } },
            { start: { x: 365, y: 645 }, end: { x: 365, y: 277 } },
            { start: { x: 445, y: 645 }, end: { x: 445, y: 277 } },
            { start: { x: 34, y: 305 }, end: { x: 34, y: 258 } },
            { start: { x: 34, y: 258 }, end: { x: 520, y: 258 } },
            { start: { x: 520, y: 258 }, end: { x: 520, y: 305 } },
            { start: { x: 34, y: 277 }, end: { x: 520, y: 277 } },
            { start: { x: 34, y: 250 }, end: { x: 520, y: 250 } },
            { start: { x: 34, y: 250 }, end: { x: 34, y: 210 } },
            { start: { x: 520, y: 250 }, end: { x: 520, y: 210 } },
            { start: { x: 34, y: 210 }, end: { x: 520, y: 210 } },
            { start: { x: 34, y: 200 }, end: { x: 520, y: 200 } },
            { start: { x: 34, y: 200 }, end: { x: 34, y: 177 } },
            { start: { x: 520, y: 200 }, end: { x: 520, y: 177 } },
            { start: { x: 34, y: 177 }, end: { x: 520, y: 177 } },
            { start: { x: 34, y: 152 }, end: { x: 220, y: 152 } },
            { start: { x: 245, y: 152 }, end: { x: 520, y: 152 } },
            { start: { x: 34, y: 152 }, end: { x: 34, y: 105 } },
            { start: { x: 34, y: 105 }, end: { x: 220, y: 105 } },
            { start: { x: 220, y: 105 }, end: { x: 220, y: 152 } },
            { start: { x: 245, y: 105 }, end: { x: 520, y: 105 } },
            { start: { x: 245, y: 152 }, end: { x: 245, y: 105 } },
            { start: { x: 520, y: 152 }, end: { x: 520, y: 105 } },
        ];
        return { formFieldPositions, checkboxData, borderLines };
    }
};
exports.TawiTaxCertificateTemplateUtil = TawiTaxCertificateTemplateUtil;
exports.TawiTaxCertificateTemplateUtil = TawiTaxCertificateTemplateUtil = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [aws_1.AwsS3Service])
], TawiTaxCertificateTemplateUtil);
//# sourceMappingURL=tawi-tax-certificate-template.util.js.map
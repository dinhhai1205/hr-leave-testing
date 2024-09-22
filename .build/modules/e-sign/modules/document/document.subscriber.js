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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentSubscriber = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const config_1 = require("../../../../config");
const document_entity_1 = require("../../../../core/database/entities/document.entity");
const enums_1 = require("../../../../core/database/enums");
const utils_1 = require("../../../../core/database/utils");
const constants_1 = require("../../constants");
let DocumentSubscriber = class DocumentSubscriber {
    constructor(dbConfig, dataSource) {
        this.dbConfig = dbConfig;
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return document_entity_1.DocumentEntity;
    }
    async makeRecordNo(event) {
        const companyId = event.entity.companyId;
        let query = ``;
        if (this.dbConfig.type === 'postgres') {
            query = `SELECT ${constants_1.MAKE_E_SIGN_DOCUMENT_NO_FUNC_NAME}(${companyId})`;
        }
        if (this.dbConfig.type === 'mssql') {
            query = `
        DECLARE @newDocumentNumber VARCHAR(255);
        EXEC ${constants_1.MAKE_E_SIGN_DOCUMENT_NO_FUNC_NAME} @compid = ${companyId}, @newNumber = @newDocumentNumber OUTPUT;
        SELECT @newDocumentNumber as ${constants_1.MAKE_E_SIGN_DOCUMENT_NO_FUNC_NAME};
      `;
        }
        try {
            const queryResult = await event.connection.query(query);
            return Number(queryResult[0][constants_1.MAKE_E_SIGN_DOCUMENT_NO_FUNC_NAME]);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async afterInsert(event) {
        try {
            const recordNo = await this.makeRecordNo(event);
            event.entity.recordNo = recordNo;
            await event.manager.save(document_entity_1.DocumentEntity, event.entity);
        }
        catch (error) {
            const postgresMakeRecordNoFuncDoseNotExist = `function ${constants_1.MAKE_E_SIGN_DOCUMENT_NO_FUNC_NAME}(integer) does not exist`;
            const mssqlMakeRecordNoFuncDoseNotExist = `Error: Could not find stored procedure '${constants_1.MAKE_E_SIGN_DOCUMENT_NO_FUNC_NAME}'.`;
            if (error.message === postgresMakeRecordNoFuncDoseNotExist ||
                error.message === mssqlMakeRecordNoFuncDoseNotExist) {
                await event.connection.query((0, utils_1.makeRecordNoQuery)(constants_1.MAKE_E_SIGN_DOCUMENT_NO_FUNC_NAME, enums_1.ETableName.COMPANY_E_SIGN_DOCUMENT_NO));
                event.entity.recordNo = 1;
                await event.manager.save(document_entity_1.DocumentEntity, event.entity);
            }
            else {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
};
exports.DocumentSubscriber = DocumentSubscriber;
exports.DocumentSubscriber = DocumentSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __param(0, (0, config_1.InjectDatabaseConfig)()),
    __metadata("design:paramtypes", [Object, typeorm_1.DataSource])
], DocumentSubscriber);
//# sourceMappingURL=document.subscriber.js.map
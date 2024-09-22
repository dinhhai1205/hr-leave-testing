"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRecordNoQuery = makeRecordNoQuery;
const db_sql_type_enum_1 = require("../enums/db-sql-type.enum");
const database_type_util_1 = require("./database-type.util");
function makeRecordNoQuery(funcName, dbName) {
    const dbType = (0, database_type_util_1.databaseType)();
    switch (dbType) {
        case db_sql_type_enum_1.EDbSqlType.Postgres:
            return `
            CREATE OR REPLACE FUNCTION public.${funcName}(compid bigint)
            RETURNS character varying
            LANGUAGE plpgsql
            AS $function$
            declare
            lastNumber integer;

            begin
            SELECT lastno into lastNumber FROM public.${dbName} WHERE companyid = compid limit 1;

            if lastNumber is null then
                    Insert into public.${dbName} (companyid, lastno, isdeleted) values (compid,1,false);
                    lastNumber := 1;
            else
                    lastNumber :=lastNumber + 1;
                    UPDATE public.${dbName} set lastno = lastNumber where companyid = compid; 
            end if;
            
            return lastNumber;
            end;
            $function$
        `;
        case db_sql_type_enum_1.EDbSqlType.Mssql:
            return `
          CREATE PROCEDURE dbo.${funcName}
              @compid BIGINT,
              @newNumber VARCHAR(255) OUTPUT
          AS
          BEGIN
              SET NOCOUNT ON;
          
              DECLARE @lastNumber INT;
          
              -- Check the last number for the given company ID
              SELECT @lastNumber = lastno
              FROM dbo.${dbName}
              WHERE companyid = @compid;
          
              IF @lastNumber IS NULL
              BEGIN
                  -- If there is no record, insert a new one with the initial number
                  INSERT INTO dbo.${dbName} (companyid, lastno, isdeleted)
                  VALUES (@compid, 1, 0);
                  SET @lastNumber = 1;
              END
              ELSE
              BEGIN
                  -- If a record exists, increment the last number
                  SET @lastNumber = @lastNumber + 1;
                  UPDATE dbo.${dbName}
                  SET lastno = @lastNumber
                  WHERE companyid = @compid;
              END;
          
              -- Set the output parameter
              SET @newNumber = CAST(@lastNumber AS VARCHAR(255));
          END;
        `;
        default:
            throw new Error('Can not determine type of database used');
    }
}
//# sourceMappingURL=make-record-no-query.util.js.map
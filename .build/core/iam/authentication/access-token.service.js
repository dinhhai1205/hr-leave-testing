"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../common/utils");
let AccessTokenService = class AccessTokenService {
    getAdminOrganizationPaths(orgElementListJson) {
        const orgElementList = (0, utils_1.safeJsonParse)({
            text: orgElementListJson,
            defaultValueReturn: [],
        });
        let memoPaths = {};
        for (const { OrgPath } of orgElementList) {
            if (OrgPath === '' || OrgPath === '/') {
                memoPaths = {};
                break;
            }
            const prefix = OrgPath.split('/')[1];
            if (!prefix)
                continue;
            if (!memoPaths[prefix]) {
                memoPaths[prefix] = OrgPath;
                continue;
            }
            if (OrgPath.split('/').length < memoPaths[prefix].split('/').length) {
                memoPaths[prefix] = OrgPath;
            }
        }
        const organizationPaths = Object.keys(memoPaths).map(prefix => {
            return memoPaths[prefix];
        });
        return organizationPaths;
    }
};
exports.AccessTokenService = AccessTokenService;
exports.AccessTokenService = AccessTokenService = __decorate([
    (0, common_1.Injectable)()
], AccessTokenService);
//# sourceMappingURL=access-token.service.js.map
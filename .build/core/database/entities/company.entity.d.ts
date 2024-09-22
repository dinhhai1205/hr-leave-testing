import { AbstractEntity } from './abstract.entity';
import { CompanyParameterEntity } from './company-parameter.entity';
import { PrtrxHdrEntity } from './prtrx-hdr.entity';
export declare class CompanyEntity extends AbstractEntity {
    id: number;
    name: string;
    code: string;
    active: boolean;
    companyParameter: CompanyParameterEntity;
    prtrxHdrs: PrtrxHdrEntity[];
}

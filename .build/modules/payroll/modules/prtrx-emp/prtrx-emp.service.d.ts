import { Repository } from 'typeorm';
import { TypeOrmBaseService } from '../../../../core/database';
import { PrtrxEmpEntity } from '../../../../core/database/entities/prtrx-emp.entity';
export declare class PrtrxEmpService extends TypeOrmBaseService<PrtrxEmpEntity> {
    private readonly prtrxEmpRepository;
    constructor(prtrxEmpRepository: Repository<PrtrxEmpEntity>);
    getEmployeesByPrtrxHdrId(hdrId: number, included?: boolean): Promise<PrtrxEmpEntity[]>;
}

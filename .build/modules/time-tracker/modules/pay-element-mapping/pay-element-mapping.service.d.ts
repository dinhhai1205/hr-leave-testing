import { Repository } from 'typeorm';
import { TypeOrmBaseService } from '../../../../core/database';
import { PayElementMappingEntity } from '../../../../core/database/entities/pay-element-mapping.entity';
export declare class PayElementMappingService extends TypeOrmBaseService<PayElementMappingEntity> {
    private readonly payElementMappingRepository;
    constructor(payElementMappingRepository: Repository<PayElementMappingEntity>);
    getPayElementMappingById(id: number, companyId: number): Promise<PayElementMappingEntity[]>;
    getPayElementMappingByCode(code: string, companyId: number): Promise<PayElementMappingEntity[]>;
    getPayElementMappingIdSysGenByName(name: string, companyId: number): Promise<PayElementMappingEntity | null>;
}

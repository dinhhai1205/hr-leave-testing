import { EOrder } from '../../../../../common/enums';
export declare class GetAssigneesQueryDto {
    readonly page: number;
    readonly take: number;
    readonly q: string;
    readonly ids?: number[];
    readonly order?: EOrder;
}

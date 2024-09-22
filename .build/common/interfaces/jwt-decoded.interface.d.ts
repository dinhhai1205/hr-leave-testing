import type { JwtPayload } from 'jsonwebtoken';
import type { EUserRanking } from '../enums';
export interface IJwtDecoded extends JwtPayload {
    sub: string;
    jti: string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': EUserRanking;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata': string;
    iss: string;
    aud: string;
}

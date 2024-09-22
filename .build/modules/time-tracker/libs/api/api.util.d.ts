import type { ObjectLiteral } from 'typeorm';
export declare const replaceUrlWithParams: (data: {
    method: string;
    url: string;
}, params: ObjectLiteral) => {
    url: string;
    method: string;
};

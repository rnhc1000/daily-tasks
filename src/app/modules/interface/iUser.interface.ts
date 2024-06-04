export interface User {
    email: string;
    exp: number;
    iat: number;
    sub: string;
    token?: string;
}
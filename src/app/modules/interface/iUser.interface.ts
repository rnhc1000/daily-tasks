export interface User {
    email: string;
    username: string;
    exp: number;
    iat: number;
    sub: string;
    token?: string;
}
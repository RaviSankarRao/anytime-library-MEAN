export interface User {
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
    password?: string;
    role?: Role;
    _id?: string;
}

export enum Role {
    admin = 1,
    user = 2,
}

export interface UserLogin {
    authtoken?: string;
}

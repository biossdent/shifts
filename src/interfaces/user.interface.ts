import { ROLE } from "@/enums/role.enum";

export interface IUser {
    email: string,
    role: ROLE,
    name: string,
    lastName: string,
}

export interface INewUser extends IUser {
    password?: string,
}

export interface IUserCreated extends IUser {
    id: number,
    createdAt: string
}
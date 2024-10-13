import { ROLE } from "@/enums/role.enum";

export interface IUser {
    id?: number,
    email: string,
    role: ROLE,
    name: string,
    lastName: string,
}

export interface IUserNew extends IUser {
    password?: string,
}

export interface IUserCreated extends IUser {
    id: number,
    createdAt: string
}
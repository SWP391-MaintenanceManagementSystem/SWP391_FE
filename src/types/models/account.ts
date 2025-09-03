import type { AccountStatus } from "../enums/accountStatus";
import type { Role } from "../enums/role";

export interface Account {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role: Role;
    status: AccountStatus;
    createdAt: string;
    updatedAt: string;
}
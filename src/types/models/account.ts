import type { AccountStatus } from "../enums/accountStatus";
import type { Role } from "../enums/role";

export interface AccountWithProfile {
    id: string;
    email: string;
    avatar?: string;
    role: Role;
    phone?: string;
    address?: string;
    status: AccountStatus;
    profile?: Profile;
    createdAt: string;
    updatedAt: string;
}


export type Customer = {
    firstName: string;
    lastName: string;
    address?: string;
    is_premium: boolean;
}

export type Employee = {
    firstName: string;
    lastName: string;
    specialization?: string;
    experienceYears?: number;
    // TODO: make certificate DTO
    certificate?: string;
}

export type Profile = Customer | Employee;
import type { AccountStatus } from "../enums/accountStatus";
import type { AccountRole } from "../enums/role";

interface WorkCenter {
  id: string;
  name: string;
}
export interface AccountWithProfile {
  id: string;
  email: string;
  avatar?: string;
  role: AccountRole;
  phone?: string;
  status: AccountStatus;
  profile?: Profile;
  workCenter?: WorkCenter;
  createdAt: string;
  updatedAt: string;
}

export type Customer = {
  firstName: string;
  lastName: string;
  address?: string;
  isPremium: boolean;
};

export type Employee = {
  firstName: string;
  lastName: string;
  experienceYears?: number;
  // TODO: make certificate DTO
  certificate?: string;
};

export type Profile = Customer | Employee;

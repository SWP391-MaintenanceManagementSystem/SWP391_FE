import type { AccountStatus } from "@/types/enums/accountStatus";
import type { Employee } from "@/types/models/account";
import type { AccountRole } from "@/types/enums/role";
import type { ServiceCenter } from "@/types/models/center";
export type EmployeeTable = {
  id: string;
  email: string;
  phone: string;
  status: AccountStatus | undefined;
  profile?: Employee;
  role: AccountRole | undefined;
  workCenter?: Partial<ServiceCenter> & {
    startDate?: string;
    endDate?: string;
  };
};

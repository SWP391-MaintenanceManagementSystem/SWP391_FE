import type { AccountStatus } from "@/types/enums/accountStatus";
import type { Customer } from "@/types/models/account";
import type { AccountRole } from "@/types/enums/role";

export type CustomerTable = {
  id: string;
  email: string;
  phone: string;
  status: AccountStatus | undefined;
  profile?: Customer;
  role: AccountRole | undefined;
};

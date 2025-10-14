import type { MembershipStatus } from "../enums/membershipStatus";
import type { PeriodType } from "../enums/periodType";

export type Membership = {
id: string;
name: string;
price: number;
duration: number;
periodType: PeriodType;
status: MembershipStatus;
description?: string;
createdAt: string;
updatedAt: string;
}



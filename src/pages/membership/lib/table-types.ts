import type { MembershipStatus } from "@/types/enums/membershipStatus"


export type MembershipTable = {
  name: string
  price: number
  duration: number
  status: MembershipStatus ;
  description?: string
}




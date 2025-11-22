import type { SubscriptionStatus } from "../enums/subscriptionStatus"
import type { Membership } from "./membership"


export type Subscription = {
  id: string
  customerId: string
  membershipId: string
  status: SubscriptionStatus
  startDate: string
  endDate: string
  membership: Membership 
}

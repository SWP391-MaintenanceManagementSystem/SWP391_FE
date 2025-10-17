
import { useQuery } from "@tanstack/react-query"
import { getPaymentTransaction } from "../apis/payment.api"

export const usePaymentTransaction = (sessionId: string) => {
    return useQuery({
        queryKey: ["paymentTransaction", sessionId],
        queryFn: () => getPaymentTransaction(sessionId),
        enabled: !!sessionId,
    })
}

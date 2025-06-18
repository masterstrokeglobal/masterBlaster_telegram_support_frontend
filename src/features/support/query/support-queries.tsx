import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { transactionAPI } from "./support-API";

export const useGetAllSupportQueries = (filter?: Record<string, any> , options?: {
    refetchInterval?: number | false;
    [key: string]: any; // Allow other React Query options
  }) => {
    return useQuery({
        queryKey: ["support", filter],
        queryFn: () => transactionAPI.getAlltransaction(filter),
        ...options
    });
};

export const useApproveSupportQuery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transactionAPI.approveTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "support";
                },
            });
            toast.success("Support Query approved successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Error approving Support Query");
        },
    });
}

export const useRejectSupportQuery = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transactionAPI.rejectTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "support";
                },
            });
            toast.success("Support Query rejected successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Error rejecting Support Query");
        },
    });
};

export const useGetTransactionDownload = () => {
    return useMutation({
        mutationFn: transactionAPI.getTransactionDownload,
        onSuccess: () => {
            toast.success("Transaction downloaded successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Error downloading transaction");
        },
    });
};


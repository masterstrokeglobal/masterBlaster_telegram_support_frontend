

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { merchantAPI } from "./merchant-api";

export const useGetAllMerchants = (filter: any) => {
    return useQuery({
        queryKey: ["merchants", filter],
        queryFn: () => merchantAPI.getAllMerchants(filter),
    });
};

export const useCreateMerchant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: merchantAPI.createMerchant,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchants";
                },
            });
            toast.success("Merchant created successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error creating merchant");
        },
    });
}

export const useGetMerchantById = (merchantId: string) => {
    return useQuery({
        queryKey: ["merchants", merchantId],
        queryFn: () => merchantAPI.getMerchantById(merchantId),
    });
};

export const useDeleteMerchantById = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: merchantAPI.deleteMerchantById,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchants";
                },
            });
            toast.success("Merchant deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Error deleting merchant");
        },
    });
};

export const usePasswordChange = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: merchantAPI.changePassword,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchants";
                },
            });
            toast.success("Password changed successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error changing password");
        },
    });
};

export const useUploadImage = () => {
    return useMutation({
        mutationFn: merchantAPI.uploadImage,
        onSuccess: () => {
            toast.success("Image uploaded successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error uploading image");
        },
    });
};

export const useGetMerchantDashboardData = (filter: any) => {
    return useQuery({
        queryKey: ["dashboard", "merchant", filter],
        queryFn: () => merchantAPI.getDashboardData(filter),
    });
};

export const useGetBarChartData = (filter: any) => {
    return useQuery({
        queryKey: ["dashboard", "bar-chart", filter],
        queryFn: () => merchantAPI.getBarChartData(filter),
    });
};

export const useUpdateMerchant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: merchantAPI.updateMerchant,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchants";
                },
            });
            toast.success("Merchant updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error updating merchant");
        },
    });
}

export const useUpdateRestrictionsMerchant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: merchantAPI.updateRestrictionsMerchant,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchants";
                },
            });
            toast.success("Merchant restrictions updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error updating merchant restrictions");
        },
    });
};

export const useGetMerchantDocumentByMerchantId = (merchantId: string) => {
    return useQuery({
        queryKey: ["merchant-document", merchantId],
        retry:1,
        queryFn: () => merchantAPI.getMerchantDocumentByMerchantId(merchantId),
    });
};

export const useCreateMerchantDocument = () => {
    const queryClient = useQueryClient();       
    return useMutation({
        mutationFn: merchantAPI.createMerchantDocument,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchant-document";
                },
            });
            toast.success("Merchant document created successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error creating merchant document");
        },
    });
};

export const useUpdateMerchantDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: merchantAPI.updateMerchantDocument,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchant-document";
                },
            });
            toast.success("Merchant document updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error updating merchant document");
        },
    });
};



import api from "@/lib/axios/instance";
import { getContentType } from "@/lib/utils";

export type UpdateTransactionPayload = {
  // Add your transaction update fields here
  status?: string;
  notes?: string;
  id: string;
  // Add other updatable fields
};

export const transactionAPI = {
  createTransaction: async (data: any) => {
    return api.post("/transaction", data);
  },

  getAlltransaction: async (filter?: Record<string, any>) => {
    return api.get("/support", { params: filter });
  },

  getTransactionDownload: async (filter?: any) => {
    return api.get("/transaction/download", {
      params: filter,
      responseType: "arraybuffer",
      headers: {
        "Content-Type": getContentType(filter.format),
      },
    });
  },

  getTransactionById: async (id: string) => {
    return api.get(`/transaction/${id}`);
  },

  updateTransactionById: async (data: UpdateTransactionPayload) => {
    return api.patch(`/transaction/${data.id}`, data);
  },

  deleteTransactionById: async (id: string) => {
    return api.delete(`/transaction/${id}`);
  },
  confirmWithdrawal: async (id: string) => {
    return api.post(`/transaction/${id}/confirm-withdrawal`);
  },

  // Add other transaction API methods
  // ✅ transactionAPI.ts
  approveTransaction: async ({
    id,
    message,
    image,
  }: {
    id: string;
    message: string;
    image?: File;
  }) => {
    const formData = new FormData();
    formData.append("message", message);
    if (image) {
      formData.append("image", image);
    }

    return api.patch(`/support/approve/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // ✅ transactionAPI.ts

  rejectTransaction: async ({
    id,
    message,
    image,
  }: {
    id: string;
    message: string;
    image?: File;
  }) => {
    const formData = new FormData();
    formData.append("message", message);
    if (image) {
      formData.append("image", image);
    }

    return api.patch(`/support/reject/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

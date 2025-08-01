import api from "@/lib/axios/instance";

export const userAPI = {
    getAllUsers: async (filter: any) => {
        return api.get("/merchant", {
            params: filter
        });
    },
    logout: async () => {
        return api.post("/auth/logout");
    },
    dashboardStats: async () => {
        return api.get("/dashboard")
    },

    getUserById: async (userId: string) => {
        return api.get(`/user/${userId}`);
    },

    changePassword: async (data: any) => {
        return api.put("/user/change-password", data);
    },

    deleteUserById: async (userId: string) => {
        return api.delete(`/user/${userId}`);
    },


};

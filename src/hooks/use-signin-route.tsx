import { useGetCurrentUser } from "@/features/authentication/query/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useCheckAuth = () => {
    const { data: user, isLoading } = useGetCurrentUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/dashboard/support");
        }

        if (!isLoading && !user) {
            router.push("/auth/login");
        }

    }, [router, user, isLoading]);


    return { user, isLoading };
}

export default useCheckAuth;
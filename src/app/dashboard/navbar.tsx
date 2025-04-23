import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/context/auth-context";
import { useDashboardStats, useLogout } from "@/features/user/data/user-queries";
import { cn } from "@/lib/utils";
import { ArrowLeft, CircleUser, Menu, Wallet2 } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { data, isLoading } = useDashboardStats();
    const { userDetails } = useAuthStore();
    const { mutate } = useLogout();
    const router = useRouter();


    const isMerchant = userDetails?.isMerchant;

    return <header className="flex h-16 items-center gap-4 sticky top-0  px-4 lg:h-16 z-20 lg:px-6">
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <Sidebar />
            </SheetContent>
        </Sheet>
        <Button variant="outline-primary" onClick={() => router.back()}
            className="rounded-full bg-gray-400/10 hover:bg-gray-400/10">
            <ArrowLeft className="h-5 w-5" />
            Back
        </Button>

        {isMerchant && <Button variant="outline-primary" className="ml-auto">
            <Wallet2 className="h-5 w-5" />
            <span className="mr-2">
                Wallet
            </span>
            {isLoading ? 'Loading...' : data ? `₹ ${data.data?.user?.wallet?.amount}` : '₹ 0'}
        </Button>}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" className={cn('ml-2 rounded-full bg-gray-400/10 hover:bg-gray-400/10 text-primary', isMerchant ? 'ml-2' : 'ml-auto')}>
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                {isMerchant && <Link href="/dashboard/merchant-stats">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        mutate();
                    }}
                >Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </header>;
}

export default Navbar;
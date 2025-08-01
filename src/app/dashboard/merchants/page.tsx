"use client";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table-server";
import { Input } from "@/components/ui/input";
import userColumns from "@/features/user/components/user-columns";
import { useGetAllUsers } from "@/features/user/data/user-queries";
import Merchant from "@/models/merchant";
import User from "@/models/user"; // Import the User model
import { Search } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";

const UserTable = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const { data, isSuccess, isFetching } = useGetAllUsers({
        page: page,
        search: search,
    });

    const users = useMemo(() => {
        if (isSuccess && data?.data?.merchants) {
            return Array.from(data.data.merchants).map((user: any) => new Merchant(user));
        }
        return [];
    }, [data, isSuccess]);

    const totalPages = useMemo(() => {
        return Math.ceil(data?.data?.count / 10) || 1;
    }, [data, isSuccess]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1); // Reset to first page on search
    };

    const changePage = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <section className="container-main min-h-[60vh] my-12">
            <header className="flex flex-col md:flex-row gap-4 flex-wrap md:items-center justify-between">
                <h2 className="text-xl font-semibold text-primary">Merchants</h2>
                <div className="flex gap-5 flex-wrap">
                    <div className="relative min-w-60 flex-1">
                        <Search size={18} className="text-primary absolute top-2.5 left-2.5" />
                        <Input
                            placeholder="Search"
                            onChange={handleSearch}
                            className="pl-10 bg-background"
                        />
                    </div>
                    <Link href="/dashboard/merchants/create">
                        <Button className="bg-background">
                            Create Merchant
                        </Button>
                    </Link>
                </div>
            </header>
            <main className="mt-4">
                <DataTable
                    page={page}
                    loading={isFetching}
                    columns={userColumns}
                    data={users}
                    totalPage={totalPages}
                    changePage={changePage}
                />
            </main>
        </section>
    );
};

export default UserTable;

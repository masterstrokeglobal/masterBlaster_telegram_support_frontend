"use client";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table-server";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/context/auth-context";
import { AdminRole } from "@/models/admin";
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/models/transaction";
import { Download, Search } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import supportColumns from "../user/components/support-columns";
import {
  useGetAllSupportQueries,
  useGetTransactionDownload,
} from "./query/support-queries";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getExtension } from "@/lib/utils";
import { Howl } from "howler";
import { SupportQuery } from "@/models/support";
type Props = {
  userId?: string;
};

const SupportTable = ({ userId }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [type, setType] = useState<string | "">("");
  const [status, setStatus] = useState<string | "">("");
  const { userDetails } = useAuthStore();

  const merchanntId =
    userDetails?.role === AdminRole.Merchant ? userDetails?.id : userId;

  // Fetch all transactions with pagination, search query, and filters
  const { data, isSuccess, isFetching } = useGetAllSupportQueries(
    {
      page: page,
      search: search,
      type: type === "all" ? "" : type,
      merchantId: merchanntId,
      status: status === "all" ? "" : status,
    },
    // {
    //   refetchInterval: 3000,
    // }
  );

  const prevDataRef = useRef<Transaction[] | null>(null);

  const notificationSound = new Howl({
    src: ["/mp3/deposit.mp3"],
  });

  const notificationSpeechSound = new Howl({
    src: ["/mp3/deposit_speech.mp3"],
  });

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
        } else {
          console.warn("Notification permission denied");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data?.data?.transactions) {
      const currentTransactions = data.data.transactions;
      console.log(prevDataRef.current, currentTransactions);
      // Check if prevDataRef has data and compare with current transactions
      if (
        prevDataRef.current &&
        currentTransactions.length > 0 &&
        prevDataRef.current.length > 0 &&
        currentTransactions[0].id !== prevDataRef.current[0].id
      ) {
        const newTransactionCount =
          currentTransactions[0].id - prevDataRef.current[0].id;

        // Show browser notification
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("New Transactions", {
            body: `${newTransactionCount} new transaction${
              newTransactionCount > 1 ? "s" : ""
            } received!`,
            icon: "/path/to/icon.png", // Optional: Path to an icon
          });
        }

        // Play sound notification
        notificationSound.play();
        notificationSound.on("end", () => {
          notificationSpeechSound.play();
        });
      }

      // Update prevDataRef with current transactions
      prevDataRef.current = currentTransactions;
    }
  }, [data, isSuccess]);

  const { mutateAsync: downloadData, isPending } = useGetTransactionDownload();

  const handleClickDownload = async (format: "excel" | "pdf" | "csv") => {
    const response = await downloadData({
      page: page,
      search: search,
      format: format,
      type: type === "all" ? "" : type,
      merchantId: merchanntId,
      status: status === "all" ? "" : status,
    });
    if (response.status === 200) {
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      a.download = `transactions.${getExtension(format)}`;
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
      }, 1000);
    }
  };

  const supportQueries = useMemo(() => {
    if (isSuccess && data?.data?.supportQueries) {
      return Array.from(data.data.supportQueries).map(
        (supportQuery: any) => new SupportQuery(supportQuery)
      );
    }
    return [];
  }, [data, isSuccess]);

  // Calculate total pages based on data count
  const totalPages = useMemo(() => {
    return Math.ceil(data?.data?.total / 10) || 1;
  }, [data, isSuccess]);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  // Change page when pagination controls are used
  const changePage = (newPage: number) => {
    prevDataRef.current = null;
    setPage(newPage);
  };

  return (
    <section className="container-main min-h-[60vh] my-12">
      <header className="flex flex-col md:flex-row gap-4 flex-wrap md:items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Support Queries</h2>
        <div className="flex gap-5 ">
          <div className="relative min-w-60 flex-1">
            <Search
              size={18}
              className="absolute top-2.5 left-2.5 text-primary"
            />
            <Input
              placeholder="Search"
              onChange={handleSearch}
              className="pl-10 bg-background"
            />
          </div>
          {/* ShadCN Select for Type Filter */}
          {/* <Select
            value={type}
            onValueChange={(val) => {
              setType(val as TransactionType);
              setPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value={TransactionType.DEPOSIT}>Deposit</SelectItem>
                <SelectItem value={TransactionType.WITHDRAWAL}>
                  Withdrawal
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}

          {/* ShadCN Select for Status Filter */}
          <Select
            value={status}
            onValueChange={(val) => {
              setStatus(val as TransactionStatus);
              setPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value={TransactionStatus.PENDING}>
                  Pending
                </SelectItem>
                <SelectItem value={TransactionStatus.COMPLETED}>
                  Completed
                </SelectItem>
                <SelectItem value={TransactionStatus.FAILED}>Failed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2" asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-primary"
              >
                <Download size={18} /> Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleClickDownload("excel")}
                disabled={isPending}
              >
                Excel
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleClickDownload("pdf")}
                disabled={isPending}
              >
                PDF
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleClickDownload("csv")}
                disabled={isPending}
              >
                CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="mt-4">
        <DataTable
          page={page}
          //   loading={isFetching}
          columns={supportColumns}
          data={supportQueries}
          totalPage={totalPages}
          changePage={changePage}
        />
      </main>
    </section>
  );
};

export default SupportTable;

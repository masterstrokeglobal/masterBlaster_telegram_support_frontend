import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/models/transaction";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAuthStore } from "@/context/auth-context";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormProvider from "@/components/form/form-provider";
import FormGroupSelect from "@/components/form/form-select";
import { useEffect, useRef, useState } from "react";
import { SupportQuery, SupportStatus } from "@/models/support";
import {
  useApproveSupportQuery,
  useRejectSupportQuery,
} from "@/features/support/query/support-queries";

const supportColumns: ColumnDef<SupportQuery>[] = [
  {
    header: "Id",
    accessorKey: "id",
    cell: ({ row }) => <div className="font-medium">{row.original.id}</div>,
  },
  // {
  //   header: "Type",
  //   accessorKey: "type",
  //   cell: ({ row }) => {
  //     const type = row.original.type;
  //     const colorClass =
  //       type === TransactionType.DEPOSIT ? "text-green-600" : "text-red-600";
  //     return (
  //       <Badge
  //         variant={type === TransactionType.DEPOSIT ? "success" : "destructive"}
  //       >
  //         {type}
  //       </Badge>
  //     );
  //   },
  // },
  {
    header: "Account Info",
    accessorKey: "accountInfo",
    cell: ({ row }) => {
      // Convert accountInfo to string to handle string | number
      const accountInfo = String(row.original.accountInfo || "");

      // Parse accountInfo by splitting on newlines and trimming whitespace
      const infoParts = accountInfo
        .split("\n")
        .map((line) => line.trim()) // Remove leading/trailing whitespace
        .filter((line) => line) // Remove empty lines
        .map((line) => {
          const [key, ...valueParts] = line.split(": ");
          return {
            key: key.replace(":", "").trim(),
            value: valueParts.join(": ").trim() || "N/A",
          };
        });

      // State to toggle tooltip visibility
      const [isTooltipVisible, setIsTooltipVisible] = useState(false);
      // Ref to track the icon element
      const iconRef = useRef<SVGSVGElement>(null);

      // Toggle tooltip on icon click
      const handleIconClick = () => {
        setIsTooltipVisible((prev) => !prev);
      };

      // Close tooltip on click outside
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            iconRef.current &&
            !iconRef.current.contains(event.target as Node)
          ) {
            setIsTooltipVisible(false);
          }
        };

        // Add event listener for clicks on the document
        document.addEventListener("click", handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);

      return (
        <div className="relative flex items-center">
          {/* Icon with click handler and ref */}
          <span className="inline-block">
            <svg
              ref={iconRef}
              className="w-5 h-5 text-[#6B7280] cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleIconClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {/* Tooltip shown based on state */}
            {isTooltipVisible && (
              <div className="absolute bg-gray-800 text-white text-sm rounded py-2 px-3 z-10 -top-2 left-8 min-w-max pointer-events-none">
                {infoParts.length > 0 ? (
                  <div className="grid gap-1">
                    {infoParts.map((item, index) => (
                      <div key={index} className="flex">
                        <span className="font-semibold mr-2">{item.key}:</span>
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span>No account info available</span>
                )}
              </div>
            )}
          </span>
        </div>
      );
    },
  },
  //   {
  //     header: "UTR",
  //     accessorKey: "pgId",
  //     cell: ({ row }) => (
  //       <div className="text-[#6B7280]">{row.original.pgId}</div>
  //     ),
  //   },
  {
    header: "Image Raised",
    accessorKey: "image",
    cell: ({ row }) => {
      const buffer = row.original.image?.data;
      if (!buffer || !buffer.length) {
        return <span className="text-gray-400">No Image Sent</span>;
      }

      // Convert the buffer (Uint8Array or array of numbers) to a Blob and Object URL
      const byteArray = new Uint8Array(buffer);
      const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type if needed
      const url = URL.createObjectURL(blob);

      return (
        <a
          href={url}
          download={`image-${row.original.id || "image"}.jpg`}
          className="text-blue-600 underline"
        >
          Download Image
        </a>
      );
    },
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="text-[#6B7280]">{row.original.payerName}</div>
    ),
  },
  {
    header: "Account Id",
    accessorKey: "accountId",
    cell: ({ row }) => (
      <div className="text-[#6B7280]">{row.original.accountId}</div>
    ),
  },
  {
    header: "Message",
    accessorKey: "comment",
    cell: ({ row }) => (
      <div className="text-[#6B7280]">
        {(row.original.comment ?? "")
          .split("\n")
          .map((line: string, idx: number) => (
            <div key={idx} dangerouslySetInnerHTML={{ __html: line }} />
          ))}
      </div>
    ),
  },
    {
    header: "Chat History",
    accessorKey: "chat",
    cell: ({ row }) => (
      <div className="text-[#6B7280] min-w-[150px]">
        {(row.original.chat ?? "")
          .split("\n")
          .map((line: string, idx: number) => (
            <div key={idx} dangerouslySetInnerHTML={{ __html: line }} />
          ))}
      </div>
    ),
  },
  // {
  //   header: "AMOUNT",
  //   accessorKey: "amount",
  //   cell: ({ row }) => (
  //     <div className="font-medium">
  //       Rs.
  //       {Number.isInteger(row.original.amount)
  //         ? row.original.amount
  //         : row.original.amount.toFixed(2)}
  //     </div>
  //   ),
  // },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      let variant = "";

      switch (status) {
        case SupportStatus.COMPLETED:
          variant = "success";
          break;
        case SupportStatus.PENDING:
          variant = "warning";
          break;
        case SupportStatus.FAILED:
          variant = "destructive";
          break;
      }

      return <Badge variant={variant as any}>{status}</Badge>;
    },
  },
  {
    header: "Update Status",
    accessorKey: "dropDown",
    cell: ({ row }) => <ActionDropDown transaction={row.original} />,
  },
  // {
  //   header: "Platform Fee %",
  //   accessorKey: "bonusPercentage",
  //   cell: ({ row }) => (
  //     <div className="text-[#6B7280]">
  //       {row.original.platformFeePercentage}%
  //     </div>
  //   ),
  // },
  //   {
  //     header: "Platform Fee",
  //     accessorKey: "bonusAmount",
  //     cell: ({ row }) => (
  //       <div className="text-[#6B7280]">
  //         Rs.{row.original.platformFeeAmount.toFixed(2)}
  //       </div>
  //     ),
  //   },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div className="text-[#6B7280]">
        {new Date(new Date(row.original.createdAt).getTime()).toLocaleString(
          "en-IN",
          {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "medium",
          }
        )}
      </div>
    ),
  },
  {
    header: "",
    accessorKey: "actions",
    cell: ({ row }) => <ActionColumn transaction={row.original} />,
  },
];

export default supportColumns;

const ActionColumn = ({ transaction }: { transaction: SupportQuery }) => {
  const { userDetails } = useAuthStore();

  return (
    <div className="flex justify-end">
      <Link href={`/dashboard/transactions/${transaction.id}`}>
        <Button size="icon" variant="ghost" aria-label="Edit Transaction">
          <Eye className="w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
};
const transactionEditSchema = z.object({
  status: z.nativeEnum(TransactionStatus),
  responseMessage: z.string().min(1, "Response required"),
  image: z.any().optional(), // or use z.instanceof(File).optional()
});

const ActionDropDown = ({ transaction }: { transaction: SupportQuery }) => {
  const id = String(transaction.id);

  // Schema inference (assume you have responseMessage & image in schema)
  type TransactionFormValues = z.infer<typeof transactionEditSchema>;

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionEditSchema),
    defaultValues: {
      status: TransactionStatus.PENDING,
      responseMessage: "",
      image: undefined,
    },
  });

  const { handleSubmit, control, register, watch } = form;

  const { mutate: approve, isPending: isPending } = useApproveSupportQuery();
  const { mutate: reject, isPending: confirmPending } = useRejectSupportQuery();

  const onSubmit = (updatedData: TransactionFormValues) => {
    const image =
      updatedData.image instanceof FileList
        ? updatedData.image[0]
        : updatedData.image;

    const payload = {
      id,
      message: updatedData.responseMessage,
      image: image,
    };

    if (updatedData.status == TransactionStatus.COMPLETED) {
      approve(payload);
    } else if (updatedData.status == TransactionStatus.FAILED) {
      reject(payload);
    }
  };

  return (
    <>
      {transaction?.status === SupportStatus.PENDING && (
        <div>
          <FormProvider onSubmit={handleSubmit(onSubmit)} methods={form}>
            {/* Status Dropdown */}
            <FormGroupSelect
              name="status"
              label=""
              control={control}
              options={Object.values(TransactionStatus).map((status) => ({
                label: status,
                value: status,
              }))}
            />

            {/* Response Message Field */}
            <div>
              <label className="text-sm font-medium">Response Message</label>
              <input
                type="text"
                {...register("responseMessage")}
                className="w-full text-black mt-1 p-2 border rounded"
                placeholder="Enter response message"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="mt-1"
              />
            </div>

            <Button
              variant="outline"
              className="text-primary mt-2"
              type="submit"
              disabled={isPending || confirmPending}
            >
              {isPending || confirmPending ? "Updating..." : "Update Status"}
            </Button>
          </FormProvider>
        </div>
      )}
    </>
  );
};

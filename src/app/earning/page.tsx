"use client";

import { useState } from "react";
import { Search, Info, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useGetTransactionsQuery } from "@/redux/features/transactions/transactionAPI";
import { IWalletTransaction } from "@/types/earning/earning.types";

export default function EanringListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IWalletTransaction | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data } = useGetTransactionsQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
  });

  const transactions = data?.data || [];

  const pagination = data?.meta?.pagination;

  const page = pagination?.page ?? 1;
  const limit = pagination?.limit ?? 10;
  const total = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  const startIndex = total === 0 ? 0 : (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, total);

  const handleActionClick = (user: IWalletTransaction) => {
    setSelectedUser(user);
    setActionModalOpen(true);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };

  function secondsToTime(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
  }
  function secondsToReadable(totalSeconds: number) {
    const { hours, minutes, seconds } = secondsToTime(totalSeconds);

    const parts: string[] = [];

    if (hours) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
    if (minutes) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
    if (seconds || parts.length === 0)
      parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);

    return parts.join(", ");
  }

  return (
    <div className='min-h-screen bg-transparent p-6'>
      <div className='w-full'>
        {/* Header */}
        <div className='mb-6 bg-white flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-2.5 px-4 py-5 rounded-xl'>
          {/* <div className='flex items-center gap-6'>
            {types?.map((type) => {
              const isActive = selectType === type.value;

              return (
                <div key={type.value} className='flex items-center gap-2'>
                  <h3
                    onClick={() => setSelectType(type.value)}
                    className={`
            relative cursor-pointer
            text-xl lg:text-2xl
            transition-all duration-300 ease-out
            ${isActive ? "text-black" : "text-gray-500"}
            hover:text-black
          `}
                  >
                    {type.label}

                    <span
                      className={`
              absolute left-0 -bottom-1 h-[2px] w-full
              bg-black
              transform origin-left
              transition-transform duration-300 ease-out
              ${isActive ? "scale-x-100" : "scale-x-0"}
            `}
                    />
                  </h3>
                </div>
              );
            })}
          </div> */}

          <div className='justify-end relative w-full sm:w-80 bg-[#524a4a] rounded-xl'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <Input
              type='text'
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className='pl-10 text-black'
            />
          </div>
        </div>

        {/* Table Container */}
        <div className='overflow-hidden rounded-lg bg-white shadow px-3 py-6'>
          {/* Desktop Table */}
          <div className='hidden md:block'>
            <table className='w-full'>
              <thead className='bg-table-header-bg'>
                <tr>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    #Serial
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Date
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    User Name
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Driver Name
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Pickup
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Drop
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Amount
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {transactions.map((user: IWalletTransaction, index: number) => (
                  <tr key={user.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {index + 1}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user?.created_at?.split("T")[0]}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user?.data?.user?.name || (
                        <span className='text-gray-600'>N/A</span>
                      )}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user?.data?.driver?.name || (
                        <span className='text-gray-600'>N/A</span>
                      )}
                    </td>

                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user?.data?.pickup_address || (
                        <span className='text-gray-600'>N/A</span>
                      )}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user?.data?.dropoff_address || (
                        <span className='text-gray-600'>N/A</span>
                      )}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user?.data?.total_cost || (
                        <span className='text-gray-600'>N/A</span>
                      )}
                    </td>

                    <td className='px-6 py-4'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='h-8 w-8 p-0'
                        onClick={() => handleActionClick(user)}
                      >
                        <Info className='h-4 w-4 text-gray-400' />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          {/* Mobile Cards */}
          <div className='md:hidden'>
            <div className='bg-[#012B5B] px-4 py-3'>
              <h2 className='text-sm font-medium text-white'>
                Transaction List
              </h2>
            </div>

            <div className='divide-y divide-gray-200'>
              {transactions.map((tx: IWalletTransaction) => {
                const user = tx.data?.user;
                const driver = tx.data?.driver;

                return (
                  <div key={tx.id} className='p-4'>
                    <div className='flex items-start gap-3'>
                      {/* Avatar */}
                      <Avatar className='h-12 w-12'>
                        <AvatarImage
                          src={user?.avatar || "/placeholder.svg"}
                          alt={user?.name || "User"}
                        />
                        <AvatarFallback>
                          {user?.name
                            ? user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "U"}
                        </AvatarFallback>
                      </Avatar>

                      {/* Content */}
                      <div className='flex-1 space-y-2'>
                        <div className='flex items-center justify-between'>
                          <h3 className='font-medium text-gray-900'>
                            {user?.name || "Unknown User"}
                          </h3>
                          <span className='text-xs text-gray-500'>
                            {tx.created_at?.split("T")[0]}
                          </span>
                        </div>

                        <div className='space-y-1 text-sm text-gray-600'>
                          <p>
                            <span className='font-medium'>Driver:</span>{" "}
                            {driver?.name || "N/A"}
                          </p>

                          <p>
                            <span className='font-medium'>Pickup:</span>{" "}
                            {tx.data?.pickup_address || "N/A"}
                          </p>

                          <p>
                            <span className='font-medium'>Drop:</span>{" "}
                            {tx.data?.dropoff_address || "N/A"}
                          </p>

                          <p>
                            <span className='font-medium'>Amount:</span>{" "}
                            {tx.data?.total_cost ?? tx.amount} ৳
                          </p>
                        </div>

                        <div className='flex items-center justify-between pt-2'>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-8 w-8 p-0'
                            onClick={() => handleActionClick(tx)}
                          >
                            <Info className='h-4 w-4 text-gray-400' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <Button
          variant='ghost'
          size='sm'
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        {getPageNumbers().map((p, index) =>
          p === "..." ? (
            <span key={index} className='px-2 text-gray-500'>
              ...
            </span>
          ) : (
            <Button
              key={p}
              variant={page === p ? "default" : "ghost"}
              size='sm'
              onClick={() => setCurrentPage(p as number)}
              className={
                page === p
                  ? "bg-[#012B5B] text-white hover:bg-[#023b7c]"
                  : "hover:bg-gray-100"
              }
            >
              {p}
            </Button>
          ),
        )}

        <Button
          variant='ghost'
          size='sm'
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          <ChevronRight className='h-4 w-4' />
        </Button>

        {/* Results info */}
        <div className='mt-4 text-center text-sm text-gray-600'>
          Showing {startIndex} to {endIndex} of {total} results
        </div>

        <Dialog open={actionModalOpen} onOpenChange={setActionModalOpen}>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
              <DialogTitle className='text-lg font-semibold text-black'>
                Action
              </DialogTitle>
              <Button
                variant='ghost'
                size='sm'
                className='h-6 w-6 p-0'
                onClick={() => setActionModalOpen(false)}
              >
                <X className='h-4 w-4' />
              </Button>
            </DialogHeader>
            {selectedUser && (
              <div className='space-y-4'>
                <div className='flex flex-col gap-5 text-sm'>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      User Id:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser.id}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      User Name:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser?.data?.user?.name || (
                        <span className='text-gray-600'>N/A</span>
                      )}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      User Email:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser?.data?.user?.email || (
                        <span className='text-gray-600'>N/A</span>
                      )}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      Driver Name:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser?.data?.driver?.name || (
                        <span className='text-gray-600'>N/A</span>
                      )}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      Driver Email:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser?.data?.driver?.email || (
                        <span className='text-gray-600'>N/A</span>
                      )}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      Total Cost:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser?.data?.total_cost || (
                        <span className='text-gray-600'>N/A</span>
                      )}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      status:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser?.data?.status || (
                        <span className='text-gray-600'>N/A</span>
                      )}
                    </p>
                  </div>
                  <div className='flex items-center justify-between pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      Time:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {secondsToReadable(Number(selectedUser?.data?.time)) ? (
                        secondsToReadable(Number(selectedUser?.data?.time))
                      ) : (
                        <span className='text-gray-600'>N/A</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

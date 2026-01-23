/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  Eye,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  useAcceptUserMutation,
  useDeleteUserMutation,
  useGetUserByRoleQuery,
  usePendingUsersQuery,
  useRejectUserMutation,
} from "@/redux/features/user/userAPI";
import { IUSER } from "@/types";
import { toast } from "sonner";
import {
  MobileCardSkeleton,
  TableSkeleton,
} from "@/components/user/TableSkleton";
import Link from "next/link";

export default function UserListPage() {
  const [searchInput, setSearchInput] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const [actionAcceptOpen, setActionAcceptOpen] = useState(false);
  const [actionRejectOpen, setActionRejectOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUSER | null>(null);
  const [selectRole, setSelectRole] = useState<string>("user");
  const [selectSubRole, setSelectSubRole] = useState<string>("USER");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const [acceptUserMutation, { isLoading: isAccepting }] =
    useAcceptUserMutation();
  const [rejectUserMutation, { isLoading: isRejecting }] =
    useRejectUserMutation();

  const { data, isFetching, refetch } = useGetUserByRoleQuery(
    {
      role: selectRole.toUpperCase(),
      page: currentPage,
      limit,
      search: debounceSearch,
    },
    { skip: selectRole === "pending-request" },
  );
  const { data: pendingUsersData, refetch: pendingUsersRefetch } =
    usePendingUsersQuery(
      {
        role: selectSubRole,
        page: currentPage,
        limit,
        search: debounceSearch,
      },
      { skip: selectRole !== "pending-request" },
    );

  const [deleteUserMutation, { isLoading: isDeleting }] =
    useDeleteUserMutation();

  const pendingUsers = pendingUsersData?.data;
  const users = data?.data;

  const pagination = data?.meta?.pagination;

  const totalPages = pagination?.totalPages ?? 1;
  const totalResults = pagination?.total ?? 0;

  // current lists
  const currentList = selectRole === "pending-request" ? pendingUsers : users;

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(searchInput.trim());
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setCurrentPage(1);
    setSearchInput("");
  }, [selectRole]);

  const handleActionClick = (user: IUSER) => {
    setSelectedUser(user);
    setActionModalOpen(true);
  };

  const handleUserDelete = async () => {
    const userId = selectedUser?.id ?? "";
    try {
      const res = await deleteUserMutation({ userId }).unwrap();

      if (res?.success) {
        toast.success("User deleted successfully!");
        refetch();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleteModalOpen(false);
      setActionModalOpen(false);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages;
  };

  const roles = [
    { value: "user", label: "Users" },
    { value: "driver", label: "Driver" },
    { value: "pending-request", label: "Pending Request" },
  ];

  const getErrorMessage = (error: any) => {
    return error?.data?.message || error?.error || error?.message;
  };

  const handleAcceptConfirmation = async () => {
    if (!selectedUser?.id) return;

    try {
      await acceptUserMutation({
        userId: selectedUser.id,
        action: "approve",
      }).unwrap();

      toast.success("User accepted successfully!");
      console.log("User accepted successfully log!");
      setActionAcceptOpen(false);
      pendingUsersRefetch();
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      console.error("Error accepting user:", error);
    }
  };

  const handleRejectConfirmation = async () => {
    if (!selectedUser?.id) return;

    try {
      await rejectUserMutation({
        userId: selectedUser.id,
        action: "reject",
      }).unwrap();

      toast.success("User rejected successfully!");
      setActionRejectOpen(false);
      pendingUsersRefetch();
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      console.error("Error rejecting user:", error);
    }
  };

  return (
    <div className='min-h-screen bg-transparent p-6'>
      <div className='w-full'>
        {/* Header */}
        <div className='mb-6 bg-white flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-2.5 px-4 py-5 rounded-xl'>
          <div className='flex items-center gap-6'>
            {roles?.map((role) => {
              const isActive = selectRole === role.value;

              return (
                <div key={role.value} className='flex items-center gap-2'>
                  <h3
                    onClick={() => setSelectRole(role.value)}
                    className={`
            relative cursor-pointer
            text-base lg:text-2xl
            transition-all duration-300 ease-out
            ${isActive ? "text-black" : "text-gray-500"}
            hover:text-black
          `}
                  >
                    {role.label}

                    {/* Animated underline */}
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

            {selectRole === "pending-request" ? (
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => setSelectSubRole("USER")}
                  className={`text-black border ${
                    selectSubRole === "USER"
                      ? "bg-green-700 text-white border-green-700"
                      : "border-gray-700"
                  } px-2 py-1 rounded-full cursor-pointer`}
                >
                  User
                </button>
                <button
                  onClick={() => setSelectSubRole("DRIVER")}
                  className={`text-black border ${
                    selectSubRole === "DRIVER"
                      ? "bg-green-700 text-white border-green-700"
                      : "border-gray-700"
                  } px-2 py-1 rounded-full cursor-pointer`}
                >
                  Driver
                </button>
              </div>
            ) : null}
          </div>

          <div className='relative w-full sm:w-80 bg-[#524a4a] rounded-xl'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <Input
              type='text'
              placeholder='Search'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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
                    Profile
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Name
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Email
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Is Verified
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Contact Number
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Role
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Joined
                  </th>
                  <th className='px-6 py-4 text-center text-sm font-medium text-table-header-color'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {isFetching ? (
                  <TableSkeleton rows={10} />
                ) : currentList?.length ? (
                  currentList?.map((user: IUSER) => (
                    <tr key={user.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4'>
                        <Avatar className='h-10 w-10'>
                          <AvatarImage
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.avatar}`}
                            alt={user.name}
                            width={40}
                            height={40}
                          />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </td>
                      <td className='px-6 py-4 text-base text-table-color font-medium'>
                        {user.name}
                      </td>
                      <td className='px-6 py-4 text-base text-table-color font-medium'>
                        {user.email}
                      </td>
                      <td className='px-6 py-4 text-base text-table-color font-medium'>
                        {user.is_verified ? "✅ Verified" : "❌ Not Verified"}
                      </td>
                      <td className='px-6 py-4 text-base text-table-color font-medium'>
                        {user.phone || "N/A"}
                      </td>
                      <td className='px-6 py-4 text-base text-table-color font-medium'>
                        {user.is_active ? "🟢 Active" : "🔴 Inactive"}
                      </td>
                      <td className='px-6 py-4 text-base text-table-color font-medium'>
                        {user.role}
                      </td>
                      <td className='px-6 py-4 text-base text-table-color font-medium'>
                        {user.created_at.split("T")[0]}
                      </td>
                      <td className='px-6 py-4'>
                        {selectRole === "pending-request" ? (
                          <div className='flex items-center justify-center gap-2'>
                            <Button
                              variant='ghost'
                              size='sm'
                              className='h-8 w-8 p-0'
                              onClick={() => {
                                setActionAcceptOpen(true);
                                setSelectedUser(user);
                              }}
                              title='Accept request'
                            >
                              ✅
                            </Button>
                            <Button
                              variant='ghost'
                              size='sm'
                              className='h-8 w-8 p-0'
                              onClick={() => {
                                setActionRejectOpen(true);
                                setSelectedUser(user);
                              }}
                              title='Reject request'
                            >
                              ❌
                            </Button>
                          </div>
                        ) : (
                          <div className='flex items-center justify-center gap-2'>
                            <Link
                              href={`/users/${user.id}`}
                              className='inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100'
                            >
                              <Eye className='h-4 w-4 text-gray-400' />
                            </Link>

                            <Button
                              variant='ghost'
                              size='sm'
                              className='h-8 w-8 p-0'
                              onClick={() => handleActionClick(user)}
                            >
                              <Trash className='h-4 w-4 text-gray-400' />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className='text-center py-4'>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className='md:hidden'>
            <div className='bg-[#012B5B] px-4 py-3 rounded-t-lg'>
              <h2 className='text-sm font-medium text-white'>User List</h2>
            </div>

            <div className='divide-y divide-gray-200'>
              {isFetching ? (
                <MobileCardSkeleton />
              ) : currentList?.length ? (
                currentList?.map((user: IUSER) => (
                  <div key={user.id} className='p-4'>
                    <div className='flex gap-4'>
                      {/* Avatar */}
                      <Avatar className='h-12 w-12 shrink-0'>
                        <AvatarImage
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.avatar}`}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      {/* Info */}
                      <div className='flex-1'>
                        <div className='flex items-center justify-between'>
                          <h3 className='text-base font-semibold text-gray-900'>
                            {user.name}
                          </h3>

                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8'
                            onClick={() => handleActionClick(user)}
                          >
                            <Info className='h-4 w-4 text-gray-500' />
                          </Button>
                        </div>

                        <p className='text-sm text-gray-600 break-all'>
                          {user.email}
                        </p>

                        <p className='text-sm text-gray-600'>
                          {user.phone || "N/A"}
                        </p>

                        {/* Meta */}
                        <div className='mt-2 flex flex-wrap items-center gap-2'>
                          <span className='rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700'>
                            {user.role}
                          </span>

                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              user.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.is_active ? "Active" : "Inactive"}
                          </span>

                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              user.is_verified
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {user.is_verified ? "Verified" : "Unverified"}
                          </span>
                        </div>

                        <p className='mt-2 text-xs text-gray-400'>
                          Joined: {user.created_at?.split("T")[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className='p-6 text-center text-gray-500'>No users found</p>
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className='mt-6 flex items-center justify-center gap-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className='h-8 w-8 p-0'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>

          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className='px-2 text-gray-500'>...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "ghost"}
                  size='sm'
                  onClick={() => setCurrentPage(page as number)}
                  className={`h-8 w-8 p-0 ${
                    currentPage === page
                      ? "bg-[#012B5B] text-white hover:bg-[#023b7c]"
                      : "hover: bg-gray-100"
                  }`}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}

          <Button
            variant='ghost'
            size='sm'
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className='h-8 w-8 p-0'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>

        {/* Results info */}
        <div className='mt-4 text-center text-sm text-gray-600'>
          Page {currentPage} of {totalPages} • Total {totalResults} users
        </div>

        {/* detail modal */}
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
                      {selectedUser.name}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      Email Address:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser.email}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      Contact Number:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser.phone || "N/A"}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      Is stripe connected:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser.is_stripe_connected ? "✅ Yes" : "❌ No"}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      Vehicle Type:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser.vehicle_type || "N/A"}
                    </p>
                  </div>
                </div>

                <div className='space-y-4 pt-4'>
                  <div className='flex items-center justify-between'>
                    <Label
                      htmlFor='delete-account'
                      className='text-[#333338] text-xl font-medium'
                    >
                      Delete User Account
                    </Label>
                    <Button
                      onClick={() => setDeleteModalOpen(true)}
                      className='bg-red-500'
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirm Modal */}
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className='sm:max-w-[400px]'>
            <DialogHeader>
              <DialogTitle className='text-red-600'>
                Delete Confirmation
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to <b>delete this item</b>? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>

              <Button variant='destructive' onClick={() => handleUserDelete()}>
                Yes, Delete{" "}
                {isDeleting ? <Loader2 className='animate-spin' /> : ""}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Accept Confirm Modal */}
        <Dialog open={actionAcceptOpen} onOpenChange={setActionAcceptOpen}>
          <DialogContent className='sm:max-w-[400px]'>
            <DialogHeader>
              <DialogTitle className='text-2xl text-[#345983]'>
                Confirm Acceptance
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to <b>accept this item</b>? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline' className='border! border-gray-500!'>
                  Cancel
                </Button>
              </DialogClose>

              <Button
                onClick={handleAcceptConfirmation}
                className='bg-green-500!'
                disabled={isAccepting}
              >
                Yes, Accept
                {isAccepting && (
                  <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Confirm Modal */}
        <Dialog open={actionRejectOpen} onOpenChange={setActionRejectOpen}>
          <DialogContent className='sm:max-w-[400px]'>
            <DialogHeader>
              <DialogTitle className='text-2xl text-[#345983]'>
                Confirm Rejection
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to <b>reject this item</b>? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline' className='border! border-gray-500!'>
                  Cancel
                </Button>
              </DialogClose>

              <Button
                variant='destructive'
                onClick={handleRejectConfirmation}
                disabled={isRejecting}
              >
                Yes, Reject
                {isRejecting && (
                  <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

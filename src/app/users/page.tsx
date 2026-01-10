"use client";

import { useState } from "react";
import { Search, Info, Eye, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock data matching the design
const mockUsers = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  slNo: "#BI00001",
  name: "Hazel Janis",
  email: "janis202@gmail.com",
  contactNumber: "+626-445-4928",
  status: "Active",
  role: "Driver",
  joined: "4-25-2025",
  profileImage: "/user.jpg",
  country: "Indonesia",
  disableAccess: false,
  deleteAccount: false,
}));

export default function UserListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [answersModalOpen, setAnswersModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<
    (typeof mockUsers)[0] | null
  >(null);
  const [selectRole, setSelectRole] = useState<string>("all-users");
  const itemsPerPage = 10;

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.contactNumber.includes(searchTerm)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleActionClick = (user: (typeof mockUsers)[0]) => {
    setSelectedUser(user);
    setActionModalOpen(true);
  };

  const handleViewAnswerClick = () => {
    setAnswersModalOpen(true);
  };

  const handleToggleChange = (
    field: "disableAccess" | "deleteAccount",
    value: boolean
  ) => {
    if (selectedUser) {
      setSelectedUser({ ...selectedUser, [field]: value });
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
          totalPages
        );
      }
    }

    return pages;
  };

  const roles = [
    { value: "users", label: "Users" },
    { value: "driver", label: "Driver" },
    { value: "pending-request", label: "Pending Request" },
    { value: "all-users", label: "All Users" },
  ];

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
            text-xl lg:text-2xl
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
          </div>

          <div className='relative w-full sm:w-80 bg-[#524a4a] rounded-xl'>
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
                    Profile
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Sl no.
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Name
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Email
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
                  <th className='px-6 py-4 text-left text-sm font-medium text-table-header-color'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {currentUsers.map((user) => (
                  <tr key={user.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4'>
                      <Avatar className='h-10 w-10'>
                        <AvatarImage
                          src={user.profileImage || "/user.jpg"}
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
                      {user.slNo}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.name}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.email}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.status}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.role}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.joined}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.contactNumber}
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
          <div className='md:hidden'>
            <div className='bg-[#012B5B] px-4 py-3'>
              <h2 className='text-sm font-medium text-white'>User List</h2>
            </div>
            <div className='divide-y divide-gray-200'>
              {currentUsers.map((user) => (
                <div key={user.id} className='p-4'>
                  <div className='flex items-start gap-3'>
                    <Avatar className='h-12 w-12'>
                      <AvatarImage
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1 space-y-2'>
                      <div className='flex items-center justify-between'>
                        <h3 className='font-medium text-gray-900'>
                          {user.name}
                        </h3>
                        <span className='text-xs text-gray-500'>
                          {user.slNo}
                        </span>
                      </div>
                      <div className='space-y-1 text-sm text-gray-600'>
                        <p>{user.email}</p>
                        <p>{user.contactNumber}</p>
                      </div>
                      <div className='flex items-center justify-between pt-2'>
                        <Button
                          variant='link'
                          className='p-0 text-blue-600 hover:text-blue-800'
                          onClick={handleViewAnswerClick}
                        >
                          <Eye className='mr-1 h-4 w-4' />
                          View Answer
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0'
                          onClick={() => handleActionClick(user)}
                        >
                          <Info className='h-4 w-4 text-gray-400' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                      : "hover:bg-gray-100"
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
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className='h-8 w-8 p-0'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>

        {/* Results info */}
        <div className='mt-4 text-center text-sm text-gray-600'>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)}{" "}
          of {filteredUsers.length} results
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
                      {selectedUser.slNo}
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
                      {selectedUser.contactNumber}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      Country:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser.country}
                    </p>
                  </div>
                </div>

                <div className='space-y-4 pt-4'>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label
                      htmlFor='disable-access'
                      className='text-[#333338] text-xl font-medium'
                    >
                      Disable User Access
                    </Label>
                    <Switch
                      id='disable-access'
                      checked={selectedUser.disableAccess}
                      onCheckedChange={(checked) =>
                        handleToggleChange("disableAccess", checked)
                      }
                    />
                  </div>
                  <div className='flex items-center justify-between'>
                    <Label
                      htmlFor='delete-account'
                      className='text-[#333338] text-xl font-medium'
                    >
                      Delete User Account
                    </Label>
                    <Button className='bg-red-500'>Delete</Button>
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

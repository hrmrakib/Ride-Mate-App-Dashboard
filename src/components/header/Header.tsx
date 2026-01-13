"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { useGetProfileQuery } from "@/redux/features/setting/settingAPI";
import { IUSER } from "@/types";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<IUSER | null>(null);
  const pathname = usePathname();

  const { data: profile } = useGetProfileQuery({});

  useEffect(() => {
    if (profile) {
      setAdmin(profile);
    }
  }, [profile]);

  if (
    pathname === "/signup" ||
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname === "/verify-password" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-password"
  ) {
    return null;
  }
  return (
    <div className='bg-white border-b border-gray-200 rounded-md mx-6 mt-6'>
      <div className='max-w-8xl mx-auto px-6'>
        <div className='flex items-center justify-between py-6'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              Welcome, {admin?.name}
            </h1>
            <p className='text-gray-600 mt-1'>Have a nice day</p>
          </div>
          <div className='flex items-center gap-4'>
            <Link href={`/notification`} className='relative'>
              <Bell className='h-5 w-5 text-gray-800' />
              <span className='absolute -top-1 -right-1 h-3 w-3 bg-red-700 rounded-full'></span>
            </Link>
            <div className='flex items-center gap-3'>
              <Avatar className='h-10 w-10'>
                <AvatarImage src='/admin.jpeg' alt='Daissy' />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <div className='hidden sm:block'>
                <p className='text-base font-medium text-[#333338]'>
                  {admin?.name}
                </p>
                <p className='text-sm text-[#606060]'>
                  {admin?.is_admin ? "Admin" : admin?.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

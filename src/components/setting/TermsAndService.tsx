"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useGetTermsAndConditionsQuery } from "@/redux/features/setting/settingAPI";

export default function TermsAndConditionPage() {
  const { data: privacyPolicy } = useGetTermsAndConditionsQuery({});

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <div className='flex-1 w-full'>
        <main className='w-full p-4 md:p-6'>
          <div className='max-w-3xl mx-auto'>
            <div className='mb-6 flex items-center justify-between'>
              <Link
                href='/settings'
                className='inline-flex items-center text-primary hover:text-[#012B5B]'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                <span className='text-xl font-semibold'>Terms & Conditions</span>
              </Link>

              <Link
                href='/settings/terms-condition/edit'
                className='inline-flex items-center text-primary hover:text-[#012B5B] border border-[#012B5B] rounded-md px-4 py-1.5'
              >
                <span className='text-xl font-semibold text-black'>Edit</span>
              </Link>
            </div>

            <div>
              {privacyPolicy?.content ? (
                <div
                  className='prose prose-sm max-w-none text-black'
                  dangerouslySetInnerHTML={{
                    __html: privacyPolicy?.content,
                  }}
                />
              ) : (
                <p>Loading content...</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

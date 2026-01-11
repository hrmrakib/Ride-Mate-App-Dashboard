"use client";

import { Skeleton } from "../ui/skeleton";

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className='border-b'>
          <td className='px-6 py-4'>
            <Skeleton className='h-10 w-10 rounded-full' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-32' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-40' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-24' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-28' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-20' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-16' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-24' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-8 w-8 rounded-md' />
          </td>
        </tr>
      ))}
    </>
  );
};

const MobileCardSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className='divide-y'>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className='p-4 flex gap-4'>
          <Skeleton className='h-12 w-12 rounded-full' />

          <div className='flex-1 space-y-2'>
            <Skeleton className='h-4 w-40' />
            <Skeleton className='h-3 w-52' />
            <Skeleton className='h-3 w-32' />

            <div className='flex gap-2 mt-2'>
              <Skeleton className='h-5 w-16 rounded-full' />
              <Skeleton className='h-5 w-16 rounded-full' />
              <Skeleton className='h-5 w-16 rounded-full' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { TableSkeleton, MobileCardSkeleton };

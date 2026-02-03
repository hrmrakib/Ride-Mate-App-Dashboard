/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Users } from "lucide-react";
import EventChart from "@/components/chart/EventChart";
import { useFetchOverviewDataQuery } from "@/redux/features/overview/overviewAPI";

const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: any;
  change?: string;
  isNegative?: boolean;
}) => (
  <Card className='bg-white border-0 shadow-lg'>
    <CardContent className='py-4'>
      <div className='flex items-center gap-4'>
        <div className='p-4 bg-[#345983] rounded-xl'>
          <Icon className='h-6 w-6 text-white' />
        </div>
        <div>
          <p className='text-xl font-medium text-[#333333] mb-1'>{title}</p>
          <p className='text-2xl font-bold text-gray-900'>{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const { data } = useFetchOverviewDataQuery({});

  const overview = data?.graph;

  return (
    <div className='bg-transparent p-6'>
      {/* Main Content */}
      <div className='py-8'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCard
            title='Total Earnings'
            value={data?.totalEarnings}
            icon={BarChart3}
          />
          <StatCard
            title='Total Users'
            value={data?.totalUsers}
            icon={BarChart3}
            isNegative={true}
          />
          <StatCard
            title='New User'
            value={data?.newUsers}
            icon={Users}
            isNegative={true}
          />
          <StatCard
            title='Pending User Requests'
            value={data?.pendingUserRequests}
            icon={Users}
            isNegative={true}
          />
        </div>

        <EventChart bookings={overview} />
      </div>
    </div>
  );
}

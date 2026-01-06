/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Users } from "lucide-react";
import EventChart from "@/components/chart/EventChart";

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
  return (
    <div className='bg-transparent'>
      {/* Main Content */}
      <div className='py-8'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCard title='Total Revenue' value='$235.5' icon={BarChart3} />
          <StatCard
            title="Today's Revenue"
            value='$235.5'
            icon={BarChart3}
            isNegative={true}
          />
          <StatCard title='Total User' value='230' icon={Users} />
          <StatCard
            title="Today's New User"
            value='12'
            icon={Users}
            isNegative={true}
          />
        </div>

        <EventChart />
      </div>
    </div>
  );
}

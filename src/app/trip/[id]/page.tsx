/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";

import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Truck,
  Home,
  Phone,
  Package,
  DollarSign,
  User,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useFetchTripsQuery } from "@/redux/features/trip/tripAPI";
import { TripDetails } from "../trip.type";

interface TripStop {
  title: string;
  location: string;
  icon: React.ReactNode;
  completed: boolean;
}

export default function DeliveryTracking() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [mapZoom, setMapZoom] = useState(100);
  const { id } = useParams();

  const tripStops: TripStop[] = [
    {
      title: "Picked Up",
      location: "Badda",
      icon: <Truck className='w-6 h-6' />,
      completed: true,
    },
    {
      title: "On the Way",
      location: "Gujarghat",
      icon: <MapPin className='w-6 h-6' />,
      completed: true,
    },
    {
      title: "Drop off",
      location: "Mohakhali",
      icon: <Home className='w-6 h-6' />,
      completed: false,
    },
  ];

  const { data, isFetching } = useFetchTripsQuery(id as string);
  const tripData: TripDetails = data;

  const pickupLocation = tripData?.pickup_address;
  const onTheWayLocation = tripData?.location_address;
  const dropoffLocation = tripData?.dropoff_address;

  console.log(data);

  const handleZoomIn = () => setMapZoom((prev) => Math.min(prev + 20, 200));
  const handleZoomOut = () => setMapZoom((prev) => Math.max(prev - 20, 60));

  if (isFetching) {
    return (
      <div className='min-h-[80VH] container mx-auto flex items-center justify-center bg-white'>
        <div className='flex flex-col items-center gap-3'>
          <div className='w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
          <p className='text-slate-600 text-sm'>Loading trip details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-transparent'>
      {/* Header */}
      <div className='container mx-auto bg-white my-6 rounded-lg'>
        <div className='sticky top-0 z-50'>
          <div className='flex items-center gap-4 px-4 sm:px-6 py-4'>
            <button
              onClick={() => router.back()}
              className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
            >
              <ArrowLeft className='w-6 h-6 text-slate-700' />
            </button>
            <h1 className='text-2xl sm:text-3xl font-bold text-slate-900'>
              Sophia
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className='flex flex-col lg:flex-row gap-6 p-4 sm:p-6 max-w-7xl mx-auto min-h-[600px]'>
          {isFetching ? (
            <div className='w-full flex items-center justify-center'>
              <div className='flex flex-col items-center gap-3'>
                <div className='w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
                <p className='text-slate-600 text-sm'>
                  Loading trip details...
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Left Section - Trip Details */}
              <div className='flex-1 space-y-6'>
                {/* Trip Overview */}
                <div className='bg-white rounded-xl p-6 space-y-6'>
                  <div>
                    <h2 className='text-sm font-semibold text-slate-600 mb-4'>
                      Trip Details
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                      <div className='flex items-start gap-3'>
                        <Package className='w-5 h-5 text-blue-600 flex-shrink-0 mt-1' />
                        <div>
                          <p className='text-xs uppercase tracking-wider text-slate-500'>
                            Trip ID
                          </p>
                          <p className='text-lg font-semibold text-slate-900'>
                            {tripData?.slug}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start gap-3'>
                        <Package className='w-5 h-5 text-blue-600 flex-shrink-0 mt-1' />
                        <div>
                          <p className='text-xs uppercase tracking-wider text-slate-500'>
                            Product Description
                          </p>
                          <p className='text-lg font-semibold text-slate-900'>
                            {/* {tripData.product} */}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start gap-3'>
                        <DollarSign className='w-5 h-5 text-green-600 flex-shrink-0 mt-1' />
                        <div>
                          <p className='text-xs uppercase tracking-wider text-slate-500'>
                            Product Amount
                          </p>
                          <p className='text-lg font-semibold text-slate-900'>
                            {tripData?.total_cost}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start gap-3'>
                        <Phone className='w-5 h-5 text-purple-600 flex-shrink-0 mt-1' />
                        <div>
                          <p className='text-xs uppercase tracking-wider text-slate-500'>
                            Driver Email
                          </p>
                          <p className='text-lg font-semibold text-slate-900'>
                            {tripData?.driver?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className='h-px bg-slate-200' />

                  {/* Contact Information */}
                  <div>
                    <h2 className='text-sm font-semibold text-slate-600 mb-4'>
                      Contact Information
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                      <div className='flex items-start gap-3'>
                        <User className='w-5 h-5 text-slate-400 flex-shrink-0 mt-1' />
                        <div>
                          <p className='text-base uppercase tracking-wider text-slate-500'>
                            Customer Name
                          </p>
                          <p className='text-lg font-semibold text-slate-900'>
                            {tripData?.user?.name || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start gap-3'>
                        <User className='w-5 h-5 text-slate-400 flex-shrink-0 mt-1' />
                        <div>
                          <p className='text-base uppercase tracking-wider text-slate-500'>
                            Driver Name
                          </p>
                          <p className='text-lg font-semibold text-slate-900'>
                            {tripData?.driver?.name || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start gap-3'>
                        <Phone className='w-5 h-5 text-slate-400 flex-shrink-0 mt-1' />
                        <div>
                          <p className='text-sm uppercase tracking-wider text-slate-500'>
                            Customer Email
                          </p>
                          <p className='text-lg font-semibold text-slate-900'>
                            {tripData?.user?.email || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trip Progress Timeline */}
                <div className='bg-white rounded-xl p-6'>
                  <h2 className='text-xl sm:text-2xl font-bold text-blue-900 mb-8'>
                    Trip in progress
                  </h2>

                  <div className='space-y-8'>
                    {tripStops.map((stop, index) => (
                      <div key={index} className='flex gap-6'>
                        {/* Timeline Column */}
                        <div className='flex flex-col items-center'>
                          {/* Circle Icon */}
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                              tripData?.completed_at
                                ? "bg-slate-800 text-white"
                                : "bg-slate-200 text-slate-400"
                            }`}
                          >
                            {stop.icon}
                          </div>

                          {/* Connecting Line */}
                          {index < tripStops.length - 1 && (
                            <div className='w-1 h-16 bg-gradient-to-b from-slate-300 to-slate-200 my-2' />
                          )}
                        </div>

                        {/* Content */}
                        <div className='flex-1 pt-2'>
                          <h3 className='text-lg font-bold text-slate-900'>
                            {stop.title}
                          </h3>
                          <p className='text-slate-600'>
                            {stop.title === "Picked Up" &&
                              (pickupLocation || "N/A")}{" "}
                          </p>
                          <p className='text-slate-600'>
                            {stop.title === "On the Way" &&
                              (onTheWayLocation || "N/A")}{" "}
                          </p>
                          <p className='text-slate-600'>
                            {stop.title === "Drop off" &&
                              (dropoffLocation || "N/A")}{" "}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

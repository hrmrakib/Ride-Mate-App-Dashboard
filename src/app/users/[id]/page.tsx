"use client";

import { useState } from "react";
import { MapPin, Phone, FileText, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useGetUserTripDetailsQuery } from "@/redux/features/user/userAPI";
import { useParams, useRouter } from "next/navigation";
import { UserProfile } from "../user.type";
import Link from "next/link";

export interface TripRequest {
  id: string;
  slug: string;
  requested_at: string;
  accepted_at: string | null;
  started_at: string | null;
  arrived_at: string | null;
  payment_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  time: string | null;
  date: string;
  user_id: string;
  driver_id: string | null;
  pickup_type: string;
  pickup_lat: number;
  pickup_lng: number;
  pickup_address: string;
  dropoff_type: string;
  dropoff_lat: number;
  dropoff_lng: number;
  dropoff_address: string;
  location_type: string;
  location_lat: number | null;
  location_lng: number | null;
  location_address: string | null;
  status: string;
  total_cost: number;
  processing_driver_id: string | null;
  processing_at: string | null;
  is_processing: boolean;
}

export default function ProfilePage() {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const params = useParams();

  const { data, isLoading } = useGetUserTripDetailsQuery({
    userId: params.id as string,
  });

  const currentUser: UserProfile = data?.meta?.currentUser;
  const tripHistory = data?.data;

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin' />
          <p className='text-gray-600 text-sm'>Loading profile...</p>
        </div>
      </div>
    );
  }

  const getImageSrc = (path?: string) => {
    if (!path) return null;

    // if (path.startsWith("http")) return path;
    return process.env.NEXT_PUBLIC_IMAGE_URL + path;
  };

  console.log({ currentUser });

  return (
    <div className='min-h-screen bg-white m-6 rounded-xl'>
      {/* Header */}
      <header className='sticky top-0 z-10 bg-white border-b border-gray-200 rounded-xl'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4'>
          <button
            onClick={() => router.back()}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
            aria-label='Go back'
          >
            <ArrowLeft className='w-6 h-6 text-black' />
          </button>
          <h1 className='text-2xl sm:text-3xl font-semibold text-gray-900'>
            {currentUser?.name}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Profile Section */}
        <div className='bg-white rounded-lg p-6 sm:p-8 mb-8 text-center'>
          {/* Profile Image */}
          <div className='flex justify-center mb-6'>
            <div className='w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold overflow-hidden'>
              <Image
                src={
                  currentUser?.avatar &&
                  process.env.NEXT_PUBLIC_IMAGE_URL + currentUser?.avatar
                }
                alt={currentUser?.name}
                width={500}
                height={500}
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          {/* User Info */}
          <h2 className='text-2xl sm:text-3xl font-semibold text-gray-900 mb-2'>
            {currentUser?.name}
          </h2>
          <p className='text-gray-600 text-sm sm:text-base mb-4'>
            {currentUser?.email}
          </p>

          {/* Contact Info */}
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center text-sm sm:text-base text-gray-700 mb-8 flex-wrap'>
            <div className='flex items-center gap-2'>
              <Phone className='w-4 h-4 text-gray-500' />
              <span>Phone Number: {currentUser?.phone || "N/A"}</span>
            </div>
            <div className='flex items-center gap-2 flex-wrap'>
              {currentUser?.role === "DRIVER" && (
                <div className='flex items-center gap-2'>
                  <FileText className='w-4 h-4 text-gray-500' />
                  <span className='flex items-center gap-4'>
                    Driving Liecense:{" "}
                    <Image
                      src={getImageSrc(currentUser?.driving_license_photos[0])!}
                      alt='Driving License'
                      className='cursor-pointer rounded border hover:scale-105 transition'
                      width={48}
                      height={48}
                      onClick={() => {
                        const images = currentUser?.driving_license_photos
                          ?.map(getImageSrc)
                          .filter(Boolean) as string[];

                        setPreviewImages(images || []);
                        setCurrentIndex(0);
                      }}
                    />
                  </span>
                </div>
              )}

              {currentUser?.role === "DRIVER" && (
                <div className='flex items-center gap-2'>
                  <FileText className='w-4 h-4 text-gray-500' />
                  <span className='flex items-center gap-4'>
                    Vehicle Registration:{" "}
                    <Image
                      src={
                        getImageSrc(
                          currentUser?.vehicle_registration_photos[0],
                        )!
                      }
                      alt='Vehicle Registration'
                      width={48}
                      height={48}
                      className='cursor-pointer rounded border hover:scale-105 transition'
                      onClick={() => {
                        const images = currentUser?.vehicle_registration_photos
                          ?.map(getImageSrc)
                          .filter(Boolean) as string[];

                        setPreviewImages(images);
                        setCurrentIndex(0);
                      }}
                    />
                  </span>
                </div>
              )}

              <div className='flex items-center gap-2'>
                <FileText className='w-4 h-4 text-gray-500' />
                <span className='flex items-center gap-4'>
                  NID:{" "}
                  <Image
                    src={getImageSrc(currentUser?.nid_photos[0])!}
                    alt='NID'
                    width={48}
                    height={48}
                    className='cursor-pointer rounded border hover:scale-105 transition'
                    onClick={() => {
                      const images = currentUser?.nid_photos
                        ?.map(getImageSrc)
                        .filter(Boolean) as string[];

                      setPreviewImages(images);
                      setCurrentIndex(0);
                    }}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors'>
              <p className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
                {currentUser?.role === "DRIVER"
                  ? currentUser?.trip_given_count
                  : currentUser?.trip_received_count || 0}
              </p>
              <p className='text-gray-600 text-sm sm:text-base'>Total Trip</p>
            </div>
            <div
              title={`Total Rating : ${currentUser?.rating_count || 0}`}
              className='bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors'
            >
              <p className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
                {currentUser?.rating}
              </p>
              <p className='text-gray-600 text-sm sm:text-base'>Ratings</p>
            </div>
            {/* <div className='bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors'>
              <p className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
                200
              </p>
              <p className='text-gray-600 text-sm sm:text-base'>Day Streak</p>
            </div> */}
          </div>
        </div>

        {/* Trip History Section */}
        <div>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-xl sm:text-2xl font-semibold text-gray-900'>
              Trip History
            </h3>
          </div>

          {/* Trip List */}
          <div className='space-y-3'>
            {tripHistory?.length > 0 ? (
              tripHistory?.map((trip: TripRequest) => (
                <Link
                  href={`/trip/${trip.id}`}
                  key={trip.id}
                  className='block bg-white rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-200'
                >
                  <div className='grid grid-cols-1 sm:grid-cols-12 gap-4 items-start sm:items-center'>
                    {/* Date */}
                    <div className='sm:col-span-2'>
                      <p className='text-sm text-gray-500 mb-1'>Date</p>
                      <p className='font-medium text-gray-900'>{trip?.date}</p>
                    </div>

                    {/* Pickup Location */}
                    <div className='sm:col-span-3'>
                      <div className='flex gap-2'>
                        <MapPin className='w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5' />
                        <div>
                          <p className='text-sm text-gray-500 mb-1'>Pickup</p>
                          <p className='font-medium text-gray-900 text-sm'>
                            {trip?.pickup_address}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dropoff Location */}
                    <div className='sm:col-span-3'>
                      <div className='flex gap-2'>
                        <MapPin className='w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5' />
                        <div>
                          <p className='text-sm text-gray-500 mb-1'>Dropoff</p>
                          <p className='font-medium text-gray-900 text-sm'>
                            {trip.dropoff_address}{" "}
                            <span className='text-blue-600'>
                              {/* ({trip.distance}) */}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className='sm:col-span-2 text-right'>
                      <p className='text-sm text-gray-500 mb-1'>Amount</p>
                      <p className='font-bold text-blue-600 text-lg'>
                        ${trip?.total_cost}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className='text-gray-600 text-center'>No trips found</div>
            )}
          </div>
        </div>
      </main>

      {previewImages.length > 0 && (
        <div
          className='fixed inset-0 z-50 bg-black/70 flex items-center justify-center'
          onClick={() => setPreviewImages([])}
        >
          <div
            className='relative max-w-4xl w-full mx-4'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setPreviewImages([])}
              className='absolute -top-10 right-0 text-white text-2xl'
            >
              ✕
            </button>

            {/* Image */}
            <Image
              src={previewImages[currentIndex]}
              alt='Preview'
              width={1400}
              height={900}
              className='w-full h-auto rounded-lg object-contain bg-white'
            />

            {/* Prev */}
            {currentIndex > 0 && (
              <button
                onClick={() => setCurrentIndex((i) => i - 1)}
                className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded'
              >
                ◀
              </button>
            )}

            {/* Next */}
            {currentIndex < previewImages.length - 1 && (
              <button
                onClick={() => setCurrentIndex((i) => i + 1)}
                className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded'
              >
                ▶
              </button>
            )}

            {/* Counter */}
            <div className='absolute bottom-2 right-2 text-white text-sm bg-black/60 px-2 py-1 rounded'>
              {currentIndex + 1} / {previewImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

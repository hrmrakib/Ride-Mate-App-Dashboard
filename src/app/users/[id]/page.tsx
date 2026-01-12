"use client";

import { useState } from "react";
import { Calendar, MapPin, Phone, FileText, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useGetUserTripDetailsQuery } from "@/redux/features/user/userAPI";
import { useParams } from "next/navigation";

interface Trip {
  id: number;
  date: string;
  pickupLocation: string;
  pickupAddress: string;
  dropoffLocation: string;
  dropoffAddress: string;
  distance: string;
  price: string;
}

export default function ProfilePage() {
  const [trips] = useState<Trip[]>([
    {
      id: 1,
      date: "02.10.2025",
      pickupLocation: "Pizza Burge Main St, Maintown",
      pickupAddress: "Main St, Maintown",
      dropoffLocation: "456 Oak Ave, Sometown",
      dropoffAddress: "Oak Ave, Sometown",
      distance: "6.00 km",
      price: "$147.80",
    },
    {
      id: 2,
      date: "02.10.2025",
      pickupLocation: "Pizza Burge Main St, Maintown",
      pickupAddress: "Main St, Maintown",
      dropoffLocation: "456 Oak Ave, Sometown",
      dropoffAddress: "Oak Ave, Sometown",
      distance: "6.00 km",
      price: "$147.80",
    },
    {
      id: 3,
      date: "02.10.2025",
      pickupLocation: "Pizza Burge Main St, Maintown",
      pickupAddress: "Main St, Maintown",
      dropoffLocation: "456 Oak Ave, Sometown",
      dropoffAddress: "Oak Ave, Sometown",
      distance: "6.00 km",
      price: "$147.80",
    },
    {
      id: 4,
      date: "02.10.2025",
      pickupLocation: "Pizza Burge Main St, Maintown",
      pickupAddress: "Main St, Maintown",
      dropoffLocation: "456 Oak Ave, Sometown",
      dropoffAddress: "Oak Ave, Sometown",
      distance: "6.00 km",
      price: "$147.80",
    },
  ]);
  const params = useParams();

  const { data } = useGetUserTripDetailsQuery({ userId: params.id as string });

  console.log({ data });

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className='min-h-screen bg-white m-6 rounded-xl'>
      {/* Header */}
      <header className='sticky top-0 z-10 bg-white border-b border-gray-200 rounded-xl'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4'>
          <button
            onClick={handleBack}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
            aria-label='Go back'
          >
            <ArrowLeft className='w-6 h-6 text-black' />
          </button>
          <h1 className='text-2xl sm:text-3xl font-semibold text-gray-900'>
            Sophia Carter
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
                src='/man.png'
                alt='Sophia Carter'
                width={500}
                height={500}
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          {/* User Info */}
          <h2 className='text-2xl sm:text-3xl font-semibold text-gray-900 mb-2'>
            Sophia Carter
          </h2>
          <p className='text-gray-600 text-sm sm:text-base mb-4'>
            shfsahfsdhi@gmail.com
          </p>

          {/* Contact Info */}
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center text-sm sm:text-base text-gray-700 mb-8 flex-wrap'>
            <div className='flex items-center gap-2'>
              <Phone className='w-4 h-4 text-gray-500' />
              <span>Phone Number: 12121212121212</span>
            </div>
            <div className='flex items-center gap-2'>
              <FileText className='w-4 h-4 text-gray-500' />
              <span>NID - 45-1212</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors'>
              <p className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
                10
              </p>
              <p className='text-gray-600 text-sm sm:text-base'>Total Trip</p>
            </div>
            <div className='bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors'>
              <p className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
                4.5
              </p>
              <p className='text-gray-600 text-sm sm:text-base'>Ratings</p>
            </div>
            <div className='bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors'>
              <p className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
                200
              </p>
              <p className='text-gray-600 text-sm sm:text-base'>Day Streak</p>
            </div>
          </div>
        </div>

        {/* Trip History Section */}
        <div>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-xl sm:text-2xl font-semibold text-gray-900'>
              Trip History
            </h3>
            <button
              className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
              aria-label='Filter trips'
            >
              <Calendar className='w-5 h-5 text-gray-600' />
            </button>
          </div>

          {/* Trip List */}
          <div className='space-y-3'>
            {trips.map((trip) => (
              <div
                key={trip.id}
                className='bg-white rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-200'
              >
                <div className='grid grid-cols-1 sm:grid-cols-12 gap-4 items-start sm:items-center'>
                  {/* Date */}
                  <div className='sm:col-span-2'>
                    <p className='text-sm text-gray-500 mb-1'>Date</p>
                    <p className='font-medium text-gray-900'>{trip.date}</p>
                  </div>

                  {/* Pickup Location */}
                  <div className='sm:col-span-3'>
                    <div className='flex gap-2'>
                      <MapPin className='w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5' />
                      <div>
                        <p className='text-sm text-gray-500 mb-1'>Pickup</p>
                        <p className='font-medium text-gray-900 text-sm'>
                          {trip.pickupLocation}
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
                          {trip.dropoffLocation}{" "}
                          <span className='text-blue-600'>
                            ({trip.distance})
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className='sm:col-span-2 text-right'>
                    <p className='text-sm text-gray-500 mb-1'>Amount</p>
                    <p className='font-bold text-blue-600 text-lg'>
                      {trip.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import {
//   ChevronLeft,
//   Calendar,
//   Copy,
//   FileCheck,
//   MapPin,
//   Clock,
//   DollarSign,
// } from "lucide-react";

// interface Trip {
//   id: string;
//   date: string;
//   pickup: string;
//   dropoff: string;
//   distance: string;
//   amount: string;
// }

// export default function Home() {
//   const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
//   const [copiedField, setCopiedField] = useState<string | null>(null);

//   const copyToClipboard = (text: string, field: string) => {
//     navigator.clipboard.writeText(text);
//     setCopiedField(field);
//     setTimeout(() => setCopiedField(null), 2000);
//   };

//   const stats = [
//     {
//       value: "10",
//       label: "Total Trip",
//       color: "from-blue-500 to-blue-600",
//     },
//     {
//       value: "4.5",
//       label: "Ratings",
//       color: "from-purple-500 to-purple-600",
//     },
//     {
//       value: "200",
//       label: "Day Streak",
//       color: "from-orange-500 to-orange-600",
//     },
//   ];

//   const trips: Trip[] = [
//     {
//       id: "1",
//       date: "02.10.2025",
//       pickup: "Pizza Burge Main St, Maintown",
//       dropoff: "456 Oak Ave, Sometown",
//       distance: "6.00 km",
//       amount: "$147.80",
//     },
//     {
//       id: "2",
//       date: "02.10.2025",
//       pickup: "Pizza Burge Main St, Maintown",
//       dropoff: "456 Oak Ave, Sometown",
//       distance: "6.00 km",
//       amount: "$147.80",
//     },
//     {
//       id: "3",
//       date: "02.10.2025",
//       pickup: "Pizza Burge Main St, Maintown",
//       dropoff: "456 Oak Ave, Sometown",
//       distance: "6.00 km",
//       amount: "$147.80",
//     },
//     {
//       id: "4",
//       date: "02.10.2025",
//       pickup: "Pizza Burge Main St, Maintown",
//       dropoff: "456 Oak Ave, Sometown",
//       distance: "6.00 km",
//       amount: "$147.80",
//     },
//   ];

//   return (
//     <main className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
//       {/* Header with Back Button */}
//       <header className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200'>
//         <div className='max-w-4xl mx-auto px-4 py-4 flex items-center gap-4'>
//           <button
//             className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
//             aria-label='Go back'
//           >
//             <ChevronLeft className='w-6 h-6 text-slate-700' />
//           </button>
//           <h1 className='text-xl font-semibold text-slate-900'>
//             Sophia Carter
//           </h1>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className='max-w-4xl mx-auto px-4 py-8 space-y-8'>
//         {/* Profile Section */}
//         <div className='bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200'>
//           {/* Profile Image and Name */}
//           <div className='flex flex-col items-center text-center space-y-4'>
//             <div className='w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg'>
//               SC
//             </div>
//             <div>
//               <h2 className='text-2xl md:text-3xl font-bold text-slate-900'>
//                 Sophia Carter
//               </h2>
//               <p className='text-slate-500 mt-2'>Professional Driver</p>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className='mt-8 space-y-3 md:space-y-0 md:grid md:grid-cols-2 gap-6'>
//             {/* Email */}
//             <div className='flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group'>
//               <div className='flex-1'>
//                 <p className='text-xs font-medium text-slate-500 uppercase tracking-wide mb-1'>
//                   Email
//                 </p>
//                 <p className='text-slate-900 font-medium break-all'>
//                   shfsahfsdhi@gmail.com
//                 </p>
//               </div>
//               <button
//                 onClick={() =>
//                   copyToClipboard("shfsahfsdhi@gmail.com", "email")
//                 }
//                 className='mt-2 md:mt-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity'
//                 title='Copy email'
//               >
//                 {copiedField === "email" ? (
//                   <FileCheck className='w-5 h-5 text-green-600' />
//                 ) : (
//                   <Copy className='w-5 h-5 text-slate-600' />
//                 )}
//               </button>
//             </div>

//             {/* Phone */}
//             <div className='flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group'>
//               <div className='flex-1'>
//                 <p className='text-xs font-medium text-slate-500 uppercase tracking-wide mb-1'>
//                   Phone
//                 </p>
//                 <p className='text-slate-900 font-medium'>121 212 1212 12</p>
//               </div>
//               <button
//                 onClick={() => copyToClipboard("12121212121", "phone")}
//                 className='mt-2 md:mt-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity'
//                 title='Copy phone'
//               >
//                 {copiedField === "phone" ? (
//                   <FileCheck className='w-5 h-5 text-green-600' />
//                 ) : (
//                   <Copy className='w-5 h-5 text-slate-600' />
//                 )}
//               </button>
//             </div>

//             {/* NID */}
//             <div className='flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group'>
//               <div className='flex-1'>
//                 <p className='text-xs font-medium text-slate-500 uppercase tracking-wide mb-1'>
//                   NID
//                 </p>
//                 <p className='text-slate-900 font-medium'>45-1212</p>
//               </div>
//               <button
//                 onClick={() => copyToClipboard("45-1212", "nid")}
//                 className='mt-2 md:mt-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity'
//                 title='Copy NID'
//               >
//                 {copiedField === "nid" ? (
//                   <FileCheck className='w-5 h-5 text-green-600' />
//                 ) : (
//                   <Copy className='w-5 h-5 text-slate-600' />
//                 )}
//               </button>
//             </div>

//             {/* Status Badge */}
//             <div className='flex items-center justify-center md:justify-start p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200'>
//               <div className='flex items-center gap-2'>
//                 <div className='w-3 h-3 rounded-full bg-green-500 animate-pulse'></div>
//                 <span className='text-sm font-medium text-green-700'>
//                   Active & Verified
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className='bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-slate-300'
//             >
//               <div
//                 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
//               >
//                 {stat.value}
//               </div>
//               <p className='text-slate-600 font-medium mt-3'>{stat.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Trip History Section */}
//         <section className='space-y-4'>
//           <div className='flex items-center justify-between'>
//             <h2 className='text-xl font-semibold text-slate-900'>
//               Trip History
//             </h2>
//             <button className='p-2 hover:bg-slate-200 rounded-lg transition-colors'>
//               <Calendar className='w-5 h-5 text-slate-600' />
//             </button>
//           </div>

//           {/* Trip History List */}
//           <div className='space-y-3'>
//             {trips.map((trip) => (
//               <div
//                 key={trip.id}
//                 onClick={() =>
//                   setSelectedTrip(selectedTrip === trip.id ? null : trip.id)
//                 }
//                 className={`bg-white rounded-xl p-4 md:p-6 border transition-all duration-300 cursor-pointer ${
//                   selectedTrip === trip.id
//                     ? "border-blue-500 shadow-lg bg-blue-50"
//                     : "border-slate-200 hover:shadow-md hover:border-slate-300"
//                 }`}
//               >
//                 {/* Mobile Layout */}
//                 <div className='md:hidden space-y-3'>
//                   <div className='flex items-center justify-between'>
//                     <span className='text-sm font-semibold text-slate-600'>
//                       {trip.date}
//                     </span>
//                     <span className='text-lg font-bold text-slate-900'>
//                       {trip.amount}
//                     </span>
//                   </div>
//                   <div className='space-y-2'>
//                     <div className='flex gap-3'>
//                       <div className='w-4 h-4 rounded-full bg-slate-400 flex-shrink-0 mt-1'></div>
//                       <div className='flex-1 min-w-0'>
//                         <p className='text-xs text-slate-500 uppercase tracking-wide'>
//                           Pickup
//                         </p>
//                         <p className='text-sm font-medium text-slate-900 break-words'>
//                           {trip.pickup}
//                         </p>
//                       </div>
//                     </div>
//                     <div className='flex gap-3'>
//                       <MapPin className='w-4 h-4 text-blue-500 flex-shrink-0 mt-1' />
//                       <div className='flex-1 min-w-0'>
//                         <p className='text-xs text-slate-500 uppercase tracking-wide'>
//                           Dropoff
//                         </p>
//                         <p className='text-sm font-medium text-slate-900 break-words'>
//                           {trip.dropoff}
//                         </p>
//                         <p className='text-xs text-blue-600 font-medium mt-1'>
//                           {trip.distance}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Desktop Layout */}
//                 <div className='hidden md:grid md:grid-cols-4 md:gap-4 md:items-center'>
//                   <div className='flex items-center gap-3'>
//                     <Clock className='w-5 h-5 text-slate-400 flex-shrink-0' />
//                     <div>
//                       <p className='text-xs text-slate-500 uppercase tracking-wide'>
//                         Date
//                       </p>
//                       <p className='font-semibold text-slate-900'>
//                         {trip.date}
//                       </p>
//                     </div>
//                   </div>

//                   <div className='flex items-center gap-3'>
//                     <div className='w-3 h-3 rounded-full bg-slate-400 flex-shrink-0'></div>
//                     <div className='min-w-0'>
//                       <p className='text-xs text-slate-500 uppercase tracking-wide'>
//                         From
//                       </p>
//                       <p className='font-medium text-slate-900 truncate'>
//                         {trip.pickup}
//                       </p>
//                     </div>
//                   </div>

//                   <div className='flex items-center gap-3'>
//                     <MapPin className='w-5 h-5 text-blue-500 flex-shrink-0' />
//                     <div className='min-w-0'>
//                       <p className='text-xs text-slate-500 uppercase tracking-wide'>
//                         To
//                       </p>
//                       <p className='font-medium text-slate-900 truncate'>
//                         {trip.dropoff}
//                       </p>
//                       <p className='text-xs text-blue-600 font-medium'>
//                         {trip.distance}
//                       </p>
//                     </div>
//                   </div>

//                   <div className='flex items-center justify-end gap-3'>
//                     <DollarSign className='w-5 h-5 text-green-600 flex-shrink-0' />
//                     <p className='font-bold text-slate-900 text-lg'>
//                       {trip.amount}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Expanded Details */}
//                 {selectedTrip === trip.id && (
//                   <div className='mt-4 pt-4 border-t border-slate-200 space-y-2'>
//                     <div className='grid grid-cols-2 gap-4'>
//                       <div>
//                         <p className='text-xs text-slate-500 uppercase tracking-wide mb-1'>
//                           Distance
//                         </p>
//                         <p className='font-semibold text-slate-900'>
//                           {trip.distance}
//                         </p>
//                       </div>
//                       <div>
//                         <p className='text-xs text-slate-500 uppercase tracking-wide mb-1'>
//                           Total Amount
//                         </p>
//                         <p className='font-semibold text-green-600 text-lg'>
//                           {trip.amount}
//                         </p>
//                       </div>
//                     </div>
//                     <button className='w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors'>
//                       View Details
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

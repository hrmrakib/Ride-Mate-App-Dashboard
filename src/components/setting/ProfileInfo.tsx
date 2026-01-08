"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProfileInfo() {
  const [name, setName] = useState("Mr. John");
  const [email, setEmail] = useState("john@example.com");
  const [avatar, setAvatar] = useState("/man.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        toast("Profile picture updated successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    toast("Changes saved successfully");
  };

  return (
    <div className='w-full p-6 md:p-12'>
      <h2 className='text-2xl md:text-3xl text-[#333] font-bold mb-8'>
        Profile Information
      </h2>

      <div className='flex flex-col md:flex-row gap-8 md:gap-12'>
        {/* Profile Picture Section */}
        <div className='flex flex-col items-center'>
          <div className='relative w-32 h-32 md:w-40 md:h-40 mb-4'>
            <Image
              src={avatar || "/man.png"}
              alt='Profile picture'
              width={160}
              height={160}
              className='w-full h-full rounded-full object-cover border-4 border-primary'
              priority
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className='absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors shadow-lg'
              aria-label='Change profile picture'
            >
              <Camera className='w-5 h-5' />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='hidden'
            aria-label='Upload profile picture'
          />
          <p className='text-sm text-muted-foreground'>
            Click camera to change photo
          </p>
        </div>

        {/* Form Section */}
        <div className='flex-1 space-y-6'>
          <div>
            <label
              htmlFor='name'
              className='block text-xl font-semibold text-[#333] mb-2'
            >
              Name
            </label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full bg-[#E6EAF0] text-black text-lg px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all'
            />
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-xl font-semibold text-[#333] mb-2'
            >
              Email
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full bg-[#E6EAF0] text-black text-lg px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all'
            />
          </div>

          <Button
            onClick={handleSaveChanges}
            className='w-full md:w-auto button'
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

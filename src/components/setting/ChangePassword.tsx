"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    toast.success("Password updated successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className='w-full p-6 md:p-12'>
      <h2 className='text-2xl md:text-3xl text-[#333] font-bold mb-8'>
        Change Password
      </h2>

      <div className='max-w-md space-y-6'>
        {/* Current Password */}
        <div>
          <label
            htmlFor='current-password'
            className='block text-lg text-[#333] font-semibold mb-2'
          >
            Current Password
          </label>
          <div className='relative'>
            <input
              id='current-password'
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className='w-full px-4 py-3 bg-[#E6EAF0] text-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all pr-10'
            />
            <button
              type='button'
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
              aria-label='Toggle password visibility'
            >
              {showCurrentPassword ? (
                <EyeOff className='w-5 h-5' />
              ) : (
                <Eye className='w-5 h-5' />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor='new-password'
            className='block text-lg text-[#333] font-semibold mb-2'
          >
            New Password
          </label>
          <div className='relative'>
            <input
              id='new-password'
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='w-full px-4 py-3 bg-[#E6EAF0] text-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all pr-10'
            />
            <button
              type='button'
              onClick={() => setShowNewPassword(!showNewPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
              aria-label='Toggle password visibility'
            >
              {showNewPassword ? (
                <EyeOff className='w-5 h-5' />
              ) : (
                <Eye className='w-5 h-5' />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor='confirm-password'
            className='block text-lg text-[#333] font-semibold mb-2'
          >
            Confirm Password
          </label>
          <div className='relative'>
            <input
              id='confirm-password'
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full px-4 py-3 bg-[#E6EAF0] text-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all pr-10'
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
              aria-label='Toggle password visibility'
            >
              {showConfirmPassword ? (
                <EyeOff className='w-5 h-5' />
              ) : (
                <Eye className='w-5 h-5' />
              )}
            </button>
          </div>
        </div>

        <Button onClick={handleChangePassword} className='w-full button'>
          Update Password
        </Button>
      </div>
    </div>
  );
}

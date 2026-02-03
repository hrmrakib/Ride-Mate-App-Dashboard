"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { saveTokens } from "@/service/authService";
import { toast } from "sonner";

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res?.ok) {
        const data = await res.json();
        localStorage.setItem("access_token", data.access_token);
        await saveTokens(data.access_token);
        router.push("/");
      } else {
        const data = await res.json();
        toast.error(data[0]?.message);
      }
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className='min-h-screen bg-orange-50 flex items-center justify-center'>
      <div className='bg-[#F3F7FF] h-screen hidden flex-1 md:flex items-center justify-center'>
        <div>
          <Image
            src='/auth-img.png'
            alt='Logo'
            width={600}
            height={600}
            className='mx-auto'
          />
        </div>
      </div>

      <div className='bg-[#E6ECF6] h-screen flex-1 flex items-center justify-center'>
        <Card className='w-full max-w-xl bg-white shadow-lg border-0 m-5'>
          <CardContent className='pb-6'>
            {/* Header */}
            <div className='text-center mb-8'>
              <h1 className='text-2xl lg:text-4xl font-bold text-gray-900 mb-2'>
                Login
              </h1>
              <p className='text-gray-600 text-sm leading-relaxed'>
                Enter your email address and password to access your account.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Email Address */}
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-gray-700 font-medium'>
                  Email Address
                </Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 h-12! bg-gray-50 border-gray-200 focus:bg-white ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className='space-y-2'>
                <Label htmlFor='password' className='text-gray-700 font-medium'>
                  Password
                </Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Min 8 character'
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 h-12! bg-gray-50 border-gray-200 focus:bg-white ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-red-500 text-sm'>{errors.password}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className='text-right'>
                <Link
                  href='/forgot-password'
                  className='text-[#333333] text-sm hover:text-[#012B5B] transition-colors'
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type='submit'
                disabled={isLoading}
                className='w-full button'
              >
                {isLoading ? "Signing In..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

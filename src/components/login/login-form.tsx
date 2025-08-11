
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { useState } from "react";

export function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGetOtp = () => {
    // Placeholder function for handling OTP request
    console.log(`Getting OTP for: +91${phoneNumber}`);
  };

  return (
    <div className="w-[90%] max-w-sm p-6 md:p-8 space-y-6 bg-white rounded-xl shadow-lg font-sans">
      
      {/* Top Logo */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[#9C42FF]">oto.do</h1>
      </div>

      {/* Subtitle */}
      <div className="space-y-2 text-center pt-5">
        <h2 className="text-2xl font-bold text-[#9C42FF]">Login to oto.do</h2>
        <p className="text-sm text-black">
          Enter your phone number to continue.
        </p>
      </div>

      {/* Phone Number Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center space-x-2 ">
          <div className="relative">
            <Input 
              type="text" 
              value="+91" 
              readOnly 
              className="w-20 h-12 text-center bg-white border-[#E0E0E0] rounded-lg"
            />
            <span className="absolute text-lg transform -translate-y-1/2 left-2 top-1/2">🇮🇳</span>
          </div>
          <Input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="h-12 border-[#E0E0E0] rounded-lg px-3"
          />
        </div>
      </div>

      {/* Button */}
      <Button
        onClick={handleGetOtp}
        className="w-full h-11 text-xl font-semibold text-white bg-[#9C42FF] rounded-full hover:bg-white hover:text-[#9C42FF] hover:border-2 hover:border-[#9C42FF] hover:font-extrabold"
      >
        GET OTP
      </Button>
      
      {/* Footer */}
      <div className="pt-10 text-center">
        <p className="text-sm">
          Don’t have an account?{' '}
        </p>
        <div className="pt-2 text-center"><Link href="/signup" className="font-medium text-[#9C42FF] hover:underline hover:font-bold px-6">
            Sign up
          </Link></div>
      </div>
    </div>
  );
}


'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { useState } from "react";

export function SignupForm() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignup = () => {
    // Placeholder function for handling signup
    console.log(`Signing up with: +91${phoneNumber}`);
  };

  return (
    <div className="w-full max-w-[400px] p-8 space-y-6 bg-white rounded-xl shadow-lg font-sans">
      
      {/* Top Logo */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[#9C42FF]">oto.do</h1>
      </div>

      {/* Subtitle */}
      <div className="space-y-2 text-center pt-5">
        <h2 className="text-2xl font-bold text-[#9C42FF]">Sign Up to oto.do</h2>
        <p className="text-sm text-black">
          Enter your phone number to continue.
        </p>
      </div>

      {/* Phone Number Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Input 
              type="text" 
              value="+91" 
              readOnly 
              className="w-20 h-12 px-6 text-right bg-white border-[#E0E0E0] rounded-lg"
            />
            <span className="absolute text-lg transform -translate-y-1/2 left-2 top-1/2">🇮🇳</span>
          </div>
          <Input
            id="phone-number"
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
        onClick={handleSignup}
        className="w-full h-11 font-semibold text-white bg-[#9C42FF] rounded-full hover:bg-[#8B5CF6]"
      >
        SIGN UP
      </Button>
      
      {/* Footer */}
      <div className="pt-8 text-center">
        <p className="text-lg">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-[#9C42FF] hover:underline hover:font-bold px-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

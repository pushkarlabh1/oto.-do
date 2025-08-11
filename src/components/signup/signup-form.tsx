
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { useState } from "react";

export function SignupForm() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignup = () => {
    // Placeholder function for handling signup
    console.log(`Signing up with: +91${phoneNumber}`);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg font-sans">
      
      {/* Top Logo */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#9C42FF]">oto.do</h1>
      </div>

      {/* Subtitle */}
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-[#9C42FF]">Sign Up to oto.do</h2>
        <p className="text-sm text-black">
          Enter your phone number to continue.
        </p>
      </div>

      {/* Phone Number Section */}
      <div className="space-y-2">
        <Label htmlFor="phone-number" className="text-sm font-medium text-gray-700">Phone Number</Label>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Input 
              type="text" 
              value="+91" 
              readOnly 
              className="w-24 h-12 pl-10 text-center bg-white border-[#E0E0E0] rounded-lg"
            />
            <span className="absolute text-lg transform -translate-y-1/2 left-3 top-1/2">🇮🇳</span>
            <span className="absolute transform -translate-y-1/2 right-3 top-1/2 text-gray-400">⌄</span>
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
        className="w-full h-12 font-bold text-white bg-[#9C42FF] rounded-full hover:bg-[#8B5CF6]"
      >
        SIGN UP
      </Button>
      
      {/* Footer */}
      <div className="pt-4 text-center border-t border-gray-200">
        <p className="text-sm">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-[#9C42FF] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

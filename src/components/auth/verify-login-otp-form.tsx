
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth-context";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export function VerifyLoginOtpForm() {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const { confirmationResult } = useAuth();

  const handleVerifyOtp = async () => {
    if (!confirmationResult) {
      toast.error("Verification session expired. Please try again.");
      router.push('/login');
      return;
    }

    if (otp.length === 6) {
      try {
        const result = await confirmationResult.confirm(otp);
        const user = result.user;
        toast.success("OTP verified successfully!");

        // Check if user has a profile
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().name) {
          router.push('/dashboard');
        } else {
          router.push('/enter-name');
        }
      } catch (error) {
        console.error("Error verifying OTP", error);
        toast.error("Invalid OTP. Please try again.");
      }
    } else {
      toast.error("Please enter a 6-digit OTP.");
    }
  };

  return (
    <div className="w-[90%] max-w-sm p-6 md:p-8 space-y-6 bg-white rounded-xl shadow-lg font-sans">
      
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[#9C42FF]">oto.do</h1>
      </div>

      <div className="space-y-2 text-center pt-5">
        <h2 className="text-2xl font-bold text-[#9C42FF]">Verify OTP</h2>
        <p className="text-sm text-black">
          Enter the 6-digit code sent to your phone to log in.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="h-12 border-[#E0E0E0] rounded-lg px-3 text-center tracking-[0.5em]"
          maxLength={6}
        />
      </div>

      <Button
        onClick={handleVerifyOtp}
        className="w-full h-11 text-xl font-semibold text-white bg-[#9C42FF] rounded-full hover:bg-white hover:text-[#9C42FF] hover:border-2 hover:border-[#9C42FF] hover:font-extrabold"
      >
        VERIFY & LOGIN
      </Button>
    </div>
  );
}

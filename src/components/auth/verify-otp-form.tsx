
'use client';

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth-context";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export function VerifyOtpForm({ source, agent }: { source?: string | null, agent?: string | null }) {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const { confirmationResult } = useAuth();

  useEffect(() => {
    if (!confirmationResult) {
      toast.error("Verification session expired. Please try again.");
      router.replace('/signup');
    }
  }, [confirmationResult, router]);
  
  const handleVerifyOtp = async () => {
    if (!confirmationResult) {
      toast.error("Verification session expired. Please try again.");
      router.push('/signup');
      return;
    }

    if (otp.length === 6) {
      try {
        await confirmationResult.confirm(otp);
        toast.success("OTP verified successfully!");
        
        const queryParams = new URLSearchParams();
        if (source) {
          queryParams.set('source', source);
        }
        if (agent) {
          queryParams.set('agent', agent);
        }
        router.push(`/enter-name?${queryParams.toString()}`);

      } catch (error) {
        console.error("Error verifying OTP", error);
        toast.error("Invalid OTP. Please try again.");
      }
    } else {
      toast.error("Please enter a 6-digit OTP.");
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleVerifyOtp();
  };

  return (
    <div className="w-[90%] max-w-sm p-6 md:p-8 space-y-6 bg-white rounded-xl shadow-lg font-sans">
      
      <div className="space-y-2 text-center pt-5">
        <h2 className="text-2xl font-bold text-[#9C42FF]">Verify OTP</h2>
        <p className="text-sm text-black">
          Enter the 6-digit code sent to your phone.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="space-y-4 pt-2 flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
              </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-xl font-semibold text-white bg-[#9C42FF] rounded-full hover:bg-white hover:text-[#9C42FF] hover:border-2 hover:border-[#9C42FF] hover:font-extrabold"
        >
          VERIFY & SIGNUP
        </Button>
      </form>
    </div>
  );
}

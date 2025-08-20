
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { useMemo, useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import { countries } from "@/lib/countries";
import { auth, db } from '@/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setConfirmationResult } = useAuth();

  const countryOptions = useMemo(
    () =>
      countries.map((country) => ({
        value: `${country.flag} ${country.dial_code}`,
        label: `${country.flag} ${country.name} (${country.dial_code})`,
        code: country.dial_code,
      })),
    []
  );

  const defaultCountry = useMemo(() => countryOptions.find(c => c.code === '+91'), [countryOptions]);
  const [countryValue, setCountryValue] = useState(defaultCountry?.value || "");

  function normalizePhone(localDigits: string, dialCode: string) {
    const digitsOnly = localDigits.replace(/\D+/g, "");
    return `${dialCode}${digitsOnly}`;
  }

  const handleGetOtp = async () => {
    if (phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsLoading(true);
    const selectedCountry = countryOptions.find(c => c.value === countryValue);
    const countryCode = selectedCountry ? selectedCountry.code : '';
    const fullPhoneNumber = normalizePhone(phoneNumber, countryCode);
    
    try {
      if ((window as any).grecaptcha) {
        (window as any).grecaptcha.reset();
      }

      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("phone", "==", fullPhoneNumber), limit(1));
      const snap = await getDocs(q);
      const confirmationResult = await signInWithPhoneNumber(auth, fullPhoneNumber, verifier);
      setConfirmationResult(confirmationResult);

      if (snap.empty) {
        // This is a new user, send them to the signup OTP page with a query param.
        router.push('/verify-otp?new_user=true');
      } else {
        // This is an existing user, send them to the login verification page.
        toast.success("OTP sent successfully!");
        router.push('/verify-login');
      }
    } catch (error: any) {
      console.error("Error sending OTP", error);
      if ((window as any).grecaptcha) {
        (window as any).grecaptcha.reset();
      }
      if (error.code === 'auth/too-many-requests') {
        toast.error("Too many requests. Please try again later.");
      } else {
        toast.error("Failed to send OTP. Please check your phone number or try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleGetOtp();
  }

  return (
    <div className="w-[90%] max-w-sm p-6 md:p-8 space-y-6 bg-white rounded-xl shadow-lg font-sans">
      <div id="recaptcha-container"></div>
      
      <div className="space-y-2 text-center pt-5">
        <h2 className="text-2xl font-bold text-[#9C42FF]">Login to oto.do</h2>
        <p className="text-sm text-black">
          Enter your phone number to continue.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="space-y-4 pt-2">
          <div className="flex items-center space-x-2 ">
          <Combobox
              options={countryOptions}
              value={countryValue}
              onSelect={setCountryValue}
              placeholder="Select"
              searchPlaceholder="Search country..."
              notFoundText="No country found."
              triggerClassName="w-auto px-1 h-12 rounded-lg"
              />
            <Input
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              maxLength={10}
              className="h-12 border-[#E0E0E0] rounded-lg px-3"
              disabled={isLoading}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-xl font-semibold text-white bg-[#9C42FF] rounded-full hover:bg-white hover:text-[#9C42FF] hover:border-2 hover:border-[#9C42FF] hover:font-extrabold"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : 'GET OTP'}
        </Button>
      </form>
      
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

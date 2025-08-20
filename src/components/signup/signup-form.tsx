
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";

import { countries } from "@/lib/countries";
import { auth, db } from "@/firebase";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

import { useAuth } from "@/context/auth-context";

export function SignupForm() {
  const router = useRouter();
  const { setConfirmationResult } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryValue, setCountryValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const countryOptions = useMemo(
    () =>
      countries.map((country) => ({
        value: `${country.flag} ${country.dial_code}`,
        label: `${country.flag} ${country.name} (${country.dial_code})`,
        code: country.dial_code,
      })),
    []
  );

  useState(() => {
    const def = countryOptions.find((c) => c.code === "+91");
    setCountryValue(def?.value || "");
  });

  function normalizePhone(localDigits: string, dialCode: string) {
    const digitsOnly = localDigits.replace(/\D+/g, "");
    return `${dialCode}${digitsOnly}`;
  }

  const handleSignup = async () => {
    if (phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    
    setIsLoading(true);

    try {
      if ((window as any).grecaptcha) {
        (window as any).grecaptcha.reset();
      }

      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });

      const selectedCountry = countryOptions.find((c) => c.value === countryValue);
      const dialCode = selectedCountry ? selectedCountry.code : "";
      const fullPhoneNumber = normalizePhone(phoneNumber, dialCode);

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("phone", "==", fullPhoneNumber), limit(1));
      const snap = await getDocs(q);

      if (!snap.empty) {
        toast.success("You already have an active account. Please verify the OTP to log in.");
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          fullPhoneNumber,
          appVerifier
        );
        setConfirmationResult(confirmationResult);
        router.push("/verify-login");
        return;
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        appVerifier
      );
      setConfirmationResult(confirmationResult);
      toast.success("OTP sent successfully!");
      router.push("/verify-otp");
    } catch (error: any) {
      console.error("Error sending OTP", error);
      
      if ((window as any).grecaptcha) {
        (window as any).grecaptcha.reset();
      }

      if (error?.code === "auth/invalid-phone-number") {
        toast.error("Invalid phone number format. Include country code, e.g., +91XXXXXXXXXX.");
      } else if (error?.code === "auth/too-many-requests") {
        toast.error("Too many requests. Please try again later or use a test number in Firebase.");
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignup();
  }

  return (
    <div className="w-[90%] max-w-sm p-6 md:p-8 space-y-6 bg-white rounded-xl shadow-lg font-sans">
      <div id="recaptcha-container" />

      <div className="space-y-2 text-center pt-5">
        <h2 className="text-2xl font-bold text-[#9C42FF]">Sign Up to oto.do</h2>
        <p className="text-sm text-black">Enter your phone number to continue.</p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="space-y-4 pt-2">
          <div className="flex items-center space-x-2">
            <Combobox
              options={countryOptions}
              value={countryValue}
              onSelect={setCountryValue}
              placeholder="Select"
              searchPlaceholder="Search country..."
              notFoundText="No country found."
              triggerClassName="w-auto px-2 h-12 rounded-lg"
            />
            <Input
              id="phone-number"
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
          className="w-full h-11 font-bold text-xl text-white bg-[#9C42FF] rounded-full hover:bg-[#FFFFFF] hover:font-extrabold hover:text-[#9C42FF] hover:border-2 hover:border-[#9C42FF]"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "SIGN UP"}
        </Button>
      </form>

      <div className="pt-8 text-center">
        <p className="text-lg">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#9C42FF] hover:underline hover:font-bold px-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

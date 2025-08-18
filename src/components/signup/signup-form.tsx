
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";

import { countries } from "@/lib/countries";
// If your alias "@" maps to src, you can use "@/lib/firebase".
// Otherwise, use a relative path from src/components/signup/ to src/lib/firebase:
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

  // Warning state if phone already exists
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [warningText, setWarningText] = useState("");

  // Prepare country options for the Combobox
  const countryOptions = useMemo(
    () =>
      countries.map((country) => ({
        value: `${country.flag} ${country.dial_code}`,
        label: `${country.flag} ${country.name} (${country.dial_code})`,
        code: country.dial_code,
      })),
    []
  );

  // Default to +91 (India) as in your original code
  useEffect(() => {
    const def = countryOptions.find((c) => c.code === "+91");
    setCountryValue(def?.value || "");
  }, [countryOptions]);

  // Create the Invisible reCAPTCHA verifier once
  useEffect(() => {
    // Ensure the container exists
    const container = document.getElementById("recaptcha-container");
    if (!container) return;

    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });
    (window as any).recaptchaVerifier = verifier;

    return () => {
      try {
        verifier.clear();
      } catch {}
      (window as any).recaptchaVerifier = null;
    };
  }, []);

  // Normalize phone into E.164-like format: +<country_code><digits only>
  function normalizePhone(localDigits: string, dialCode: string) {
    const digitsOnly = localDigits.replace(/\D+/g, "");
    return `${dialCode}${digitsOnly}`;
  }

  const handleSignup = async () => {
    // Reset warning on each attempt
    setAlreadyExists(false);
    setWarningText("");

    const appVerifier = (window as any).recaptchaVerifier as RecaptchaVerifier | null;
    if (!appVerifier) {
      toast.error("reCAPTCHA not ready. Please wait and try again.");
      return;
    }

    if (phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    // Build normalized phone number
    const selectedCountry = countryOptions.find((c) => c.value === countryValue);
    const dialCode = selectedCountry ? selectedCountry.code : "";
    const fullPhoneNumber = normalizePhone(phoneNumber, dialCode);

    setIsLoading(true);
    try {
      // 1) Check Firestore for existing user with this phone
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("phone", "==", fullPhoneNumber), limit(1));
      const snap = await getDocs(q);

      if (!snap.empty) {
        // Found an existing account. Show warning and STOP (do not send OTP)
        setAlreadyExists(true);
        setWarningText(
          "You already have an active account. Just click on Login button below to access your profile"
        );
        toast.error("You already have an active account.");
        return;
      }

      // 2) Not found: send OTP
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

      if (error?.code === "auth/invalid-phone-number") {
        toast.error("Invalid phone number format. Include country code, e.g., +91XXXXXXXXXX.");
      } else if (error?.code === "auth/too-many-requests") {
        toast.error("Too many requests. Please try again later or use a test number in Firebase.");
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }

      // Reset reCAPTCHA so user can retry
      try {
        const widgetId = await appVerifier.render();
        if (typeof (window as any).grecaptcha?.reset === "function" && widgetId != null) {
          (window as any).grecaptcha.reset(widgetId);
        }
      } catch {}
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
      {/* Invisible reCAPTCHA container must exist in DOM */}
      <div id="recaptcha-container" />

      {/* Top Logo */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[#9C42FF]">oto.do</h1>
      </div>

      {/* Subtitle */}
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

        {/* Sign Up Button */}
        <Button
          type="submit"
          className="w-full h-11 font-bold text-xl text-white bg-[#9C42FF] rounded-full hover:bg-[#FFFFFF] hover:font-extrabold hover:text-[#9C42FF] hover:border-2 hover:border-[#9C42FF]"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "SIGN UP"}
        </Button>
      </form>

      {/* Warning only (no extra Login button; you already have one) */}
      {alreadyExists && warningText && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {warningText}
        </div>
      )}

      {/* Footer with existing Login link */}
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

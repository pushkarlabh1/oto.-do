
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import { countries } from "@/lib/countries";


export function SignupForm() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const countryOptions = countries.map(country => ({
    value: `${country.flag} ${country.dial_code}`,
    label: `${country.flag} ${country.name} (${country.dial_code})`,
    code: country.dial_code,
  }));

  const defaultCountry = countryOptions.find(c => c.code === '+91');
  const [countryValue, setCountryValue] = useState(defaultCountry?.value || "");


  const handleSignup = () => {
    const selectedCountry = countryOptions.find(c => c.value === countryValue);
    const countryCode = selectedCountry ? selectedCountry.code : '';
    console.log(`Signing up with: ${countryCode}${phoneNumber}`);
  };

  return (
    <div className="w-[90%] max-w-sm p-6 md:p-8 space-y-6 bg-white rounded-xl shadow-lg font-sans">
      
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
        <Combobox
            options={countryOptions}
            value={countryValue}
            onSelect={setCountryValue}
            placeholder="Select"
            searchPlaceholder="Search country..."
            notFoundText="No country found."
            triggerClassName="w-auto px-2 h-12"
          />
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
        className="w-full h-11 font-bold text-xl text-white bg-[#9C42FF] rounded-full hover:bg-[#FFFFFF] hover:font-extrabold hover:text-[#9C42FF] hover:border-2 hover:border-[#9C42FF] "
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

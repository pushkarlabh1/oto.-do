"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

// Firebase imports
import { auth, db } from "@/firebase";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export function EnterNameForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  // If someone lands here without being signed in, send them to login
  useEffect(() => {
    const u = auth.currentUser;
    if (!u) router.replace("/login");
  }, [router]);

  const handleContinue = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Please enter your name.");
      return;
    }

    const u = auth.currentUser;
    if (!u) {
      toast.error("Not signed in.");
      return;
    }

    setSaving(true);
    try {
      const userRef = doc(db, "users", u.uid);
      const snap = await getDoc(userRef);
      const now = serverTimestamp();
      const phone = u.phoneNumber || "";

      if (snap.exists()) {
        await updateDoc(userRef, {
          name: trimmed,
          phone,
          updatedAt: now,
        });
      } else {
        await setDoc(userRef, {
          name: trimmed,
          phone,
          createdAt: now,
          updatedAt: now,
        });
      }

      toast.success(`Welcome, ${trimmed}!`);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-[90%] max-w-sm p-6 md:p-8 space-y-6 bg-white rounded-xl shadow-lg font-sans">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[#9C42FF]">oto.do</h1>
      </div>

      <div className="space-y-2 text-center pt-5">
        <h2 className="text-2xl font-bold text-[#9C42FF]">Enter Your Name</h2>
        <p className="text-sm text-black">Please enter your name to continue.</p>
      </div>

      <div className="space-y-4 pt-2">
        <Input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 border-[#E0E0E0] rounded-lg px-3"
          disabled={saving}
        />
      </div>

      <Button
        onClick={handleContinue}
        disabled={saving}
        className="w-full h-11 text-xl font-semibold text-white bg-[#9C42FF] rounded-full hover:bg-white hover:text-[#9C42FF] hover:border-2 hover:border-[#9C42FF] hover:font-extrabold disabled:opacity-60"
      >
        {saving ? "Saving..." : "CONTINUE"}
      </Button>
    </div>
  );
}

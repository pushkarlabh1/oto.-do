"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { auth, db } from "@/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { currentUser, loading: authLoading } = useAuth();
  const [displayName, setDisplayName] = useState<string>("");
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Wait for Firebase auth to finish loading
    if (authLoading) {
      return;
    }

    // If no user, redirect to login
    if (!currentUser) {
      router.replace("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists() && snap.data().name) {
          const data = snap.data() as { name?: string };
          setDisplayName(data.name ?? "");
        } else {
          // If user exists but has no name, redirect to set it
          router.replace("/enter-name");
          return;
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
        // Optionally handle error, e.g., show a toast message
      } finally {
        setPageLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, authLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  if (authLoading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F7FE]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7FE]">
      <header className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Welcome, {displayName}</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-black text-white hover:opacity-90"
        >
          Logout
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow p-6">
          <p>Your dashboard is ready.</p>
        </div>
      </main>
    </div>
  );
}

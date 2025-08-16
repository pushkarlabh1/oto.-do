"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function DashboardPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as { name?: string };
          setDisplayName(data.name ?? "");
        } else {
          router.replace("/enter-name");
          return;
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
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

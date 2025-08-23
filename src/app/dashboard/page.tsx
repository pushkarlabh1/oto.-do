
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { auth, db } from "@/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { DashboardHeader } from "@/components/auth/dashboard-header";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import { AuthFooter } from "@/components/auth/auth-footer";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser, loading: authLoading } = useAuth();
  const [displayName, setDisplayName] = useState<string>("");
  const [pageLoading, setPageLoading] = useState(true);
  const [waitlistedAgents, setWaitlistedAgents] = useState<string[]>([]);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  useEffect(() => {
    const intakeSuccess = searchParams.get('intake_success') === 'true';
    if (intakeSuccess) {
      setShowRedirectMessage(true);
       const newParams = new URLSearchParams(searchParams.toString());
       newParams.delete('intake_success');
       router.replace(`/dashboard?${newParams.toString()}`, {scroll: false});
    }
  }, []); 
  
  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!currentUser) {
      router.replace("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (userData.name) {
            setDisplayName(userData.name);
            const agents = new Set<string>();

            if (userData.hasSubmittedStockIntake) {
                agents.add("AI stock analyst agent");
            }
            if (userData.hasSubmittedAutoSwipingIntake) {
                agents.add("Auto swiping agent");
            }
            
            const justAddedAgent = searchParams.get('agent');
            if (showRedirectMessage && justAddedAgent) {
              agents.add(justAddedAgent);
            }

            setWaitlistedAgents(Array.from(agents));
          } else {
            router.replace("/enter-name");
            return;
          }
        } else {
          // This case can happen if the user exists in Auth but not in Firestore yet.
          // Let's redirect to enter-name to create the user doc.
          router.replace("/enter-name");
          return;
        }

      } catch (e) {
        console.error("Error fetching user data:", e);
        toast.error("Failed to load your data. Please try again.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, authLoading, router, searchParams, showRedirectMessage]);

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
    <div className="flex flex-col min-h-screen bg-[#F9F7FE]">
      <DashboardHeader />
      <main className="flex-grow">
        <header className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-black text-white hover:opacity-90"
            >
              Logout
            </button>
          </div>
          <h2 className="text-2xl font-semibold text-[#6469ED]">Welcome, {displayName}</h2>
        </header>

        <div className="max-w-4xl mx-auto px-4 space-y-4">
          {waitlistedAgents.length > 0 ? (
            <>
              <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-lg font-semibold">Your Waitlists</h3>
              </div>
              {waitlistedAgents.map((agentName) => (
                <div key={agentName} className="bg-white rounded-xl shadow p-6">
                  <p className="text-green-600 font-semibold">
                    You will be notified via email whenever our {agentName} is ready to use.
                  </p>
                </div>
              ))}
            </>
            ) : (
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold">Your Waitlists</h3>
                <Separator className="my-4" />
                <p className="text-muted-foreground">You have not joined any waitlists yet.</p>
              </div>
            )}
        </div>
      </main>
      <Separator />
      <AuthFooter />
    </div>
  );
}


export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}

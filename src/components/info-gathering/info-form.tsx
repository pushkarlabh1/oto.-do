
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { db } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

export function InfoForm({ agent }: { agent?: string | null }) {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [expectations, setExpectations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error('You must be logged in to submit.');
      router.push('/login');
      return;
    }

    if (!email.trim() || !expectations.trim()) {
      toast.error('Please fill out all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const userRef = doc(db, 'users', currentUser.uid);

      let waitlistData: any = {
        waitlistIntake: {
          ...(agent?.toLowerCase().includes('stock') && { stockAgent: { email, expectations, submittedAt: serverTimestamp() } }),
          ...(agent?.toLowerCase().includes('swiping') && { autoSwipingAgent: { email, expectations, submittedAt: serverTimestamp() } }),
        }
      };

      if (agent?.toLowerCase().includes('stock')) {
        waitlistData.hasSubmittedStockIntake = true;
      }
      if (agent?.toLowerCase().includes('swiping')) {
        waitlistData.hasSubmittedAutoSwipingIntake = true;
      }

      await setDoc(userRef, waitlistData, { merge: true });

      toast.success('Thank you! Your feedback has been submitted.');
      
      const queryParams = new URLSearchParams({
        intake_success: 'true'
      });

      if (agent) {
        queryParams.set('agent', agent);
      }

      router.push(`/dashboard?${queryParams.toString()}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const expectationLabel = agent
    ? `What are your specific expectations from our ${agent}?`
    : 'What are your specific expectations from our AI agents?';
  
  const expectationPlaceholder = agent?.toLowerCase().includes('stock')
    ? 'e.g., I want to get real-time stock alerts, analyze market sentiment...'
    : agent?.toLowerCase().includes('dating')
    ? 'e.g., I want it to swipe right on profiles that match my preferences...'
    : 'Let us know what you want this agent to do...';

  return (
    <div className="w-[90%] max-w-lg p-6 md:p-8 space-y-6 bg-white rounded-xl shadow-lg font-sans">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-primary">Join the Waitlist</h2>
        <p className="text-muted-foreground">
          Please provide your email and let us know what you expect from our upcoming agents.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            className="h-12 border-[#E0E0E0] rounded-lg px-3"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectations">{expectationLabel}</Label>
          <Textarea
            id="expectations"
            placeholder={expectationPlaceholder}
            value={expectations}
            onChange={(e) => setExpectations(e.target.value)}
            required
            disabled={isSubmitting}
            className="min-h-[120px] border-[#E0E0E0] rounded-lg p-3"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 text-xl font-semibold text-white bg-primary rounded-full hover:bg-primary/90"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}

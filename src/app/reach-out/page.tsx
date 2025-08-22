
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Github } from 'lucide-react';
import toast from 'react-hot-toast';

import { Header } from '@/components/landing/header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BuildingIcon } from '@/components/icons/building-icon';
import { LeafIcon } from '@/components/icons/leaf-icon';
import { WebsiteIcon } from '@/components/icons/website-icon';
import { XIcon } from '@/components/icons/x-icon';
import { Linkedin } from 'lucide-react';

import { db, auth } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const contactInfo = [
  {
    icon: BuildingIcon,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Company',
    value: 'Moontropy Private Limited',
  },
  {
    icon: LeafIcon,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'CIN',
    value: 'U72900KA2021PTC148310',
  },
  {
    icon: Phone,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Phone',
    value: '+91 981 068 2949',
  },
  {
    icon: Mail,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Email',
    value: 'contact@moontropy.com',
  },
  {
    icon: MapPin,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Registered Address',
    value:
      '1st Floor, 52, SPD Plaza, 4th A Cross, 5th Block, Near Jyoti Nivas College, Koramangala Bengaluru, Karnataka, India, 560095',
  },
];

const socialLinks = [
  { icon: XIcon, href: '#', color: 'text-black', hoverColor: 'bg-gray-800/10' },
  { icon: Linkedin, href: '#', color: 'text-sky-700', hoverColor: 'bg-sky-700/10' },
  { icon: Github, href: '#', color: 'text-gray-800', hoverColor: 'bg-gray-800/10' },
];

export default function ReachOutPage() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.displayName) {
        setName(user.displayName);
      }
      if (user.email) {
        setEmail(user.email);
      }
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please fill out all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (user) {
        // User is logged in, save to subcollection of their user document
        const userMessagesRef = collection(db, "users", user.uid, "messages");
        await addDoc(userMessagesRef, {
          name,
          email,
          message,
          createdAt: serverTimestamp(),
        });
      } else {
        // User is not logged in, save to guestMessages collection
        await addDoc(collection(db, 'messages'), {
            name,
            email,
            message,
            guestUser: true,
            createdAt: serverTimestamp(),
        });
      }

      toast.success('Thank you for your message. Our team is reviewing your details and will reach out to you soon', {
        duration: 10000,
        position: 'top-center',
        containerStyle: {
          top: 20,
        }
      });
      // Clear form
      if (!user) {
        setName('');
        setEmail('');
      }
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F9F7FE] min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-4 flex-grow">
        <div className="text-center pt-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Get in Touch
          </h1>
          <p className="mt-2 text-base text-gray-600 mx-auto">
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon
              as possible.
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-40 items-start">
            {/* Contact Info Column */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-primary text-center md:text-left">Contact Us</h2>
              <div className="bg-white p-8 rounded-2xl shadow-sm space-y-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-5">
                    <div
                      className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${item.bgColor}`}
                    >
                      <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-gray-600 break-all">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Column */}
            <div className="space-y-8 text-center md:text-left">
              <h2 className="text-3xl font-bold text-primary">Reach Out to Us</h2>
              <p className="text-gray-600">
                Have a question or a new integration idea? Let us know!
              </p>
              <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting || !!(user && user.displayName)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting || !!(user && user.email)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Let us know how we can help or what you'd like to see next..."
                      className="min-h-[120px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Other Ways to Connect */}
        <div className="mt-12 text-center bg-[#D6B2FE]/10 py-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-[#7545e8]">Other Ways to Connect</h2>
          <p className="mt-2 text-grey">
            Follow us on social media or check out our resources
          </p>
          <div className="mt-8 flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className={`w-12 h-12 flex items-center justify-center rounded-full bg-white transition-colors ${social.hoverColor}`}
              >
                <social.icon className={`w-6 h-6 ${social.color}`} />
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground py-6">
          <p>&copy; 2025 oto.do. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
}

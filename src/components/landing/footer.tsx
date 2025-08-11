import { Twitter, Linkedin } from "lucide-react";
import Link from 'next/link';

export function Footer() {
  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  const footerLinks = {
    Company: [
      { name: 'About', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  };

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 text-center">
            <Link href="/" className="text-2xl font-bold text-primary mb-4 inline-block">
              oto.do
            </Link>
            <p className="text-muted-foreground max-w-sm md:max-w-xs text-center mx-auto">
              Putting your life on auto-drive with AI-powered task automation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-center md:text-left">Company</h3>
            <ul className="space-y-2">
              {footerLinks.Company.map((link) => (
                <li key={link.name} className="text-center md:text-left">
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-center md:text-left">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.Legal.map((link) => (
                <li key={link.name} className="text-center md:text-left">
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
            <a href="mailto:hello@oto.do" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              hello@oto.do
            </a>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 oto.do. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

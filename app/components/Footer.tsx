import React from 'react';
import Link from 'next/link';
import { HeartPulse } from 'lucide-react';

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950  border-t border-emerald-900 text-white pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Brand and Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900">
                <HeartPulse className="w-4 h-4 text-emerald-950" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                MediSmart
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Next-generation healthcare routing. We combine clinical AI with real-time roster tracking to connect patients with the right specialists, instantly.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:opacity-70 transition-opacity">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm tracking-wide">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-sm hover:opacity-70 transition-opacity">AI Triage</Link></li>
              <li><Link href="/services" className="text-sm hover:opacity-70 transition-opacity">Live Roster</Link></li>
              <li><Link href="/login" className="text-sm hover:opacity-70 transition-opacity">Patient Portal</Link></li>
              <li><Link href="/staff" className="text-sm hover:opacity-70 transition-opacity">Staff Directory</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm tracking-wide">Company</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm hover:opacity-70 transition-opacity">About Us</Link></li>
              <li><Link href="#" className="text-sm hover:opacity-70 transition-opacity">Careers</Link></li>
              <li><Link href="#" className="text-sm hover:opacity-70 transition-opacity">Press & News</Link></li>
              <li><Link href="#" className="text-sm hover:opacity-70 transition-opacity">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm tracking-wide">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm hover:opacity-70 transition-opacity">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm hover:opacity-70 transition-opacity">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm hover:opacity-70 transition-opacity">HIPAA Compliance</Link></li>
              <li><Link href="#" className="text-sm hover:opacity-70 transition-opacity">Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Disclaimer */}
        <div className="pt-8 border-t border-emerald-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            &copy; {currentYear} MediSmart Healthcare Architecture. All rights reserved.
          </p>
          <p className="text-xs max-w-xl md:text-right">
            MediSmart is a technology platform, not a healthcare provider. In case of a severe medical emergency, please call 911 or your local emergency services immediately.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
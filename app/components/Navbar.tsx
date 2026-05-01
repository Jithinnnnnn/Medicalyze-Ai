'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, Menu, X, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll for the dynamic glassmorphism effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  // Shared classes for the floating "Islands"
  const islandClass = `
    pointer-events-auto flex items-center h-14 px-4
    transition-all duration-300 ease-in-out
    rounded-2xl border border-white/20
    ${scrolled 
      ? 'bg-white/70 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]' 
      : 'bg-white/90 shadow-lg'}
  `;

  return (
    <>
      {/* Floating Header */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none flex justify-between md:justify-center items-start gap-3 w-full max-w-7xl mx-auto">
        
        {/* ISLAND 1: Brand/Home */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={islandClass}
        >
          <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              MediSmart
            </span>
          </Link>
        </motion.div>

        {/* ISLAND 2: Search Section (Desktop Only) */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`hidden md:flex flex-1 max-w-md ${islandClass} !px-2`}
        >
          <div className="relative group w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-1.5 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none sm:text-sm"
              placeholder="Search our medical services..."
            />
          </div>
        </motion.div>

        {/* ISLAND 3: Navigation (Home & Services) */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`${islandClass} gap-2`}
        >
          <nav className="hidden md:flex items-center gap-1">
            {/* Home Link */}
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === '/' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50/50'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>

            {/* Services Link */}
            <Link
              href="/services"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                pathname.includes('/services') 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50/50'
              }`}
            >
              <Shield className="w-4 h-4" />
              Services
            </Link>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="md:hidden p-1 text-slate-600 hover:text-slate-900 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-slate-50/95 backdrop-blur-xl md:hidden pt-28 px-4 pb-6 flex flex-col gap-4 overflow-y-auto"
          >
            {/* Mobile Search */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Search services..."
              />
            </div>

            {/* Mobile Links */}
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-medium"
              >
                <Home className="w-5 h-5 text-blue-600" />
                Home
              </Link>
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-medium"
              >
                <Shield className="w-5 h-5 text-blue-600" />
                Services
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
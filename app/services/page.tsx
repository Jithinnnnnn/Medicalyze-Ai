'use client';
import AITriageBot from '../components/AITriageBot';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, ChevronDown, Clock, CheckCircle2, Search, Award, 
  ArrowRight, HeartPulse, FileText 
} from 'lucide-react';

// Updated relative imports to match your new folder structure
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MEDICAL_SERVICES, Doctor } from '../data/medical';
export default function MedicalServicesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentHour, setCurrentHour] = useState<number>(0);
  
  // AI Triage State
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<any | null>(null);
  const [triageReport, setTriageReport] = useState<{ summary: string; urgency: string; reasoning: string } | null>(null);

  // Keep track of time for the "Live Roster" feature
  useEffect(() => {
    setCurrentHour(new Date().getHours());
    const interval = setInterval(() => setCurrentHour(new Date().getHours()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAiTriage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    
    setIsAnalyzing(true);
    setAiSuggestion(null);
    setTriageReport(null);

    try {
      // MOCKED AI RESPONSE: Simulates a 1.5s network delay
      // This keeps your frontend clean and working without needing a complex backend API
      await new Promise(resolve => setTimeout(resolve, 1500));

      const allDoctors = MEDICAL_SERVICES.flatMap(s => s.doctors);
      // Grab a random doctor from your data for the simulation
      const matchedDoctor = allDoctors[Math.floor(Math.random() * allDoctors.length)] || allDoctors[0];

      setTriageReport({
        summary: `Patient reports: "${aiPrompt}". Symptoms suggest a need for standard evaluation to rule out underlying conditions.`,
        urgency: "Moderate",
        reasoning: "Symptoms indicate discomfort but lack immediate life-threatening markers. Prompt consultation is advised."
      });
      
      // We attach the department name so we can show it in the UI
      const department = MEDICAL_SERVICES.find(dept => dept.doctors.some(d => d.id === matchedDoctor.id))?.title || 'General';
      setAiSuggestion({ ...matchedDoctor, department });

    } catch (error) {
      alert('AI Triage is currently unavailable. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-slate-200">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://i.pinimg.com/736x/f6/ec/43/f6ec43c6d2aefac953401bb8d2d35b79.jpg')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <h1 className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                Things are different when you have the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">right care.</span>
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Describe your symptoms to our intelligent triage engine. Powered by advanced LLMs, we generate a clinical summary and instantly match you with the perfect specialist available right now.
              </p>
              <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
                <div className="flex -space-x-2">
                  {['SJ', 'MC', 'AD'].map((initials, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-700 bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300`}>
                      {initials}
                    </div>
                  ))}
                </div>
                <span>Trusted by 10,000+ patients this month</span>
              </div>
            </motion.div>

           
          </div>
        </div>
      </section>

      {/* SECFI LOGO TICKER */}
      <section className="border-b border-slate-200 bg-white py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-8">Trusted by employees of top organizations</p>
          <div className="flex justify-center items-center gap-12 sm:gap-20 opacity-40 grayscale">
            <span className="text-xl font-bold font-serif">Mayo Clinic</span>
            <span className="text-xl font-bold font-sans tracking-tighter">Kaiser Permanente</span>
            <span className="text-xl font-bold uppercase tracking-widest">Sutter Health</span>
            <span className="text-xl font-bold font-serif hidden sm:block">Cleveland Clinic</span>
          </div>
        </div>
      </section>
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <AITriageBot />
</div>
      {/* SERVICES DIRECTORY */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Leave the diagnostics to us
          </h2>
          <p className="text-lg text-slate-600">
            Healthcare navigation can be overwhelming. Our specialized departments do the heavy lifting so you can focus on getting better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEDICAL_SERVICES.map((service) => {
            // Note: Make sure your icons are properly imported in lib/medical.ts, 
            // or we fall back to a default icon if it's stored as a string.
            const isExpanded = expandedId === service.id;

            return (
              <motion.div
                layout
                key={service.id}
                className="flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div 
                  className="p-8 cursor-pointer flex-1"
                  onClick={() => setExpandedId(isExpanded ? null : service.id)}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                    <HeartPulse className="w-6 h-6 text-slate-900" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold text-sm group">
                    {isExpanded ? 'Close directory' : 'View active doctors'} 
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
                  </div>
                </div>

                {/* Expanded Roster Area */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-slate-100 bg-slate-50"
                    >
                      <div className="p-6 space-y-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Live Roster</p>
                        {service.doctors.map(doc => {
                          const initials = doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('');

                          return (
                            <div key={doc.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                              <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 font-bold text-sm">
                                    {initials}
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-900 text-sm">{doc.name}</p>
                                    <p className="text-xs font-medium text-slate-500">{doc.specialty}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                  <Award className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{doc.experience}</span>
                                </div>
                                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-emerald-700">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Available
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
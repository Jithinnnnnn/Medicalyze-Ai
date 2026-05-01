// app/components/AITriageBot.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bot, ArrowRight, Activity, Stethoscope, UserCircle } from 'lucide-react';
import { MEDICAL_SERVICES, Doctor } from '../data/medical'; // Ensure path is correct

export default function AITriageBot() {
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // State to hold the results
  const [result, setResult] = useState<{
    summary: string;
    likelyIssue: string;
    doctor: Doctor | null;
    departmentTitle: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      // Call our secure Next.js API route
      const response = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();

      // Find the full doctor object based on the ID the AI returned
      let matchedDoctor = null;
      let departmentTitle = '';
      
      for (const dept of MEDICAL_SERVICES) {
        const found = dept.doctors.find(d => d.id === data.recommendedDoctorId);
        if (found) {
          matchedDoctor = found;
          departmentTitle = dept.title;
          break;
        }
      }

      setResult({
        summary: data.summary,
        likelyIssue: data.likelyIssue,
        doctor: matchedDoctor,
        departmentTitle: departmentTitle,
      });

    } catch (error) {
      alert("We couldn't reach the AI Triage engine. Please try again.");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200">
      {/* Medical Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop')" }}
      />
      {/* Gradient Overlay so text is readable */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/95 via-slate-900/90 to-slate-900/80 backdrop-blur-sm" />

      <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Side: The Input Form */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">AI Clinical Triage</h2>
              <p className="text-blue-200 text-sm">Powered by GitHub Models</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Describe your symptoms in detail:
              </label>
              <textarea
                rows={4}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="I've had a persistent fever of 102°F for three days, along with a dry cough and mild chest tightness..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={isAnalyzing || !symptoms.trim()}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="w-5 h-5 animate-pulse" />
                  Analyzing Symptoms...
                </>
              ) : (
                <>
                  Analyze & Match Doctor <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <Link
              href="/services"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              Start AI Triage
              <Bot className="h-4 w-4 transition-transform group-hover:rotate-12" />
            </Link>
          </form>
        </div>

        {/* Right Side: The Results */}
        <div className="w-full md:w-1/2">
          {result ? (
            <div className="bg-white rounded-2xl p-6 shadow-xl h-full flex flex-col justify-between animate-in fade-in slide-in-from-right-4 duration-500">
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Clinical Summary</h3>
                  <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {result.summary}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Most Likely Issue</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-semibold border border-red-100">
                    <Activity className="w-4 h-4" />
                    {result.likelyIssue}
                  </div>
                </div>
              </div>

              {/* Matched Doctor Card */}
              {result.doctor ? (
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3 flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4" /> Recommended Specialist
                  </h3>
                  <div className="flex gap-4 items-start bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
                      {result.doctor.name.split(' ').map(n => n[0]).join('').replace('D', '')}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{result.doctor.name}</h4>
                      <p className="text-sm font-medium text-blue-700">{result.doctor.specialty}</p>
                      <p className="text-xs text-slate-500 mt-1">{result.departmentTitle} • {result.doctor.experience}</p>
                      <button className="mt-3 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors w-full sm:w-auto">
                        Book Consultation
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-500 italic border-t border-slate-200 pt-6">
                  Could not find an exact doctor match for these symptoms in our current roster.
                </div>
              )}
            </div>
          ) : (
            <div className="h-full min-h-[300px] border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-center p-8">
              <UserCircle className="w-16 h-16 text-white/30 mb-4" />
              <p className="text-slate-300 text-sm">
                Enter your symptoms on the left. Our AI will generate a clinical summary and match you with the best available doctor.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
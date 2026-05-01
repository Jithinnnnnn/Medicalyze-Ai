'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Icons for the home page sections
import { 
  HeartPulse, 
  Bot, 
  Clock, 
  ShieldCheck, 
  Activity, 
  Stethoscope,
  ArrowRight,
  Zap,
  Award,
  Users,
  Star
} from 'lucide-react';

// --- PAGE DATA ---

const FEATURES = [
  {
    icon: Bot,
    title: 'Instant AI Triage',
    description: 'Describe symptoms in plain language. Our clinical AI analyzes and matches you with the precise specialist needed instantly.',
  },
  {
    icon: Clock,
    title: 'Live availability',
    description: 'Eliminate waiting rooms. View real-time doctor schedules and book immediate consultations with on-duty professionals.',
  },
  {
    icon: HeartPulse,
    title: 'Comprehensive Network',
    description: 'Access a full spectrum of care, from primary holistic wellness to complex, high-stakes neurosurgery.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-Grade Security',
    description: 'HIPAA compliant infrastructure utilizing advanced encryption and strict access controls to protect sensitive medical data.',
  },
  {
    icon: Zap,
    title: 'Dynamic Routing',
    description: 'Our algorithm analyzes live department loads to route you to the specialist with the shortest immediate wait time.',
  },
  {
    icon: Award,
    title: 'Board-Certified Experts',
    description: 'Connect exclusively with highly vetted, top-tier medical professionals holding decades of combined experience.',
  },
];

const WHY_CHOOSE_US = [
  {
    icon: Users,
    title: 'Patient-Centric Approach',
    description: 'We redesign healthcare logistics around your schedule and needs, not the other way around.'
  },
  {
    icon: Zap,
    title: 'Unmatched Speed to Care',
    description: 'Reduce time-to-diagnosis by up to 60% with instant AI routing and direct booking.'
  },
  {
    icon: ShieldCheck,
    title: 'Accuracy & Trust',
    description: 'Clinically validated AI triage ensures you see the right doctor the first time, reducing misdiagnoses.'
  }
];

const TESTIMONIALS = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Chief of Medicine, City Hospital",
    text: "MediSmart's routing capabilities have reduced our patient misallocation by 40%. It is an indispensable tool for modern clinical administration."
  },
  {
    name: "Michael Chen",
    role: "Patient",
    text: "I was unsure which specialist to see. The AI triage directed me immediately, saving me weeks of waiting for referrals."
  },
  {
    name: "Amanda Torres",
    role: "Clinic Administrator",
    text: "Seamless integration. It ensures patients only see doctors who are actually available, optimizing our entire roster workflow."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white relative font-sans selection:bg-blue-100 overflow-x-hidden">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-slate-400">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative font-sans selection:bg-blue-100 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-slate-950">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-[position:65%_20%] bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/10" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center lg:text-left mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tighter leading-[1.05] mb-8">
                Your pathway to <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200">
                  Precision Healthcare.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-12 max-w-3xl mx-auto lg:mx-0">
                Stop guessing which specialist you need. Our clinically-validated AI triage analyzes your symptoms instantly, connecting you with the <strong className="text-white font-semibold">right board-certified expert</strong> based on real-time availability and department load.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
                <button
                  onClick={() => window.location.href = '/triage'}
                  className="group w-full sm:w-auto px-8 py-4 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Start AI Triage <Bot className="w-5 h-5 transition-transform group-hover:rotate-12" />
                </button>
                <a
                  href="/login"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-semibold bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all active:scale-95 flex items-center justify-center"
                >
                  Patient Login
                </a>
              </div>

              {/* Stats */}
              <div className="hidden sm:flex items-center justify-center lg:justify-start gap-12 text-white border-t border-slate-800/80 pt-8 mt-4">
                <div>
                  <p className="text-3xl lg:text-4xl font-extrabold mb-1 tracking-tight">24/7</p>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Access to Care</p>
                </div>
                <div className="w-px h-10 bg-slate-800" />
                <div>
                  <p className="text-3xl lg:text-4xl font-extrabold mb-1 tracking-tight">98%</p>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Satisfaction</p>
                </div>
                <div className="w-px h-10 bg-slate-800" />
                <div>
                  <p className="text-3xl lg:text-4xl font-extrabold mb-1 tracking-tight">&lt;5 min</p>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Avg Wait Time</p>
                </div>
              </div>
            </motion.div>

            {/* Right Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto lg:mr-0"
            >
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-black overflow-hidden relative group">
                <div className="absolute -top-10 -right-10 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <Activity className="w-48 h-48 text-blue-500" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                      <Stethoscope className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-blue-400 uppercase tracking-wider">On-Demand</span>
                      <h3 className="text-2xl font-bold text-white tracking-tight">Virtual Check-up</h3>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-base leading-relaxed mb-8 bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
                    Connect with a general practitioner in under 15 minutes for diagnostics, referrals, or prescriptions. Safe, secure, and ready when you are.
                  </p>
                  
                  <a href="/triage" className="group/link inline-flex w-full justify-center items-center gap-2.5 px-6 py-4 rounded-xl text-base font-bold text-blue-950 bg-blue-100 hover:bg-white transition-colors">
                    Find Available Doctor Now 
                    <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="font-sans relative z-10">
        
        {/* Core Technology Section */}
        <section className="bg-slate-50 py-24 lg:py-32 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">The MediSmart Edge</h2>
              <p className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-6 tracking-tighter">Intelligent Clinical Technology</p>
              <p className="text-xl text-slate-600 leading-relaxed">Our platform integrates cutting-edge AI with real-time logistical data to optimize the entire patient journey.</p>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {FEATURES.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    className="group relative p-8 rounded-3xl bg-white border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300 shadow-inner">
                      <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-950 mb-4 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-8 text-base">
                      {feature.description}
                    </p>
                    <a href="/services" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group">
                      Learn more <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-white py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Superior Outcomes</h2>
                <p className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-8 tracking-tighter">Why patients and providers choose MediSmart.</p>
                <p className="text-lg text-slate-600 leading-relaxed mb-12">We go beyond simple booking. We are recalculating health logistics to ensure accuracy, speed, and privacy in every interaction. Our commitment is to clinical excellence powered by smart technology.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/about" className="px-6 py-3 rounded-xl bg-slate-900 text-white text-center font-semibold hover:bg-slate-800 transition-colors text-sm shadow-md">
                    About Our Technology
                  </a>
                  <a href="/contact" className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-center font-semibold hover:bg-slate-50 transition-colors text-sm shadow-sm">
                    Request a Demo
                  </a>
                </div>
              </div>
              <div className="space-y-6 bg-slate-50 p-8 lg:p-12 rounded-3xl border border-slate-100 shadow-inner">
                {WHY_CHOOSE_US.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-slate-950 mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-blue-100 py-24 lg:py-32 relative overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3">Real Impact</h2>
              <p className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-6 tracking-tighter">Trusted by Professionals</p>
              <p className="text-xl text-slate-950 leading-relaxed">Hear from the clinical leaders and patients experiencing the benefits of intelligent care routing.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial, idx) => (
                <div key={idx} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-colors">
                  <div>
                    <div className="flex gap-1 mb-8 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-200 text-lg italic mb-10 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 border-t border-slate-800 pt-6">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-lg border border-slate-700">
                        {testimonial.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-white text-base">{testimonial.name}</p>
                      <p className="text-sm text-blue-300">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
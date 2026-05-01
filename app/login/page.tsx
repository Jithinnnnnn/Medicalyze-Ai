'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  // Toggle between Login and Register modes
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // Combined state for both forms
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    // Optional: Clear passwords when switching modes
    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
  };

  const validateForm = () => {
    const { email, password, confirmPassword, name } = formData;

    if (!email || !password) {
      alert('Email and Password are required.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return false;
    }

    // Extra validation for Registration mode
    if (!isLoginMode) {
      if (!name) {
        alert('Full name is required to register.');
        return false;
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // MOCKED API CALL: Simulates network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isLoginMode) {
        alert('Login successful!');
      } else {
        alert(`Registration successful for ${formData.name}!`);
      }
      
      // Redirect to home page
      router.push('/');
      
    } catch (error: any) {
      alert(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Reusable styling classes
  const inputStyles = "appearance-none rounded-xl relative block w-full px-3 py-2 sm:py-2.5 border border-gray-300 bg-white/70 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all";
  const selectStyles = "appearance-none rounded-xl block w-full px-3 py-2 sm:py-2.5 border border-gray-300 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer transition-all";

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden font-sans"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.pinimg.com/736x/2b/90/fb/2b90fb0f3a436514948a28f7ad3313cd.jpg')",
      }}
    >
      <div className="max-w-md w-full mx-4 max-h-[95vh] overflow-y-auto bg-white/30 backdrop-blur-lg border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-4 sm:space-y-6 no-scrollbar">
        
        {/* Dynamic Header */}
        <div className="flex flex-col items-center">
          <h2 className="mt-3 text-center text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isLoginMode ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-200">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleMode}
              type="button"
              className="font-medium text-blue-300 hover:text-blue-100 transition-colors focus:outline-none"
            >
              {isLoginMode ? 'Sign up here' : 'Sign in here'}
            </button>
          </p>
        </div>

        <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
          
          {/* Conditional Fields: Only show Name and Role if in Register Mode */}
          {!isLoginMode && (
            <>
              <div className="space-y-1">
                <label htmlFor="name" className="text-xs sm:text-sm font-medium text-gray-100">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLoginMode}
                  className={inputStyles}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1 relative">
                <label htmlFor="role" className="text-xs sm:text-sm font-medium text-gray-100">Role</label>
                <select
                  id="role"
                  name="role"
                  className={selectStyles}
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 pt-6 text-gray-700">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </>
          )}

          {/* Always Show Email and Password */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-100">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputStyles}
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-xs sm:text-sm font-medium text-gray-100">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isLoginMode ? "current-password" : "new-password"}
              required
              className={inputStyles}
              placeholder={isLoginMode ? "********" : "Min. 6 characters"}
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Conditional Field: Only show Confirm Password if in Register Mode */}
          {!isLoginMode && (
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="text-xs sm:text-sm font-medium text-gray-100">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required={!isLoginMode}
                className={inputStyles}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full h-11 flex justify-center items-center px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/20"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                isLoginMode ? 'Sign In' : 'Create Account'
              )}
            </button>
          </div>

          {/* Only show Google Login in Sign In mode to keep it clean */}
          {isLoginMode && (
            <>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-white/20" />
                </div>
              </div>
              <div>
                <button
                  type="button" 
                  className="w-full h-11 flex items-center justify-center px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-gray-900 bg-white/90 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                  onClick={() => alert('Google login not configured yet.')}
                >
                  <img
                    className="h-5 w-5 mr-2"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google logo"
                  />
                  Continue with Google
                </button>
              </div>
            </>
          )}

          {/* Back to Home Link */}
          <div className="text-center pt-2 mt-2 border-t border-white/10">
            <Link
              href="/"
              className="font-medium text-blue-300 hover:text-blue-100 text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors pt-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
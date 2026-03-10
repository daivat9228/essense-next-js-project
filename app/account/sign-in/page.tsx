'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store';
import { login } from '@/store/slices/userSlice';
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    router.push('/account/orders');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (isSignUp && !formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Must be at least 6 characters';
    if (isSignUp && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    dispatch(login({
      email: formData.email,
      name: isSignUp ? formData.name : formData.email.split('@')[0],
    }));
    setIsSubmitting(false);
    router.push('/account/orders');
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-gray-50 border-2 ${
      errors[field]
        ? 'border-red-300 bg-red-50/30 focus:ring-red-300'
        : 'border-gray-200 focus:ring-primary-400'
    } rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white transition-all placeholder-gray-400 text-gray-900`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-primary-950 flex items-center justify-center px-4 py-16 relative overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h2 className="text-4xl font-serif font-bold text-primary-400 tracking-wide hover:text-primary-300 transition-colors">
              Essence
            </h2>
            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mt-1">Perfumery</p>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

          {/* Tab switcher */}
          <div className="grid grid-cols-2 border-b border-white/10">
            <button
              onClick={() => !isSignUp ? null : switchMode()}
              className={`py-4 text-sm font-semibold transition-all ${
                !isSignUp
                  ? 'bg-white/10 text-white border-b-2 border-primary-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => isSignUp ? null : switchMode()}
              className={`py-4 text-sm font-semibold transition-all ${
                isSignUp
                  ? 'bg-white/10 text-white border-b-2 border-primary-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="p-8">
            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-serif font-bold text-white mb-2">
                {isSignUp ? 'Join Essence' : 'Welcome Back'}
              </h1>
              <p className="text-gray-400 text-sm">
                {isSignUp
                  ? 'Create an account to track orders & save favorites'
                  : 'Sign in to continue your fragrance journey'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={inputClass('name')}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">⚠ {errors.name}</p>}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass('email')}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">⚠ {errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`${inputClass('password')} pr-11`}
                    placeholder="Min. 6 characters"
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword
                      ? <EyeSlashIcon className="h-5 w-5" />
                      : <EyeIcon className="h-5 w-5" />
                    }
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">⚠ {errors.password}</p>}
              </div>

              {isSignUp && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={inputClass('confirmPassword')}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">⚠ {errors.confirmPassword}</p>}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-500 disabled:bg-primary-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg hover:shadow-primary-900/50 transform hover:-translate-y-0.5 disabled:transform-none mt-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {isSignUp ? 'Create My Account' : 'Sign In →'}
                  </>
                )}
              </button>
            </form>

            {/* Demo notice */}
            <div className="mt-6 flex items-start gap-3 bg-blue-500/10 border border-blue-400/20 rounded-2xl p-4">
              <ShieldCheckIcon className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-300 font-semibold text-xs uppercase tracking-wider">Demo Mode</p>
                <p className="text-blue-400/80 text-xs mt-1 leading-relaxed">
                  Use any email and password to sign in. No real account required.
                </p>
              </div>
            </div>

            {/* Back to home */}
            <p className="text-center mt-6 text-gray-500 text-xs">
              <Link href="/" className="hover:text-gray-300 transition-colors">
                ← Back to Essence
              </Link>
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex justify-center gap-8 mt-8 text-gray-600 text-xs">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Secure & Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Privacy Protected
          </span>
        </div>
      </div>
    </div>
  );
}

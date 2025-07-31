
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loginType, setLoginType] = useState('staff');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Convert FormData to URLSearchParams for application/x-www-form-urlencoded format
    const urlEncodedData = new URLSearchParams();

    // Add all form fields
    urlEncodedData.append('loginType', loginType);
    urlEncodedData.append('username', formData.get('username') as string || '');
    urlEncodedData.append('password', formData.get('password') as string || '');
    urlEncodedData.append('rememberMe', formData.get('rememberMe') ? 'true' : 'false');

    try {
      const response = await fetch('https://readdy.ai/api/form/d251gtgehn5tpoi0h9d0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Login credentials submitted successfully!');
        form.reset();

        // Redirect to admin panel if login type is administrator
        if (loginType === 'admin') {
          setTimeout(() => {
            router.push('/admin');
          }, 1500);
        }
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to submit login credentials. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div 
            className="bg-cover bg-center rounded-2xl shadow-2xl min-h-[600px] relative p-12 flex items-center"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20university%20campus%20building%20with%20contemporary%20architecture%2C%20large%20windows%2C%20green%20landscaping%2C%20academic%20institution%20facade%2C%20educational%20environment%2C%20Philippines%20setting%2C%20bright%20daylight%2C%20institutional%20building%20exterior&width=600&height=600&seq=login-bg&orientation=squarish')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 to-yellow-800/90 rounded-2xl"></div>
            <div className="relative z-10 text-white">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">PIT</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Welcome to POISE</h1>
                  <p className="text-green-200">Planning Office Information System E-Portal</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Your Gateway to Excellence</h2>
                  <p className="text-green-100 leading-relaxed">
                    Access the comprehensive Centralized School Management System designed for 
                    institutional planning, development, and administrative coordination at 
                    Palompon Institute of Technology.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <i className="ri-shield-check-line text-yellow-400 text-xl"></i>
                    <span>Secure & Encrypted Access</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <i className="ri-time-line text-yellow-400 text-xl"></i>
                    <span>24/7 System Availability</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <i className="ri-team-line text-yellow-400 text-xl"></i>
                    <span>Multi-Department Integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">PIT</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CSMS Portal</h1>
              <p className="text-gray-600 dark:text-gray-400">Sign in to continue</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sign In</h2>
              <p className="text-gray-600 dark:text-gray-400">Access your CSMS account</p>
            </div>

            {/* Login Type Selector */}
            <div className="mb-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => setLoginType('staff')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                    loginType === 'staff'
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  Staff/Faculty
                </button>
                <button
                  type="button"
                  onClick={() => setLoginType('admin')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                    loginType === 'admin'
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  Administrator
                </button>
              </div>
            </div>

            {/* Submission Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg">
                <div className="flex items-center space-x-2">
                  <i className="ri-check-circle-line text-green-600 dark:text-green-400"></i>
                  <span className="text-green-800 dark:text-green-200 text-sm">{submitMessage}</span>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                <div className="flex items-center space-x-2">
                  <i className="ri-error-warning-line text-red-600 dark:text-red-400"></i>
                  <span className="text-red-800 dark:text-red-200 text-sm">{submitMessage}</span>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form 
              id="csms-login-form"
              data-readdy-form
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {loginType === 'staff' ? 'Employee ID' : 'Admin Username'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 pr-12"
                    placeholder={loginType === 'staff' ? 'Enter your employee ID' : 'Enter admin username'}
                  />
                  <i className="ri-user-line absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                  >
                    <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 cursor-pointer whitespace-nowrap"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white py-3 px-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer whitespace-nowrap"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Additional Options */}
            <div className="mt-8 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Need Help?</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/contact"
                  className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <i className="ri-customer-service-line text-gray-600 dark:text-gray-400"></i>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Support</span>
                </Link>
                <Link
                  href="/about"
                  className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <i className="ri-information-line text-gray-600 dark:text-gray-400"></i>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Guide</span>
                </Link>
              </div>

              {/* Back to Home */}
              <div className="text-center">
                <Link 
                  href="/"
                  className="inline-flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-left-line"></i>
                  <span>Back to Homepage</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

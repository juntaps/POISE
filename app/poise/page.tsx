'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function PoisePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 via-green-700 to-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">POISE</span> Portal
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-4xl mx-auto">
              Planning Office Information System E-Portal E-Portal - Your gateway to institutional excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/login"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all cursor-pointer whitespace-nowrap"
              >
                Access Portal
              </Link>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all cursor-pointer whitespace-nowrap">
                System Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* System Modules */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              System <span className="text-green-600">Modules</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Planning Module */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-clipboard-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Planning Module</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Comprehensive planning tools for institutional development, strategic planning, and project management.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Strategic Plan Management</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Project Proposal Tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Budget Planning Tools</span>
                  </li>
                </ul>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap">
                  Access Module
                </button>
              </div>

              {/* Research Module */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-flask-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Research & Extension</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Research project management and community extension program coordination platform.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Research Proposal System</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Extension Program Tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Publication Management</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap">
                  Access Module
                </button>
              </div>

              {/* HR Module */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-team-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">HR Management</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Human resources information system for personnel management and development programs.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Personnel Records</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Performance Evaluation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Professional Development</span>
                  </li>
                </ul>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap">
                  Access Module
                </button>
              </div>

              {/* Registrar Module */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-book-open-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Registrar Integration</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Academic records management and student information system integration.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Student Records Access</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Academic Planning</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Enrollment Analytics</span>
                  </li>
                </ul>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap">
                  Access Module
                </button>
              </div>

              {/* Procurement Module */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-shopping-cart-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Procurement System</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Procurement management system for purchasing, vendor management, and asset tracking.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Purchase Request System</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Vendor Management</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Asset Tracking</span>
                  </li>
                </ul>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap">
                  Access Module
                </button>
              </div>

              {/* Analytics Module */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-bar-chart-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analytics Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Comprehensive analytics and reporting tools for institutional performance monitoring.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Performance Metrics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Custom Reports</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">Data Visualization</span>
                  </li>
                </ul>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap">
                  Access Module
                </button>
              </div>
            </div>
          </section>

          {/* System Features */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Key <span className="text-green-600">Features</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-shield-check-line text-green-600 dark:text-green-400 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure & Reliable</h3>
                    <p className="text-gray-600 dark:text-gray-300">Enterprise-grade security with role-based access control and data encryption.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-smartphone-line text-blue-600 dark:text-blue-400 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mobile Responsive</h3>
                    <p className="text-gray-600 dark:text-gray-300">Access the system anywhere, anytime with full mobile compatibility.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-team-line text-yellow-600 dark:text-yellow-400 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Collaborative Tools</h3>
                    <p className="text-gray-600 dark:text-gray-300">Built-in collaboration features for seamless teamwork and communication.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-bar-chart-box-line text-purple-600 dark:text-purple-400 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Advanced Analytics</h3>
                    <p className="text-gray-600 dark:text-gray-300">Comprehensive reporting and data visualization for informed decision-making.</p>
                  </div>
                </div>
              </div>
              
              <div 
                className="bg-cover bg-center rounded-2xl shadow-2xl min-h-[500px] relative"
                style={{
                  backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20digital%20dashboard%20interface%20showing%20institutional%20management%20system%2C%20clean%20UI%20design%2C%20data%20visualization%20charts%2C%20administrative%20software%20interface%2C%20professional%20academic%20system%20display%2C%20green%20and%20yellow%20color%20scheme%2C%20user-friendly%20interface&width=600&height=500&seq=poise-features&orientation=landscape')`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface User {
  name: string;
  role: string;
  department: string;
  avatar: string;
}

interface FacultyLayoutProps {
  children: React.ReactNode;
  user: User;
}

export default function FacultyLayout({ children, user }: FacultyLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard']);

  const menuItems = [
    {
      id: 'proposals',
      label: 'Proposals',
      icon: 'ri-file-text-line',
      children: [
        { id: 'dashboard', label: 'Dashboard', href: '/faculty/proposals' },
        { id: 'create-new', label: 'Create New', href: '/faculty/proposals/create' },
        { id: 'my-proposals', label: 'My Proposals', href: '/faculty/proposals/my' }
      ]
    },
    {
      id: 'bed2',
      label: 'BED No. 2',
      icon: 'ri-file-chart-line',
      children: [
        { id: 'add-record', label: 'Add New Record', href: '/faculty/bed2/add' },
        { id: 'view-record', label: 'View Record', href: '/faculty/bed2/view' }
      ]
    },
    {
      id: 'bar1',
      label: 'BAR No.1',
      icon: 'ri-bar-chart-line',
      children: [
        { id: 'add-record', label: 'Add Record', href: '/faculty/bar1/add' },
        { id: 'view-records', label: 'View Records', href: '/faculty/bar1/view' }
      ]
    },
    {
      id: 'copc-documents',
      label: 'COPC Documents',
      icon: 'ri-folder-line',
      href: '/faculty/copc'
    },
    {
      id: 'my-logs',
      label: 'My Logs',
      icon: 'ri-history-line',
      href: '/faculty/logs'
    }
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white shadow-xl transition-all duration-300 z-40 ${ 
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!isSidebarCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">PIT</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Faculty Portal</h2>
                    <p className="text-xs text-green-600">POISE System</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <i className={`ri-${isSidebarCollapsed ? 'menu-unfold' : 'menu-fold'}-line text-gray-600`}></i>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className="w-full flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <i className={`${item.icon} w-5 h-5 flex items-center justify-center`}></i>
                          {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
                        </div>
                        {!isSidebarCollapsed && (
                          <i className={`ri-arrow-${expandedItems.includes(item.id) ? 'down' : 'right'}-s-line text-sm`}></i>
                        )}
                      </button>
                      {!isSidebarCollapsed && expandedItems.includes(item.id) && (
                        <div className="ml-6 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.id}
                              href={child.href}
                              className="block p-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors cursor-pointer"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors cursor-pointer"
                    >
                      <i className={`${item.icon} w-5 h-5 flex items-center justify-center`}></i>
                      {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            {!isSidebarCollapsed ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.role}</p>
                </div>
                <Link href="/login" className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 transition-colors cursor-pointer">
                  <i className="ri-logout-box-line text-red-600 text-sm"></i>
                </Link>
              </div>
            ) : (
              <div className="flex justify-center">
                <Link href="/login" className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 transition-colors cursor-pointer">
                  <i className="ri-logout-box-line text-red-600"></i>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Faculty Dashboard</h1>
                <p className="text-sm text-gray-600">Planning Office Information System</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
                  <i className="ri-notification-3-line text-green-600"></i>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
                  <i className="ri-settings-3-line text-green-600"></i>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
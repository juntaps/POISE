
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface User {
  name: string;
  role: string;
  department: string;
  avatar: string;
}

interface AdminLayoutProps {
  children: React.ReactNode;
  user: User;
}

export default function AdminLayout({ children, user }: AdminLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'ri-dashboard-line',
      href: '/admin'
    },
    {
      id: 'budget',
      label: 'Budget Management',
      icon: 'ri-money-dollar-circle-line',
      children: [
        { id: 'bed2', label: 'BED No.2', href: '/admin/budget/bed2' },
        { id: 'bar1', label: 'BAR No.1', href: '/admin/budget/bar1' }
      ]
    },
    {
      id: 'proposals',
      label: 'Proposal Management',
      icon: 'ri-file-text-line',
      children: [
        { id: 'create-proposal', label: 'Create New', href: '/admin/proposals/create' },
        { id: 'all-proposals', label: 'All Proposals', href: '/admin/proposals/all' },
        { id: 'my-proposals', label: 'My Proposals', href: '/admin/proposals/my' },
        { id: 'approved-proposals', label: 'Approved', href: '/admin/proposals/approved' }
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'ri-user-settings-line',
      children: [
        { id: 'add-user', label: 'Add User', href: '/admin/users/add' },
        { id: 'edit-user', label: 'Edit User', href: '/admin/users/edit' }
      ]
    },
    {
      id: 'colleges',
      label: 'College/Offices',
      icon: 'ri-building-4-line',
      children: [
        { id: 'add-college', label: 'Add College/Office', href: '/admin/colleges/add' }
      ]
    },
    {
      id: 'schedules',
      label: 'Schedules',
      icon: 'ri-calendar-schedule-line',
      children: [
        { id: 'proposal-schedules', label: 'Proposal Schedules', href: '/admin/schedules/proposals' },
        { id: 'bed2-schedules', label: 'BED No.2 Schedules', href: '/admin/schedules/bed2' },
        { id: 'bar1-schedules', label: 'BAR No.1 Schedules', href: '/admin/schedules/bar1' }
      ]
    },
    {
      id: 'documents',
      label: 'Other Documents',
      icon: 'ri-folder-line',
      children: [
        { id: 'copc-documents', label: 'COPC Documents', href: '/admin/documents/copc' },
        { id: 'pit-memorandums', label: 'PIT Memorandums', href: '/admin/documents/pit' },
        { id: 'office-order', label: 'Office Order', href: '/admin/documents/orders' }
      ]
    },
    {
      id: 'proposal-category',
      label: 'Proposal Category',
      icon: 'ri-price-tag-3-line',
      href: '/admin/categories'
    },
    {
      id: 'quicklinks',
      label: 'Quicklinks',
      icon: 'ri-links-line',
      href: '/admin/quicklinks'
    },
    {
      id: 'calendar-events',
      label: 'Calendar of Events',
      icon: 'ri-calendar-event-line',
      href: '/admin/calendar'
    },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: 'ri-megaphone-line',
      href: '/admin/announcements'
    },
    {
      id: 'database',
      label: 'Database',
      icon: 'ri-database-2-line',
      children: [
        { id: 'backup-restore', label: 'Backup and Restore', href: '/admin/database/backup' }
      ]
    },
    {
      id: 'activity-logs',
      label: 'Activity Logs',
      icon: 'ri-history-line',
      href: '/admin/logs'
    },
    {
      id: 'organization',
      label: 'Organization',
      icon: 'ri-building-line',
      href: '/admin/organization'
    },
    {
      id: 'system',
      label: 'System Config',
      icon: 'ri-settings-3-line',
      children: [
        { id: 'templates', label: 'Default Templates', href: '/admin/system/templates' },
        { id: 'schedules', label: 'Schedules', href: '/admin/system/schedules' }
      ]
    },
    {
      id: 'registrar',
      label: 'Academic Records',
      icon: 'ri-graduation-cap-line',
      children: [
        { id: 'enrollment', label: 'Enrollment Data', href: '/admin/registrar/enrollment' },
        { id: 'graduates', label: 'Graduate Data', href: '/admin/registrar/graduates' },
        { id: 'loa', label: 'LOA Statistics', href: '/admin/registrar/loa' },
        { id: 'dropouts', label: 'Dropout Analytics', href: '/admin/registrar/dropouts' }
      ]
    },
    {
      id: 'procurement',
      label: 'Procurement',
      icon: 'ri-shopping-cart-line',
      children: [
        { id: 'forms', label: 'Form Templates', href: '/admin/procurement/forms' },
        { id: 'app', label: 'Annual Plan', href: '/admin/procurement/app' },
        { id: 'status', label: 'Status Tracking', href: '/admin/procurement/status' }
      ]
    },
    {
      id: 'operations',
      label: 'Operations',
      icon: 'ri-tools-line',
      children: [
        { id: 'supply-chain', label: 'Supply Chain', href: '/admin/operations/supply' },
        { id: 'hr-management', label: 'HR Management', href: '/admin/operations/hr' }
      ]
    }
  ];

  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard']);

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
                    <h2 className="text-lg font-bold text-gray-800">Admin Panel</h2>
                    <p className="text-xs text-green-600">CSMS Control Center</p>
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
                <h1 className="text-2xl font-bold text-gray-800">Administrator Dashboard</h1>
                <p className="text-sm text-gray-600">Centralized School Management System</p>
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


'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DashboardOverview() {
  const [timeRange, setTimeRange] = useState('30d');

  const stats = [
    {
      title: 'Total Proposals',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: 'ri-file-text-line',
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: '89',
      change: '+3%',
      changeType: 'positive',
      icon: 'ri-user-line',
      color: 'green'
    },
    {
      title: 'Budget Allocated',
      value: '₱2.4M',
      change: '+8%',
      changeType: 'positive',
      icon: 'ri-money-dollar-circle-line',
      color: 'yellow'
    },
    {
      title: 'Pending Approvals',
      value: '23',
      change: '-5%',
      changeType: 'negative',
      icon: 'ri-time-line',
      color: 'red'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'proposal',
      user: 'Dr. Elena Rodriguez',
      action: 'submitted a new research proposal',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'budget',
      user: 'Admin System',
      action: 'approved BED No.2 consolidated report',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'user',
      user: 'Prof. Michael Chen',
      action: 'updated profile information',
      time: '6 hours ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'procurement',
      user: 'Procurement Office',
      action: 'created new APP template',
      time: '1 day ago',
      status: 'completed'
    }
  ];

  const quickActions = [
    {
      title: 'Create Proposal',
      description: 'Start a new project proposal',
      icon: 'ri-add-circle-line',
      href: '/admin/proposals/create',
      color: 'green'
    },
    {
      title: 'Add User',
      description: 'Register new system user',
      icon: 'ri-user-add-line',
      href: '/admin/users/add',
      color: 'blue'
    },
    {
      title: 'Generate Report',
      description: 'Create system reports',
      icon: 'ri-file-chart-line',
      href: '/admin/reports',
      color: 'purple'
    },
    {
      title: 'System Settings',
      description: 'Configure system parameters',
      icon: 'ri-settings-3-line',
      href: '/admin/system/settings',
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <i className={`${stat.icon} text-xl text-${stat.color}-600`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
              </select>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'proposal' ? 'bg-blue-100' : activity.type === 'budget' ? 'bg-green-100' : activity.type === 'user' ? 'bg-purple-100' : 'bg-orange-100'}`}>
                    <i className={`${activity.type === 'proposal' ? 'ri-file-text-line text-blue-600' : activity.type === 'budget' ? 'ri-money-dollar-circle-line text-green-600' : activity.type === 'user' ? 'ri-user-line text-purple-600' : 'ri-shopping-cart-line text-orange-600'}`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer group block"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 bg-${action.color}-100 rounded-lg flex items-center justify-center group-hover:bg-${action.color}-200 transition-colors`}>
                      <i className={`${action.icon} text-lg text-${action.color}-600`}></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">{action.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <i className="ri-server-line text-2xl text-green-600"></i>
              </div>
              <h4 className="font-medium text-gray-900 mt-3">Server Status</h4>
              <div className="flex items-center justify-center mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-600">Online</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <i className="ri-database-2-line text-2xl text-blue-600"></i>
              </div>
              <h4 className="font-medium text-gray-900 mt-3">Database</h4>
              <div className="flex items-center justify-center mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-600">Connected</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <i className="ri-shield-check-line text-2xl text-purple-600"></i>
              </div>
              <h4 className="font-medium text-gray-900 mt-3">Security</h4>
              <div className="flex items-center justify-center mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-600">Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

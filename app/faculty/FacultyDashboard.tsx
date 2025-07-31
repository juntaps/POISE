'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FacultyDashboard() {
  const [timeRange, setTimeRange] = useState('30d');

  const stats = [
    {
      title: 'My Proposals',
      value: '8',
      change: '+2 new',
      changeType: 'positive',
      icon: 'ri-file-text-line',
      color: 'blue',
      href: '/faculty/proposals/my'
    },
    {
      title: 'BED No.2 Records',
      value: '15',
      change: '+3 pending',
      changeType: 'neutral',
      icon: 'ri-file-chart-line',
      color: 'green',
      href: '/faculty/bed2/view'
    },
    {
      title: 'BAR No.1 Records',
      value: '12',
      change: '+1 this month',
      changeType: 'positive',
      icon: 'ri-bar-chart-line',
      color: 'yellow',
      href: '/faculty/bar1/view'
    },
    {
      title: 'COPC Documents',
      value: '24',
      change: 'Accessible',
      changeType: 'neutral',
      icon: 'ri-folder-line',
      color: 'purple',
      href: '/faculty/copc'
    }
  ];

  const recentProposals = [
    {
      id: 1,
      title: 'Research on Renewable Energy Systems',
      status: 'Under Review',
      statusColor: 'yellow',
      dateSubmitted: '2024-01-10',
      department: 'Engineering',
      budget: '₱250,000'
    },
    {
      id: 2,
      title: 'Community Extension Program 2024',
      status: 'Approved',
      statusColor: 'green',
      dateSubmitted: '2024-01-05',
      department: 'Engineering',
      budget: '₱180,000'
    },
    {
      id: 3,
      title: 'Laboratory Equipment Upgrade',
      status: 'Pending Revision',
      statusColor: 'red',
      dateSubmitted: '2023-12-28',
      department: 'Engineering',
      budget: '₱500,000'
    },
    {
      id: 4,
      title: 'Student Research Mentorship Program',
      status: 'Draft',
      statusColor: 'gray',
      dateSubmitted: '2024-01-12',
      department: 'Engineering',
      budget: '₱75,000'
    }
  ];

  const quickActions = [
    {
      title: 'Create New Proposal',
      description: 'Start a new project proposal',
      icon: 'ri-add-circle-line',
      href: '/faculty/proposals/create',
      color: 'green'
    },
    {
      title: 'Add BED No.2 Record',
      description: 'Submit new BED record',
      icon: 'ri-file-add-line',
      href: '/faculty/bed2/add',
      color: 'blue'
    },
    {
      title: 'Add BAR No.1 Record',
      description: 'Create BAR record entry',
      icon: 'ri-bar-chart-box-line',
      href: '/faculty/bar1/add',
      color: 'orange'
    },
    {
      title: 'View COPC Documents',
      description: 'Access document library',
      icon: 'ri-folder-open-line',
      href: '/faculty/copc',
      color: 'purple'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'under review': return 'bg-yellow-100 text-yellow-800';
      case 'pending revision': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-yellow-500 rounded-xl shadow-sm text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome to Faculty Portal</h1>
            <p className="text-green-100">Manage your proposals, records, and documents efficiently</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <i className="ri-user-star-line text-3xl text-white"></i>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.href} className="block">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <i className={`${stat.icon} text-xl text-${stat.color}-600`}></i>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Proposals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">My Recent Proposals</h3>
              <Link href="/faculty/proposals/my" className="text-sm text-green-600 hover:text-green-700 font-medium cursor-pointer">
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentProposals.map((proposal) => (
                <div key={proposal.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">{proposal.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Budget: {proposal.budget}</span>
                        <span>•</span>
                        <span>{proposal.dateSubmitted}</span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
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
            <div className="grid grid-cols-1 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer group block"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-${action.color}-100 rounded-lg flex items-center justify-center group-hover:bg-${action.color}-200 transition-colors`}>
                      <i className={`${action.icon} text-lg text-${action.color}-600`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <i className="ri-arrow-right-line text-gray-400 group-hover:text-green-600 transition-colors"></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
            </select>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="ri-file-text-line text-blue-600"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Proposal submitted</span> - Research on Renewable Energy Systems
                </p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-file-chart-line text-green-600"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">BED No.2 record updated</span> - Q4 2023 Budget Report
                </p>
                <p className="text-xs text-gray-500 mt-1">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="ri-folder-line text-purple-600"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">COPC document accessed</span> - Strategic Plan 2024
                </p>
                <p className="text-xs text-gray-500 mt-1">3 days ago</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/faculty/logs" className="text-sm text-green-600 hover:text-green-700 font-medium cursor-pointer">
              View All Activity Logs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
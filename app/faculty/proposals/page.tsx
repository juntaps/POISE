
'use client';

import { useState } from 'react';
import FacultyLayout from '../FacultyLayout';
import Link from 'next/link';

export default function ProposalsDashboardPage() {
  const [user] = useState({
    name: 'Prof. Elena Rodriguez',
    role: 'Faculty Member',
    department: 'College of Engineering and Technology',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20professor%20in%20academic%20setting%2C%20laboratory%20background%2C%20confident%20expression&width=100&height=100&seq=faculty001&orientation=squarish'
  });

  return (
    <FacultyLayout user={user}>
      <ProposalsDashboard />
    </FacultyLayout>
  );
}

function ProposalsDashboard() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [timeRange, setTimeRange] = useState('current');

  const proposalStats = [
    {
      title: 'Total Proposals',
      value: '8',
      icon: 'ri-file-text-line',
      color: 'blue'
    },
    {
      title: 'Approved',
      value: '3',
      icon: 'ri-check-circle-line',
      color: 'green'
    },
    {
      title: 'Under Review',
      value: '2',
      icon: 'ri-time-line',
      color: 'yellow'
    },
    {
      title: 'Draft',
      value: '3',
      icon: 'ri-draft-line',
      color: 'gray'
    }
  ];

  const proposals = [
    {
      id: 1,
      title: 'Research on Renewable Energy Systems',
      category: 'Research',
      status: 'Under Review',
      dateSubmitted: '2024-01-10',
      budget: '₱250,000',
      reviewer: 'Dr. Santos',
      progress: 65
    },
    {
      id: 2,
      title: 'Community Extension Program 2024',
      category: 'Extension',
      status: 'Approved',
      dateSubmitted: '2024-01-05',
      budget: '₱180,000',
      reviewer: 'Prof. Chen',
      progress: 100
    },
    {
      id: 3,
      title: 'Laboratory Equipment Upgrade',
      category: 'Infrastructure',
      status: 'Pending Revision',
      dateSubmitted: '2023-12-28',
      budget: '₱500,000',
      reviewer: 'Dr. Martinez',
      progress: 30
    },
    {
      id: 4,
      title: 'Student Research Mentorship Program',
      category: 'Academic',
      status: 'Draft',
      dateSubmitted: '2024-01-12',
      budget: '₱75,000',
      reviewer: '-',
      progress: 15
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

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'research': return 'bg-blue-100 text-blue-800';
      case 'extension': return 'bg-purple-100 text-purple-800';
      case 'infrastructure': return 'bg-orange-100 text-orange-800';
      case 'academic': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    if (filterStatus === 'all') return true;
    return proposal.status.toLowerCase().replace(' ', '-') === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Proposals Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage and track your project proposals</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm pr-8"
            >
              <option value="current">Current Year</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="all">All Time</option>
            </select>
            <Link
              href="/faculty/proposals/create"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              New Proposal
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {proposalStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <i className={`${stat.icon} text-xl text-${stat.color}-600`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Proposals List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">My Proposals ({filteredProposals.length})</h3>
            <div className="flex items-center space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm pr-8"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="pending-revision">Pending Revision</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposal</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewer</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProposals.map((proposal) => (
                <tr key={proposal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{proposal.title}</div>
                      <div className="text-sm text-gray-500">Submitted: {proposal.dateSubmitted}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(proposal.category)}`}>
                      {proposal.category}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {proposal.budget}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${proposal.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{proposal.progress}%</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {proposal.reviewer}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                        <i className="ri-eye-line text-blue-600"></i>
                      </button>
                      <Link
                        href={`/faculty/proposals/edit/${proposal.id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
                      >
                        <i className="ri-edit-line text-green-600"></i>
                      </Link>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <i className="ri-download-line text-gray-600"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProposals.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-file-search-line text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
            <p className="text-gray-500 mb-4">You haven't created any proposals yet or none match your filter.</p>
            <Link
              href="/faculty/proposals/create"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Create Your First Proposal
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

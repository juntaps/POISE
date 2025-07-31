
'use client';

import { useState, useEffect } from 'react';
import FacultyLayout from '../../FacultyLayout';
import Link from 'next/link';

export default function MyProposalsPage() {
  const [user] = useState({
    name: 'Prof. Elena Rodriguez',
    role: 'Faculty Member',
    department: 'College of Engineering and Technology',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20professor%20in%20academic%20setting%2C%20laboratory%20background%2C%20confident%20expression&width=100&height=100&seq=faculty001&orientation=squarish'
  });

  return (
    <FacultyLayout user={user}>
      <MyProposalsContent />
    </FacultyLayout>
  );
}

function MyProposalsContent() {
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [proposals, setProposals] = useState<any[]>([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const userProposals = JSON.parse(localStorage.getItem('userProposals') || '[]');

    const defaultProposals = [
      {
        id: 1,
        title: 'Research on Renewable Energy Systems',
        category: 'Research',
        status: 'Under Review',
        statusColor: 'yellow',
        dateSubmitted: '2024-01-10',
        dateUpdated: '2024-01-12',
        budget: '₱250,000',
        reviewer: 'Dr. Maria Santos',
        reviewerEmail: 'm.santos@pit.edu.ph',
        progress: 65,
        description: 'A comprehensive study on renewable energy implementation in rural areas of the Philippines.',
        comments: [
          {
            id: 1,
            author: 'Dr. Maria Santos',
            date: '2024-01-12',
            message: 'The proposal looks promising. Please provide more details on the implementation timeline.',
            type: 'reviewer'
          }
        ],
        attachments: [
          { name: 'proposal_document.pdf', size: '2.5 MB', type: 'pdf' },
          { name: 'budget_breakdown.xlsx', size: '1.2 MB', type: 'excel' }
        ]
      },
      {
        id: 2,
        title: 'Community Extension Program 2024',
        category: 'Extension',
        status: 'Approved',
        statusColor: 'green',
        dateSubmitted: '2024-01-05',
        dateUpdated: '2024-01-08',
        budget: '₱180,000',
        reviewer: 'Prof. Michael Chen',
        reviewerEmail: 'm.chen@pit.edu.ph',
        progress: 100,
        description: 'Community outreach program focusing on digital literacy for senior citizens.',
        comments: [
          {
            id: 1,
            author: 'Prof. Michael Chen',
            date: '2024-01-08',
            message: 'Excellent proposal! Approved for implementation. Budget allocated successfully.',
            type: 'reviewer'
          }
        ],
        attachments: [
          { name: 'extension_proposal.pdf', size: '3.1 MB', type: 'pdf' },
          { name: 'community_survey.pdf', size: '800 KB', type: 'pdf' }
        ]
      },
      {
        id: 3,
        title: 'Laboratory Equipment Upgrade',
        category: 'Infrastructure',
        status: 'Pending Revision',
        statusColor: 'red',
        dateSubmitted: '2023-12-28',
        dateUpdated: '2024-01-03',
        budget: '₱500,000',
        reviewer: 'Dr. Robert Martinez',
        reviewerEmail: 'r.martinez@pit.edu.ph',
        progress: 30,
        description: 'Upgrade of laboratory equipment for the Electronics and Communications Engineering department.',
        comments: [
          {
            id: 1,
            author: 'Dr. Robert Martinez',
            date: '2024-01-03',
            message: 'Please revise the budget allocation and provide vendor quotations for the equipment.',
            type: 'reviewer'
          }
        ],
        attachments: [
          { name: 'equipment_specs.pdf', size: '4.2 MB', type: 'pdf' }
        ]
      },
      {
        id: 4,
        title: 'Student Research Mentorship Program',
        category: 'Academic',
        status: 'Draft',
        statusColor: 'gray',
        dateSubmitted: '2024-01-12',
        dateUpdated: '2024-01-12',
        budget: '₱75,000',
        reviewer: '-',
        reviewerEmail: '',
        progress: 15,
        description: 'Mentorship program to guide undergraduate students in research methodologies.',
        comments: [],
        attachments: [
          { name: 'draft_proposal.docx', size: '1.5 MB', type: 'word' }
        ]
      },
      {
        id: 5,
        title: 'Green Campus Initiative',
        category: 'Sustainability',
        status: 'Under Review',
        statusColor: 'yellow',
        dateSubmitted: '2023-12-15',
        dateUpdated: '2023-12-20',
        budget: '₱320,000',
        reviewer: 'Dr. Lisa Thompson',
        reviewerEmail: 'l.thompson@pit.edu.ph',
        progress: 80,
        description: 'Initiative to implement sustainable practices across the campus.',
        comments: [
          {
            id: 1,
            author: 'Dr. Lisa Thompson',
            date: '2023-12-20',
            message: 'Great initiative! Please include waste management metrics in your proposal.',
            type: 'reviewer'
          }
        ],
        attachments: [
          { name: 'sustainability_plan.pdf', size: '2.8 MB', type: 'pdf' },
          { name: 'cost_analysis.xlsx', size: '1.1 MB', type: 'excel' }
        ]
      },
      {
        id: 6,
        title: 'AI in Education Workshop Series',
        category: 'Professional Development',
        status: 'Approved',
        statusColor: 'green',
        dateSubmitted: '2023-11-28',
        dateUpdated: '2023-12-05',
        budget: '₱95,000',
        reviewer: 'Prof. Sarah Johnson',
        reviewerEmail: 's.johnson@pit.edu.ph',
        progress: 100,
        description: 'Workshop series to train faculty on integrating AI tools in education.',
        comments: [
          {
            id: 1,
            author: 'Prof. Sarah Johnson',
            date: '2023-12-05',
            message: 'Approved! This aligns perfectly with our digital transformation goals.',
            type: 'reviewer'
          }
        ],
        attachments: [
          { name: 'workshop_curriculum.pdf', size: '1.9 MB', type: 'pdf' }
        ]
      }
    ];

    const allProposals = [...userProposals, ...defaultProposals];

    setProposals(allProposals);

    const handleStorageChange = () => {
      const updatedUserProposals = JSON.parse(localStorage.getItem('userProposals') || '[]');
      const updatedAllProposals = [...updatedUserProposals, ...defaultProposals];
      setProposals(updatedAllProposals);
    };

    window.addEventListener('storage', handleStorageChange);

    const intervalId = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const generateProposalsSummaryPDF = async () => {
    setIsGeneratingPDF(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const fileName = `My_Proposals_Summary_${new Date().toISOString().split('T')[0]}.pdf`;

      const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj

2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj

3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792]
   /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> 
   /Contents 6 0 R >>
endobj

4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj

5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj

6 0 obj
<< /Length 3500 >>
stream
BT
/F1 16 Tf
50 750 Td
(PALOMPON INSTITUTE OF TECHNOLOGY) Tj
0 -18 Td
(Office of Institute Project Planning and Development) Tj
0 -18 Td
(My Proposals Summary Report) Tj

/F2 12 Tf
0 -25 Td
(📅 Generated on: ${currentDate}) Tj

0 -30 Td
(Faculty Name: Prof. Elena Rodriguez) Tj
0 -15 Td
(Department: College of Engineering and Technology) Tj

/F1 12 Tf
0 -40 Td
(PROPOSALS TABULATED REPORT) Tj

/F2 10 Tf
0 -20 Td
(Total Proposals: ${proposals.length}) Tj
0 -12 Td
(✅ Approved: ${proposals.filter(p => p.status === 'Approved').length}) Tj
0 -12 Td
(📋 Under Review: ${proposals.filter(p => p.status === 'Under Review').length}) Tj
0 -12 Td
(🔄 Pending Revision: ${proposals.filter(p => p.status === 'Pending Revision').length}) Tj
0 -12 Td
(📝 Draft: ${proposals.filter(p => p.status === 'Draft').length}) Tj

/F1 10 Tf
0 -35 Td
(╭─────┬──────────────────────────────────┬─────────────┬─────────────┬──────────────┬──────────────╮) Tj
0 -12 Td
(│ No. │           PROPOSAL TITLE         │    TYPE     │   STATUS    │    BUDGET    │     DATE     │) Tj
0 -12 Td
(├─────┼──────────────────────────────────┼─────────────┼─────────────┼──────────────┼──────────────┤) Tj

/F2 9 Tf
${proposals.map((proposal, index) => {
  const truncatedTitle = proposal.title.length > 25 ? proposal.title.substring(0, 25) + '...' : proposal.title;
  const statusIcon = proposal.status === 'Approved' ? '✅' : 
                    proposal.status === 'Under Review' ? '📋' : 
                    proposal.status === 'Pending Revision' ? '🔄' : '📝';
  return `
0 -12 Td
(│ ${String(index + 1).padEnd(3)} │ ${truncatedTitle.padEnd(32)} │ ${proposal.category.substring(0, 10).padEnd(11)} │ ${statusIcon} ${proposal.status.padEnd(9)} │ ${proposal.budget.padEnd(12)} │ ${new Date(proposal.dateSubmitted).toLocaleDateString().padEnd(12)} │) Tj`;
}).join('')}

/F1 10 Tf
0 -12 Td
(╰─────┴──────────────────────────────────┴─────────────┴─────────────┴──────────────┴──────────────╯) Tj

/F2 10 Tf
0 -30 Td
(SUMMARY BY STATUS:) Tj
0 -15 Td
(┌──────────────────┬───────┬─────────────────────────┐) Tj
0 -12 Td
(│      STATUS      │ COUNT │      PERCENTAGE         │) Tj
0 -12 Td
(├──────────────────┼───────┼─────────────────────────┤) Tj
0 -12 Td
(│ ✅ Approved       │  ${String(proposals.filter(p => p.status === 'Approved').length).padStart(3)}  │ ${String(Math.round((proposals.filter(p => p.status === 'Approved').length / proposals.length) * 100)).padStart(3)}%                    │) Tj
0 -12 Td
(│ 📋 Under Review   │  ${String(proposals.filter(p => p.status === 'Under Review').length).padStart(3)}  │ ${String(Math.round((proposals.filter(p => p.status === 'Under Review').length / proposals.length) * 100)).padStart(3)}%                    │) Tj
0 -12 Td
(│ 🔄 Pending Rev.   │  ${String(proposals.filter(p => p.status === 'Pending Revision').length).padStart(3)}  │ ${String(Math.round((proposals.filter(p => p.status === 'Pending Revision').length / proposals.length) * 100)).padStart(3)}%                    │) Tj
0 -12 Td
(│ 📝 Draft          │  ${String(proposals.filter(p => p.status === 'Draft').length).padStart(3)}  │ ${String(Math.round((proposals.filter(p => p.status === 'Draft').length / proposals.length) * 100)).padStart(3)}%                    │) Tj
0 -12 Td
(└──────────────────┴───────┴─────────────────────────┘) Tj

0 -30 Td
(BUDGET ANALYSIS:) Tj
0 -15 Td
(┌─────────────────────┬──────────────────┐) Tj
0 -12 Td
(│     CATEGORY        │   TOTAL BUDGET   │) Tj
0 -12 Td
(├─────────────────────┼──────────────────┤) Tj
${[...new Set(proposals.map(p => p.category))].map(category => {
  const categoryProposals = proposals.filter(p => p.category === category);
  const totalBudget = categoryProposals.reduce((sum, p) => {
    const amount = parseInt(p.budget.replace(/[₱,]/g, ''));
    return sum + amount;
  }, 0);
  return `
0 -12 Td
(│ ${category.padEnd(19)} │ ₱${totalBudget.toLocaleString().padStart(14)} │) Tj`;
}).join('')}
0 -12 Td
(└─────────────────────┴──────────────────┘) Tj

0 -40 Td
(This tabulated report was generated from the PIT Faculty Portal.) Tj
0 -15 Td
(For detailed proposal information, please access the online system.) Tj

ET
endstream
endobj

xref
0 7
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000110 00000 n 
0000000251 00000 n 
0000000318 00000 n 
0000000381 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
3935
%%EOF
`;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'under review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending revision':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'research':
        return 'bg-blue-100 text-blue-800';
      case 'extension':
        return 'bg-purple-100 text-purple-800';
      case 'infrastructure':
        return 'bg-orange-100 text-orange-800';
      case 'academic':
        return 'bg-green-100 text-green-800';
      case 'sustainability':
        return 'bg-emerald-100 text-emerald-800';
      case 'professional development':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    if (filterStatus === 'all') return true;
    return proposal.status.toLowerCase().replace(' ', '-').includes(filterStatus);
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime();
    }
    if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const statusCounts = {
    all: proposals.length,
    draft: proposals.filter(p => p.status === 'Draft').length,
    'under-review': proposals.filter(p => p.status === 'Under Review').length,
    approved: proposals.filter(p => p.status === 'Approved').length,
    'pending-revision': proposals.filter(p => p.status === 'Pending Revision').length,
  };

  if (selectedProposal) {
    return <ProposalDetailsView proposal={selectedProposal} onBack={() => setSelectedProposal(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Proposals</h1>
            <p className="text-gray-600 mt-1">Track and manage all your submitted proposals with detailed status information</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* View Type Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewType('grid')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  viewType === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ri-grid-line mr-1"></i>
                Grid
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  viewType === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ri-list-check-2 mr-1"></i>
                List
              </button>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm pr-8"
            >
              <option value="date">Sort by Date</option>
              <option value="status">Sort by Status</option>
              <option value="title">Sort by Title</option>
            </select>
            <button
              onClick={generateProposalsSummaryPDF}
              disabled={isGeneratingPDF || proposals.length === 0}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                <>
                  <i className="ri-download-line mr-2"></i>
                  Download PDF
                </>
              )}
            </button>
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

      {/* Status Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          {[{
            key: 'all',
            label: 'All Proposals',
            count: statusCounts.all
          },
          {
            key: 'draft',
            label: 'Draft',
            count: statusCounts.draft
          },
          {
            key: 'under-review',
            label: 'Under Review',
            count: statusCounts['under-review']
          },
          {
            key: 'approved',
            label: 'Approved',
            count: statusCounts.approved
          },
          {
            key: 'pending-revision',
            label: 'Pending Revision',
            count: statusCounts['pending-revision']
          }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setFilterStatus(filter.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filterStatus === filter.key
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Proposals Display */}
      {viewType === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProposals.map((proposal) => (
            <div key={proposal.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Proposal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{proposal.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{proposal.description}</p>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(proposal.category)}`}>
                        {proposal.category}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(proposal.status)}`}>
                        {proposal.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proposal Info */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Budget</p>
                    <p className="text-sm font-semibold text-gray-900">{proposal.budget}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Submitted</p>
                    <p className="text-sm text-gray-900">{new Date(proposal.dateSubmitted).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Progress</p>
                    <span className="text-sm text-gray-600">{proposal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        proposal.status === 'Approved'
                          ? 'bg-green-600'
                          : proposal.status === 'Under Review'
                            ? 'bg-yellow-500'
                            : proposal.status === 'Pending Revision'
                              ? 'bg-red-500'
                              : 'bg-gray-400'
                      }`}
                      style={{ width: `${proposal.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Reviewer Info */}
                {proposal.reviewer !== '-' && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Reviewer</p>
                    <p className="text-sm text-gray-900">{proposal.reviewer}</p>
                  </div>
                )}

                {/* Recent Comment */}
                {proposal.comments.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-500 mb-1">Latest Comment</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{proposal.comments[proposal.comments.length - 1].message}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-xs text-gray-500">
                      <i className="ri-attachment-line mr-1"></i>
                      {proposal.attachments.length} files
                    </div>
                    {proposal.comments.length > 0 && (
                      <div className="flex items-center text-xs text-gray-500">
                        <i className="ri-chat-3-line mr-1"></i>
                        {proposal.comments.length} comments
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedProposal(proposal)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm cursor-pointer whitespace-nowrap"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposal</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProposals.map((proposal) => (
                  <tr key={proposal.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="max-w-sm">
                        <div className="text-sm font-medium text-gray-900 truncate">{proposal.title}</div>
                        <div className="text-sm text-gray-500">Submitted: {new Date(proposal.dateSubmitted).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(proposal.category)}`}>
                        {proposal.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(proposal.status)}`}>
                        {proposal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {proposal.budget}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              proposal.status === 'Approved'
                                ? 'bg-green-600'
                                : proposal.status === 'Under Review'
                                  ? 'bg-yellow-500'
                                  : proposal.status === 'Pending Revision'
                                    ? 'bg-red-500'
                                    : 'bg-gray-400'
                            }`}
                            style={{ width: `${proposal.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 min-w-0">{proposal.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {proposal.reviewer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedProposal(proposal)}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-eye-line mr-1"></i>
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredProposals.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 text-center py-12">
          <i className="ri-file-search-line text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
          <p className="text-gray-500 mb-4">
            {filterStatus === 'all'
              ? "You haven't created any proposals yet."
              : `No proposals found with status "${filterStatus.replace('-', ' ')}".`
            }
          </p>
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
  );
}

function ProposalDetailsView({ proposal, onBack }: { proposal: any; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('details');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleFileDownload = (file: any) => {
    let fileContent = '';
    let mimeType = 'application/octet-stream';

    switch (file.type) {
      case 'pdf':
        fileContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj

2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj

3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792]
   /Resources << /Font << /F1 4 0 R >> >> 
   /Contents 5 0 R >>
endobj

4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj

5 0 obj
<< /Length 200 >>
stream
BT
/F1 12 Tf
50 750 Td
(${file.name}) Tj
0 -20 Td
(This is a sample document from the POISE system.) Tj
0 -20 Td
(Generated on: ${new Date().toLocaleDateString()}) Tj
0 -20 Td
(Proposal: ${proposal.title}) Tj
ET
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000110 00000 n 
0000000251 00000 n 
0000000318 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
500
%%EOF`;
        mimeType = 'application/pdf';
        break;

      case 'word':
        fileContent = `${file.name}\n\nDocument Title: ${proposal.title}\nCategory: ${proposal.category}\nStatus: ${proposal.status}\nDate: ${new Date().toLocaleDateString()}\n\nThis is a sample document content from the POISE Faculty Portal system.\n\nProposal Description:\n${proposal.description}\n\nBudget: ${proposal.budget}\nReviewer: ${proposal.reviewer}\n\nGenerated from POISE System\nPalompon Institute of Technology`;
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;

      case 'excel':
        fileContent = `Proposal Information,Value\nTitle,"${proposal.title}"\nCategory,"${proposal.category}"\nStatus,"${proposal.status}"\nBudget,"${proposal.budget}"\nDate Submitted,"${new Date(proposal.dateSubmitted).toLocaleDateString()}"\nReviewer,"${proposal.reviewer}"\nProgress,"${proposal.progress}%"\nDescription,"${proposal.description}"\n\nGenerated from POISE System,${new Date().toLocaleDateString()}`;
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;

      default:
        fileContent = `${file.name}\n\nThis is a sample document from the POISE Faculty Portal.\nProposal: ${proposal.title}\nGenerated on: ${new Date().toLocaleDateString()}`;
        mimeType = 'text/plain';
    }

    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    const downloadMessage = document.createElement('div');
    downloadMessage.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    downloadMessage.innerHTML = `
      <div class="flex items-center space-x-2">
        <i class="ri-download-line"></i>
        <span>Downloaded: ${file.name}</span>
      </div>
    `;

    document.body.appendChild(downloadMessage);

    setTimeout(() => {
      if (document.body.contains(downloadMessage)) {
        document.body.removeChild(downloadMessage);
      }
    }, 3000);
  };

  const generateSingleProposalPDF = async () => {
    setIsGeneratingPDF(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const fileName = `${proposal.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_proposal.pdf`;

      const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj

2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj

3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792]
   /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> 
   /Contents 6 0 R >>
endobj

4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj

5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj

6 0 obj
<< /Length 3500 >>
stream
BT
/F1 16 Tf
50 750 Td
(PALOMPON INSTITUTE OF TECHNOLOGY) Tj
0 -18 Td
(Office of Institute Project Planning and Development) Tj
0 -18 Td
(Proposal Details Report) Tj

/F2 12 Tf
0 -25 Td
(📅 Generated on: ${currentDate}) Tj

/F1 12 Tf
0 -40 Td
(┌─────────────────────────┬─────────────────────────────────────────────────────────┐) Tj
0 -12 Td
(│         SECTION         │                        DETAILS                          │) Tj
0 -12 Td
(├─────────────────────────┼─────────────────────────────────────────────────────────┤) Tj

/F2 10 Tf
0 -12 Td
(│ Faculty Name            │ Prof. Elena Rodriguez                                   │) Tj
0 -12 Td
(│ Department              │ College of Engineering and Technology                   │) Tj
0 -12 Td
(├─────────────────────────┼─────────────────────────────────────────────────────────┤) Tj
0 -12 Td
(│ Proposal Title          │ ${proposal.title.length > 40 ? proposal.title.substring(0, 40) + '...' : proposal.title.padEnd(43)} │) Tj
0 -12 Td
(│ Type / Category         │ ${proposal.category.padEnd(43)} │) Tj
0 -12 Td
(│ Status                  │ ${proposal.status === 'Approved' ? '✔ ' : ''}${proposal.status.padEnd(40)} │) Tj
0 -12 Td
(│ Total Budget            │ ${proposal.budget.padEnd(43)} │) Tj
0 -12 Td
(│ Date Submitted          │ ${new Date(proposal.dateSubmitted).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).padEnd(43)} │) Tj
0 -12 Td
(│ Last Updated            │ ${new Date(proposal.dateUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).padEnd(43)} │) Tj
0 -12 Td
(│ Project Progress        │ ${proposal.progress}%${String(proposal.progress + '%').padEnd(40)} │) Tj
0 -12 Td
(│ Reviewer                │ ${proposal.reviewer.padEnd(43)} │) Tj
0 -12 Td
(├─────────────────────────┼─────────────────────────────────────────────────────────┤) Tj

0 -12 Td
(│ Project Description     │ ${proposal.description.length > 40 ? proposal.description.substring(0, 40) + '...' : proposal.description.padEnd(43)} │) Tj
${proposal.description.length > 40 ? 
  proposal.description.substring(40, 120).match(/.{1,43}/g)?.map(line => 
    `0 -12 Td
(│                         │ ${line.padEnd(43)} │) Tj`
  ).join('') || '' : ''}

0 -12 Td
(├─────────────────────────┼─────────────────────────────────────────────────────────┤) Tj
0 -12 Td
(│ Attachments             │ ${proposal.attachments.length > 0 ? 
  `${proposal.attachments.length}. ${proposal.attachments[0].name.length > 25 ? proposal.attachments[0].name.substring(0, 25) + '...' : proposal.attachments[0].name} (${proposal.attachments[0].size})`.padEnd(43) :
  'No attachments available'.padEnd(43)} │) Tj
${proposal.attachments.slice(1).map((attachment, index) => 
  `0 -12 Td
(│                         │ ${(index + 2)}. ${attachment.name.length > 25 ? attachment.name.substring(0, 25) + '...' : attachment.name} (${attachment.size})${String(`${index + 2}. ${attachment.name.length > 25 ? attachment.name.substring(0, 25) + '...' : attachment.name} (${attachment.size})`).padEnd(43).substring(0, 43)} │) Tj`
).join('')}

0 -12 Td
(├─────────────────────────┼─────────────────────────────────────────────────────────┤) Tj
0 -12 Td
(│ Comments History        │ ${proposal.comments.length > 0 ? 
  `Reviewer: ${proposal.comments[0].author}`.padEnd(43) :
  'No comments available'.padEnd(43)} │) Tj
${proposal.comments.length > 0 ? `
0 -12 Td
(│                         │ Date: ${proposal.comments[0].date}${String(`Date: ${proposal.comments[0].date}`).padEnd(43).substring(0, 43)} │) Tj
0 -12 Td
(│                         │ Comment: "${proposal.comments[0].message.length > 35 ? proposal.comments[0].message.substring(0, 35) + '...' : proposal.comments[0].message}"${String(`Comment: "${proposal.comments[0].message.length > 35 ? proposal.comments[0].message.substring(0, 35) + '...' : proposal.comments[0].message}"`).padEnd(43).substring(0, 43)} │) Tj` : ''}

/F1 10 Tf
0 -12 Td
(└─────────────────────────┴─────────────────────────────────────────────────────────┘) Tj

/F2 10 Tf
0 -30 Td
(PROPOSAL TIMELINE TABLE:) Tj
0 -15 Td
(┌─────────────────────────┬─────────────────────────┬──────────────┐) Tj
0 -12 Td
(│         EVENT           │          DATE           │    STATUS    │) Tj
0 -12 Td
(├─────────────────────────┼─────────────────────────┼──────────────┤) Tj
0 -12 Td
(│ Proposal Submitted      │ ${new Date(proposal.dateSubmitted).toLocaleDateString().padEnd(23)} │ ✅ Completed │) Tj
0 -12 Td
(│ Last Updated            │ ${new Date(proposal.dateUpdated).toLocaleDateString().padEnd(23)} │ ✅ Completed │) Tj
0 -12 Td
(│ Review Status           │ Current                 │ ${proposal.status === 'Approved' ? '✅' : proposal.status === 'Under Review' ? '📋' : proposal.status === 'Pending Revision' ? '🔄' : '📝'} ${proposal.status.padEnd(8)} │) Tj
0 -12 Td
(└─────────────────────────┴─────────────────────────┴──────────────┘) Tj

0 -40 Td
(This detailed tabulated report was generated from the PIT Faculty Portal.) Tj
0 -15 Td
(For complete information and latest updates, please access the online system.) Tj

ET
endstream
endobj

xref
0 7
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000110 00000 n 
0000000251 00000 n 
0000000318 00000 n 
0000000381 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
3935
%%EOF
`;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'under review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending revision':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line text-gray-600"></i>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{proposal.title}</h1>
              <div className="flex items-center space-x-3 mt-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(proposal.status)}`}>
                  {proposal.status}
                </span>
                <span className="text-sm text-gray-500">Submitted: {new Date(proposal.dateSubmitted).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={generateSingleProposalPDF}
              disabled={isGeneratingPDF}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                <>
                  <i className="ri-download-line mr-2"></i>
                  Download PDF
                </>
              )}
            </button>
            {proposal.status === 'Draft' && (
              <Link
                href={`/faculty/proposals/edit/${proposal.id}`}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-edit-line mr-2"></i>
                Edit Proposal
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[{
              id: 'details',
              label: 'Details',
              icon: 'ri-file-text-line'
            },
            {
              id: 'comments',
              label: `Comments (${proposal.comments.length})`,
              icon: 'ri-chat-3-line'
            },
            {
              id: 'attachments',
              label: `Attachments (${proposal.attachments.length})`,
              icon: 'ri-attachment-line'
            }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Budget Amount</h3>
                  <p className="text-lg font-semibold text-gray-900">{proposal.budget}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
                  <p className="text-lg text-gray-900">{proposal.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Reviewer</h3>
                  <p className="text-lg text-gray-900">{proposal.reviewer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Progress</h3>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-3 mr-3">
                      <div
                        className="bg-green-600 h-3 rounded-full"
                        style={{ width: `${proposal.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{proposal.progress}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-gray-900 leading-relaxed">{proposal.description}</p>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-4">
              {proposal.comments.length > 0 ? (
                proposal.comments.map((comment: any) => (
                  <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{comment.author}</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Reviewer
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700">{comment.message}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <i className="ri-chat-3-line text-3xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">No comments yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'attachments' && (
            <div className="space-y-4">
              {proposal.attachments.length > 0 ? (
                proposal.attachments.map((file: any, index: number) => (
                  <div key={index} className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="ri-file-text-line text-blue-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleFileDownload(file)}
                      className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-download-line mr-1"></i>
                      Download
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <i className="ri-attachment-line text-3xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">No attachments</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

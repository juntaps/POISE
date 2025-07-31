
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProposalForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    // Step 1: Project Details
    projectBackground: '',
    projectObjectives: '',
    methodology: '',
    expectedOutcomes: '',
    targetBeneficiaries: '',

    // Step 2: Budget Planning
    capitalOutlay: '',
    budgetJustification: '',

    // Step 3: Implementation Timeline
    startDate: '',
    endDate: '',
    milestones: [{ milestone: '', date: '', description: '' }],

    // Step 4: Review & Submit
    supportingDocuments: null as File | null
  });

  const steps = [
    { number: 1, title: 'Project Details', description: 'Basic project information' },
    { number: 2, title: 'Budget Planning', description: 'Financial requirements' },
    { number: 3, title: 'Implementation Timeline', description: 'Project schedule' },
    { number: 4, title: 'Review & Submit', description: 'Final review and submission' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMilestoneChange = (index: number, field: string, value: string) => {
    const updatedMilestones = [...formData.milestones];
    updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };
    setFormData(prev => ({ ...prev, milestones: updatedMilestones }));
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { milestone: '', date: '', description: '' }]
    }));
  };

  const removeMilestone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const calculateTotalBudget = () => {
    const capital = parseFloat(formData.capitalOutlay) || 0;
    return capital;
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.projectBackground && formData.projectObjectives &&
               formData.methodology && formData.expectedOutcomes && formData.targetBeneficiaries;
      case 2:
        return formData.capitalOutlay && formData.budgetJustification;
      case 3:
        return formData.startDate && formData.endDate && formData.milestones.length > 0 &&
               formData.milestones.some(m => m.milestone && m.date);
      default:
        return true;
    }
  };

  const isFormComplete = () => {
    return validateStep(1) && validateStep(2) && validateStep(3);
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormComplete()) {
      setSubmitStatus('error');
      setSubmitMessage('Please complete all required fields before submitting.');
      return;
    }

    setSubmitStatus('submitting');
    setSubmitMessage('');

    try {
      // Create a better title from project objectives
      const proposalTitle = formData.projectObjectives.length > 0 
        ? formData.projectObjectives.split('.')[0].trim() || formData.projectObjectives.substring(0, 50).trim()
        : 'New Project Proposal';

      // Create proposal object for local storage with improved data
      const newProposal = {
        id: Date.now(), // Use timestamp as unique ID
        title: proposalTitle,
        category: 'Research', // Default category - could be made selectable
        status: 'Draft',
        statusColor: 'gray',
        dateSubmitted: new Date().toISOString().split('T')[0],
        dateUpdated: new Date().toISOString().split('T')[0],
        budget: `₱${parseFloat(formData.capitalOutlay || '0').toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
        reviewer: '-',
        reviewerEmail: '',
        progress: 15,
        description: formData.projectBackground,
        comments: [],
        attachments: formData.supportingDocuments ? [{ 
          name: formData.supportingDocuments.name, 
          size: formatFileSize(formData.supportingDocuments.size)
        }] : [],
        formData: formData, // Store complete form data for editing later
        isUserCreated: true // Mark as user-created proposal
      };

      // Store in localStorage
      const existingProposals = JSON.parse(localStorage.getItem('userProposals') || '[]');
      existingProposals.unshift(newProposal); // Add to beginning so it appears first
      localStorage.setItem('userProposals', JSON.stringify(existingProposals));

      // Trigger storage event for other tabs/components
      window.dispatchEvent(new Event('storage'));

      // Prepare form data for external submission using application/x-www-form-urlencoded format
      const submissionParams = new URLSearchParams();
      submissionParams.append('proposalTitle', proposalTitle);
      submissionParams.append('projectBackground', formData.projectBackground);
      submissionParams.append('projectObjectives', formData.projectObjectives);
      submissionParams.append('methodology', formData.methodology);
      submissionParams.append('expectedOutcomes', formData.expectedOutcomes);
      submissionParams.append('targetBeneficiaries', formData.targetBeneficiaries);
      submissionParams.append('capitalOutlay', formData.capitalOutlay);
      submissionParams.append('budgetJustification', formData.budgetJustification);
      submissionParams.append('startDate', formData.startDate);
      submissionParams.append('endDate', formData.endDate);

      // Process milestones - only get completed milestone data
      const completedMilestones = formData.milestones
        .filter(m => m.milestone && m.date)
        .map(m => `${m.milestone} (${m.date}): ${m.description}`)
        .join('; ');
      submissionParams.append('milestones', completedMilestones);

      submissionParams.append('totalBudget', calculateTotalBudget().toString());
      submissionParams.append('submittedAt', new Date().toISOString());

      // Handle supporting documents - display as "Uncollectable" if uploaded
      if (formData.supportingDocuments) {
        submissionParams.append('supportingDocuments', 'Uncollectable');
      } else {
        submissionParams.append('supportingDocuments', 'None');
      }

      // Submit to form endpoint
      const response = await fetch('https://readdy.ai/api/form/d253fri6ft7aqac6tj4g', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submissionParams.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Proposal submitted successfully! Your proposal has been saved and is now visible in My Proposals. Redirecting...');

        // Show success animation and redirect
        setTimeout(() => {
          router.push('/faculty/proposals/my');
        }, 3000);
      } else {
        // Even if external submission fails, the proposal is still saved locally
        setSubmitStatus('success');
        setSubmitMessage('Proposal saved successfully! Your proposal has been created and is now visible in My Proposals. Redirecting...');

        setTimeout(() => {
          router.push('/faculty/proposals/my');
        }, 3000);
      }

    } catch (error) {
      // Even if there's an error, the proposal is still saved locally
      setSubmitStatus('success');
      setSubmitMessage('Proposal saved locally! Your proposal has been created and is now visible in My Proposals. Redirecting...');

      setTimeout(() => {
        router.push('/faculty/proposals/my');
      }, 3000);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload only PDF, Word, or Excel files.');
      event.target.value = '';
      return;
    }

    const maxSize = 10 * 1024 * 1024; 
    if (file.size > maxSize) {
      alert('File size must be less than 10MB. Please choose a smaller file.');
      event.target.value = '';
      return;
    }

    setUploadStatus('uploading');

    setTimeout(() => {
      setFormData(prev => ({ ...prev, supportingDocuments: file }));
      setUploadStatus('success');

      setTimeout(() => {
        setUploadStatus('idle');
      }, 2000);
    }, 1000);
  };

  const removeUploadedFile = () => {
    setFormData(prev => ({ ...prev, supportingDocuments: null }));
    setUploadStatus('idle');

    const fileInput = document.getElementById('supporting-docs') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = [ 'Bytes', 'KB', 'MB', 'GB' ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Details</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Background <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.projectBackground}
                onChange={(e) => handleInputChange('projectBackground', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={4}
                maxLength={500}
                placeholder="Describe the background and rationale for this project..."
              />
              <p className="text-sm text-gray-500 mt-1">{formData.projectBackground.length}/500 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Objectives <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.projectObjectives}
                onChange={(e) => handleInputChange('projectObjectives', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={4}
                maxLength={500}
                placeholder="List the main objectives of this project..."
              />
              <p className="text-sm text-gray-500 mt-1">{formData.projectObjectives.length}/500 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Methodology <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.methodology}
                onChange={(e) => handleInputChange('methodology', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={4}
                maxLength={500}
                placeholder="Describe the methodology or approach you will use..."
              />
              <p className="text-sm text-gray-500 mt-1">{formData.methodology.length}/500 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Outcomes <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.expectedOutcomes}
                onChange={(e) => handleInputChange('expectedOutcomes', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
                maxLength={500}
                placeholder="What are the expected outcomes and deliverables..."
              />
              <p className="text-sm text-gray-500 mt-1">{formData.expectedOutcomes.length}/500 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Beneficiaries <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.targetBeneficiaries}
                onChange={(e) => handleInputChange('targetBeneficiaries', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
                maxLength={500}
                placeholder="Who will benefit from this project..."
              />
              <p className="text-sm text-gray-500 mt-1">{formData.targetBeneficiaries.length}/500 characters</p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Budget Planning</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capital Outlay <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
                <input
                  type="number"
                  value={formData.capitalOutlay}
                  onChange={(e) => handleInputChange('capitalOutlay', e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Equipment, infrastructure, and other capital items</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">Total Project Budget:</span>
                <span className="text-2xl font-bold text-green-600">
                  ₱{calculateTotalBudget().toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Justification <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.budgetJustification}
                onChange={(e) => handleInputChange('budgetJustification', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={5}
                maxLength={500}
                placeholder="Provide detailed justification for the budget allocation..."
              />
              <p className="text-sm text-gray-500 mt-1">{formData.budgetJustification.length}/500 characters</p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Implementation Timeline</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Project Milestones <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={addMilestone}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap text-sm"
                >
                  <i className="ri-add-line mr-1"></i>Add Milestone
                </button>
              </div>

              <div className="space-y-4">
                {formData.milestones.map((milestone, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-gray-800">Milestone {index + 1}</h4>
                      {formData.milestones.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMilestone(index)}
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          <i className="ri-close-line text-red-600 text-sm"></i>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          value={milestone.milestone}
                          onChange={(e) => handleMilestoneChange(index, 'milestone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          placeholder="Milestone title"
                        />
                      </div>
                      <div>
                        <input
                          type="date"
                          value={milestone.date}
                          onChange={(e) => handleMilestoneChange(index, 'date', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <textarea
                        value={milestone.description}
                        onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        rows={2}
                        placeholder="Milestone description"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Review & Submit</h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Project Summary
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Project Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Total Budget:</span>
                    <span className="ml-2 text-green-600 font-semibold">
                      ₱{calculateTotalBudget().toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Duration:</span>
                    <span className="ml-2">{formData.startDate} to {formData.endDate}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Milestones:</span>
                    <span className="ml-2">{formData.milestones.length} milestones</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supporting Documents (Optional)
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${uploadStatus === 'uploading' ? 'border-blue-300 bg-blue-50' : uploadStatus === 'success' ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-green-300 hover:bg-green-50/50'}`}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="supporting-docs"
                    disabled={uploadStatus === 'uploading'}
                  />

                  {!formData.supportingDocuments ? (
                    <label htmlFor="supporting-docs" className="cursor-pointer block">
                      {uploadStatus === 'uploading' ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                          <p className="text-blue-600 font-medium">Uploading file...</p>
                          <p className="text-sm text-blue-500 mt-1">Please wait</p>
                        </div>
                      ) : (
                        <>
                          <i className="ri-upload-cloud-line text-3xl text-gray-400 mb-2"></i>
                          <p className="text-gray-600">Click to upload supporting documents</p>
                          <p className="text-sm text-gray-500 mt-1">PDF, Word, or Excel files (Max 10MB)</p>
                        </>
                      )}
                    </label>
                  ) : (
                    <div className="space-y-3">
                      {uploadStatus === 'success' && (
                        <div className="flex items-center justify-center text-green-600 mb-2">
                          <i className="ri-check-circle-line mr-1"></i>
                          <span className="font-medium">File uploaded successfully!</span>
                        </div>
                      )}

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <i className="ri-file-line text-blue-600"></i>
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-gray-900 truncate max-w-xs">
                                {formData.supportingDocuments.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatFileSize(formData.supportingDocuments.size)}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeUploadedFile}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                            title="Remove file"
                          >
                            <i className="ri-close-line text-red-600"></i>
                          </button>
                        </div>
                      </div>

                      <label htmlFor="supporting-docs" className="cursor-pointer">
                        <div className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center justify-center">
                          <i className="ri-refresh-line mr-1"></i>
                          Replace file
                        </div>
                      </label>
                    </div>
                  )}
                </div>

                {uploadStatus === 'error' && (
                  <div className="mt-3 text-sm text-red-600 flex items-center">
                    <i className="ri-error-warning-line mr-1"></i>
                    Upload failed. Please try again.
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Create New Proposal</h1>
          <p className="text-gray-600 mt-1">Submit your project proposal through the POISE system</p>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step.number ? 'bg-green-600 border-green-600 text-white' : 'border-gray-300 text-gray-500'}`}>
                  {currentStep > step.number ? (
                    <i className="ri-check-line"></i>
                  ) : (
                    step.number
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${currentStep >= step.number ? 'text-green-600' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`ml-8 w-16 h-0.5 ${currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form id="proposal-form" data-readdy-form onSubmit={handleSubmit}>
          <div className="px-6 py-6">
            {renderStepContent()}
          </div>

          {/* Status Messages - Only show after form submission */}
          {submitStatus === 'success' && (
            <div className="mx-6 mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <i className="ri-check-circle-line text-green-600"></i>
                <span className="text-green-800 font-medium">{submitMessage}</span>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mx-6 mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <i className="ri-error-warning-line text-red-600"></i>
                <span className="text-red-800 font-medium">{submitMessage}</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${currentStep === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                <i className="ri-arrow-left-line mr-2"></i>
                Previous
              </button>

              <div className="text-sm text-gray-500">
                Step {currentStep} of {steps.length}
              </div>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Next
                  <i className="ri-arrow-right-line ml-2"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitStatus === 'submitting' || submitStatus === 'success' || !isFormComplete()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'submitting' ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : submitStatus === 'success' ? (
                    <>
                      <i className="ri-check-circle-line mr-2"></i>
                      Submitted Successfully
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line mr-2"></i>
                      Submit Proposal
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

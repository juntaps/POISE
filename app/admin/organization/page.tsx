
'use client';

import { useState } from 'react';
import AdminLayout from '../AdminLayout';

export default function OrganizationPage() {
  const [user] = useState({
    name: 'Dr. Maria Santos',
    role: 'System Administrator',
    department: 'IPDO',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20administrator%20woman%20in%20business%20attire%2C%20clean%20office%20background%2C%20modern%20portrait%20style&width=100&height=100&seq=admin001&orientation=squarish'
  });

  return (
    <AdminLayout user={user}>
      <OrganizationStructure />
    </AdminLayout>
  );
}

function OrganizationStructure() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSection, setEditingSection] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    sectionType: '',
    memberName: '',
    position: '',
    department: '',
    contact: '',
    description: '',
    actionType: 'add',
    photo: null as File | null
  });

  const handleEditStructure = () => {
    setShowEditModal(true);
    setEditingSection('organization');
    setEditFormData({
      sectionType: 'governing_board',
      memberName: '',
      position: '',
      department: '',
      contact: '',
      description: '',
      actionType: 'add',
      photo: null
    });
    setPreviewImage(null);
  };

  const handleEditMember = (memberData: any) => {
    setShowEditModal(true);
    setEditingSection('member');
    setEditFormData({
      sectionType: memberData.sectionType,
      memberName: memberData.name,
      position: memberData.position,
      department: memberData.department || '',
      contact: memberData.contact || '',
      description: memberData.description || '',
      actionType: 'edit',
      photo: null
    });
    setPreviewImage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setSubmitStatus('error');
        setSubmitMessage('Please upload a valid image file (JPEG, PNG, GIF).');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus('error');
        setSubmitMessage('Image file size must be less than 5MB.');
        return;
      }

      setEditFormData(prev => ({ ...prev, photo: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Clear any error messages
      if (submitStatus === 'error') {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }
    }
  };

  const removeImage = () => {
    setEditFormData(prev => ({ ...prev, photo: null }));
    setPreviewImage(null);
    // Reset file input
    const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!editFormData.memberName || !editFormData.position) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all required fields.');
      return;
    }

    // Check textarea character limit
    if (editFormData.description.length > 500) {
      setSubmitStatus('error');
      setSubmitMessage('Description cannot exceed 500 characters.');
      return;
    }

    setSubmitStatus('submitting');
    setSubmitMessage('');

    try {
      // Prepare form data using application/x-www-form-urlencoded encoding format
      const submissionParams = new URLSearchParams();
      submissionParams.append('sectionType', editFormData.sectionType);
      submissionParams.append('memberName', editFormData.memberName);
      submissionParams.append('position', editFormData.position);
      submissionParams.append('department', editFormData.department);
      submissionParams.append('contact', editFormData.contact);
      submissionParams.append('description', editFormData.description);
      submissionParams.append('actionType', editFormData.actionType);
      submissionParams.append('modifiedBy', 'Dr. Maria Santos');
      submissionParams.append('submittedAt', new Date().toISOString());

      // Handle photo upload - display as "Uncollectable" if uploaded
      if (editFormData.photo) {
        submissionParams.append('memberPhoto', 'Uncollectable');
        submissionParams.append('hasPhoto', 'true');
        submissionParams.append('photoName', editFormData.photo.name);
        submissionParams.append('photoSize', editFormData.photo.size.toString());
        submissionParams.append('photoType', editFormData.photo.type);
      } else {
        submissionParams.append('memberPhoto', 'None');
        submissionParams.append('hasPhoto', 'false');
      }

      // Submit to form endpoint using POST method with updated URL
      const response = await fetch('https://readdy.ai/api/form/d2551boehn5tpoi0h9fg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submissionParams.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Organization structure changes submitted successfully!');

        // Reset form after successful submission
        setEditFormData({
          sectionType: 'governing_board',
          memberName: '',
          position: '',
          department: '',
          contact: '',
          description: '',
          actionType: 'add',
          photo: null
        });
        setPreviewImage(null);

        // Close modal after 2 seconds
        setTimeout(() => {
          setShowEditModal(false);
          setSubmitStatus('idle');
          setSubmitMessage('');
        }, 2000);
      } else {
        setSubmitStatus('error');
        setSubmitMessage('Failed to submit changes. Please try again.');
      }

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Network error occurred. Please check your connection and try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Organization Structure</h1>
            <p className="text-gray-600 mt-1">Palompon Institute of Technology Organizational Chart</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-printer-line mr-2"></i>
              Print Chart
            </button>
            <button
              onClick={handleEditStructure}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-edit-line mr-2"></i>
              Edit Structure
            </button>
          </div>
        </div>
      </div>

      {/* Edit Structure Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Edit Organization Structure</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>

              <form id="organization-structure-form" data-readdy-form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Photo Upload Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Member Photo</h4>

                  <div className="flex flex-col items-center space-y-4">
                    {/* Preview Area */}
                    <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center relative">
                      {previewImage ? (
                        <>
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                          >
                            <i className="ri-close-line text-xs"></i>
                          </button>
                        </>
                      ) : (
                        <div className="text-center">
                          <i className="ri-image-line text-gray-400 text-3xl mb-2"></i>
                          <p className="text-xs text-gray-500">Photo Preview</p>
                        </div>
                      )}
                    </div>

                    {/* Upload Controls */}
                    <div className="text-center space-y-2">
                      <label
                        htmlFor="photo-upload"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-upload-line mr-2"></i>
                        Choose Photo
                      </label>
                      <input
                        type="file"
                        id="photo-upload"
                        name="photo"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <p className="text-xs text-gray-500">
                        Upload JPG, PNG, or GIF (max 5MB)
                      </p>
                      {editFormData.photo && (
                        <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                          <i className="ri-check-line mr-1"></i>
                          {editFormData.photo.name} selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section Type</label>
                    <select
                      name="sectionType"
                      value={editFormData.sectionType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
                    >
                      <option value="governing_board">Governing Board</option>
                      <option value="vice_presidents">Vice Presidents</option>
                      <option value="deans">College Deans</option>
                      <option value="directors">Department Directors</option>
                      <option value="department_chairman">Department Chairman</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
                    <select
                      name="actionType"
                      value={editFormData.actionType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
                    >
                      <option value="add">Add New Member</option>
                      <option value="edit">Edit Existing Member</option>
                      <option value="remove">Remove Member</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="memberName"
                    value={editFormData.memberName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter full name with title (e.g., Dr. John Smith)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position/Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={editFormData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Chairperson, Dean, Director"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department/Office</label>
                    <input
                      type="text"
                      name="department"
                      value={editFormData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter department or office name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
                  <input
                    type="text"
                    name="contact"
                    value={editFormData.contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Email or phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description/Notes</label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Additional information about the role or responsibilities..."
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1">{editFormData.description.length}/500 characters</p>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <i className="ri-check-circle-line text-green-600"></i>
                      <span className="text-green-800 font-medium">{submitMessage}</span>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <i className="ri-error-warning-line text-red-600"></i>
                      <span className="text-red-800 font-medium">{submitMessage}</span>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    disabled={submitStatus === 'submitting'}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting' || submitStatus === 'success'}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitStatus === 'submitting' ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : submitStatus === 'success' ? (
                      <>
                        <i className="ri-check-circle-line mr-2"></i>
                        Changes Submitted!
                      </>
                    ) : (
                      <>
                        <i className="ri-save-line mr-2"></i>
                        Submit Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Governing Board Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Governing Board</h2>
          <div className="h-1 w-20 bg-green-600 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-yellow-50 p-6 rounded-xl border border-green-100 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'governing_board',
                  name: 'Hon. Shirley C. Agrupis',
                  position: 'Chairperson',
                  department: 'Commission on Higher Education',
                  contact: '',
                  description: 'Commissioner, Commission on Higher Education'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-crown-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Hon. Shirley C. Agrupis</h3>
              <p className="text-sm text-green-600 font-medium mb-2">Chairperson</p>
              <p className="text-xs text-gray-600">Commissioner, Commission on Higher Education</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl border border-blue-100 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'governing_board',
                  name: 'Dr. Dennis A. Del Pilar',
                  position: 'Vice-Chairperson',
                  department: 'College Administration',
                  contact: '',
                  description: 'College President'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-user-star-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Dr. Dennis A. Del Pilar</h3>
              <p className="text-sm text-blue-600 font-medium mb-2">Vice-Chairperson</p>
              <p className="text-xs text-gray-600">College President</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'governing_board',
                  name: 'Sen. Alan Peter S. Cayetano',
                  position: 'Member',
                  department: 'Senate',
                  contact: '',
                  description: 'Senator and Chair Higher, Technical & Vocational Ed.'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-government-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Sen. Alan Peter S. Cayetano</h3>
              <p className="text-sm text-gray-600 font-medium mb-2">Member</p>
              <p className="text-xs text-gray-600">Senator and Chair Higher, Technical & Vocational Ed.</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'governing_board',
                  name: 'Cong. Mark O. Go',
                  position: 'Member',
                  department: 'House of Representatives',
                  contact: '',
                  description: 'Representative Chairman, House Committee on HTE'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-government-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Cong. Mark O. Go</h3>
              <p className="text-sm text-gray-600 font-medium mb-2">Member</p>
              <p className="text-xs text-gray-600">Representative Chairman, House Committee on HTE</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'governing_board',
                  name: 'Dr. John Glenn D. Ocaña',
                  position: 'Member',
                  department: 'DOST RO VIII',
                  contact: '',
                  description: 'Regional Director DOST RO VIII'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-flask-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Dr. John Glenn D. Ocaña</h3>
              <p className="text-sm text-gray-600 font-medium mb-2">Member</p>
              <p className="text-xs text-gray-600">Regional Director DOST RO VIII</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'governing_board',
                  name: 'Dir. Meylene C. Rosales',
                  position: 'Member',
                  department: 'NEDA RO VIII',
                  contact: '',
                  description: 'Regional Director, NEDA RO VIII'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-bar-chart-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Dir. Meylene C. Rosales</h3>
              <p className="text-sm text-gray-600 font-medium mb-2">Member</p>
              <p className="text-xs text-gray-600">Regional Director, NEDA RO VIII</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'governing_board',
                  name: 'Dr. Leo Roswald M. Tugonon',
                  position: 'Member',
                  department: 'Faculty Federation',
                  contact: '',
                  description: 'President Faculty Federation'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-team-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Dr. Leo Roswald M. Tugonon</h3>
              <p className="text-sm text-gray-600 font-medium mb-2">Member</p>
              <p className="text-xs text-gray-600">President Faculty Federation</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'governing_board',
                  name: 'Capt. Gregory Nick R. Sevilla',
                  position: 'Member',
                  department: 'Alumni Association',
                  contact: '',
                  description: 'President Alumni Association'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-shield-user-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Capt. Gregory Nick R. Sevilla</h3>
              <p className="text-sm text-gray-600 font-medium mb-2">Member</p>
              <p className="text-xs text-gray-600">President Alumni Association</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'governing_board',
                  name: 'Ms. Yves Mae B. Salinas',
                  position: 'Member',
                  department: 'SSG Federation',
                  contact: '',
                  description: 'President SSG Federation'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-graduation-cap-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Ms. Yves Mae B. Salinas</h3>
              <p className="text-sm text-gray-600 font-medium mb-2">Member</p>
              <p className="text-xs text-gray-600">President SSG Federation</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'governing_board',
                  name: 'Mr. Herville V. Pajaron',
                  position: 'Board Secretary',
                  department: 'Board Secretariat',
                  contact: '',
                  description: 'Board Secretary V Palompon Institute of Technology'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-yellow-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-file-text-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Mr. Herville V. Pajaron</h3>
              <p className="text-sm text-yellow-600 font-medium mb-2">Board Secretary</p>
              <p className="text-xs text-gray-600">Board Secretary V Palompon Institute of Technology</p>
            </div>
          </div>
        </div>
      </div>

      {/* Directors Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Directors</h2>
          <div className="h-1 w-20 bg-orange-600 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-orange-600 rounded-full flex items-center justify-center mb-3">
                <i className="ri-building-4-line text-white text-sm"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">Dr. Eutiquio A. Pernis</h3>
              <p className="text-xs text-orange-600 font-medium">Campus Director, PIT-Tabango</p>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-red-600 rounded-full flex items-center justify-center mb-3">
                <i className="ri-search-line text-white text-sm"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">Dr. Rose A. Arceño</h3>
              <p className="text-xs text-red-600 font-medium">Director, Research Services</p>
            </div>
          </div>

          <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-pink-600 rounded-full flex items-center justify-center mb-3">
                <i className="ri-user-heart-line text-white text-sm"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">Dr. Roushiell France S. London</h3>
              <p className="text-xs text-pink-600 font-medium">Director, Student Development and Services</p>
            </div>
          </div>

          <div className="bg-violet-50 p-4 rounded-xl border border-violet-100">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-violet-600 rounded-full flex items-center justify-center mb-3">
                <i className="ri-hand-heart-line text-white text-sm"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">Dr. Carol O. Laurente</h3>
              <p className="text-xs text-violet-600 font-medium">Director, Extension Services</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-3">
                <i className="ri-database-2-line text-white text-sm"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">Dr. Levi G. Esmero</h3>
              <p className="text-xs text-blue-600 font-medium">Director, Management Information System</p>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-3">
                <i className="ri-global-line text-white text-sm"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">Dr. Neil L. Egloso</h3>
              <p className="text-xs text-green-600 font-medium">Director, External Affairs</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-yellow-600 rounded-full flex items-center justify-center mb-3">
                <i className="ri-clipboard-line text-white text-sm"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">Mr. Neil Rolan P. Albaño</h3>
              <p className="text-xs text-yellow-600 font-medium">Director, Institute Planning and Development</p>
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-indigo-600 rounded-full flex items-center justify-center mb-3">
                <i className="ri-shield-check-line text-white text-sm"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">Dr. Susan S. Entoma</h3>
              <p className="text-xs text-indigo-600 font-medium">Director, Institute Quality Assurance</p>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-purple-600 rounded-full flex items-center justify-center mb-3">
                <i className="ri-search-eye-line text-white text-sm"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">Dr. Allen T. Arpon</h3>
              <p className="text-xs text-purple-600 font-medium">Director, Internal Audit Services</p>
            </div>
          </div>

          <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-teal-600 rounded-full flex items-center justify-center mb-3">
                <i className="ri-line-chart-line text-white text-sm"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">Dr. Rolando C. Entoma</h3>
              <p className="text-xs text-teal-600 font-medium">Director, Income-Generating Project & Productivity</p>
            </div>
          </div>

          <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-rose-600 rounded-full flex items-center justify-center mb-3">
                <i className="ri-money-dollar-circle-line text-white text-sm"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">Mrs. Sarah Frances C. Bate</h3>
              <p className="text-xs text-rose-600 font-medium">Chief Administrative Officer, Finances Services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Chairmen Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Department Chairmen</h2>
          <div className="h-1 w-20 bg-emerald-600 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-100 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'department_chairman',
                  name: 'Prof. Maria Elena Santos',
                  position: 'Chairman',
                  department: 'Computer Science Department',
                  contact: 'm.santos@pit.edu.ph',
                  description: 'PhD in Computer Science, 15 years of experience'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-emerald-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-user-star-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Prof. Maria Elena Santos</h3>
              <p className="text-sm text-emerald-600 font-medium mb-2">Chairman</p>
              <p className="text-xs text-gray-600">Computer Science Department</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-100 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'department_chairman',
                  name: 'Dr. Roberto Miguel Cruz',
                  position: 'Chairman',
                  department: 'Civil Engineering Department',
                  contact: 'r.cruz@pit.edu.ph',
                  description: 'Structural Engineering Specialist, Licensed Civil Engineer'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-cyan-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-hammer-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Dr. Roberto Miguel Cruz</h3>
              <p className="text-sm text-cyan-600 font-medium mb-2">Chairman</p>
              <p className="text-xs text-gray-600">Civil Engineering Department</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-100 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'department_chairman',
                  name: 'Dr. Angela Patricia Reyes',
                  position: 'Chairwoman',
                  department: 'Mathematics Department',
                  contact: 'a.reyes@pit.edu.ph',
                  description: 'PhD in Applied Mathematics, Research in Statistics'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-violet-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-calculator-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Dr. Angela Patricia Reyes</h3>
              <p className="text-sm text-violet-600 font-medium mb-2">Chairwoman</p>
              <p className="text-xs text-gray-600">Mathematics Department</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-100 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'department_chairman',
                  name: 'Prof. Carlos Antonio Lopez',
                  position: 'Chairman',
                  department: 'Business Administration Department',
                  contact: 'c.lopez@pit.edu.ph',
                  description: 'MBA, CPA, Business Management Expert'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-amber-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-briefcase-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Prof. Carlos Antonio Lopez</h3>
              <p className="text-sm text-amber-600 font-medium mb-2">Chairman</p>
              <p className="text-xs text-gray-600">Business Administration Department</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-xl border border-teal-100 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'department_chairman',
                  name: 'Dr. Isabella Marie Garcia',
                  position: 'Chairwoman',
                  department: 'English Language Department',
                  contact: 'i.garcia@pit.edu.ph',
                  description: 'PhD in Applied Linguistics, TESOL Certified'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-teal-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-translate-2 text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Dr. Isabella Marie Garcia</h3>
              <p className="text-sm text-teal-600 font-medium mb-2">Chairwoman</p>
              <p className="text-xs text-gray-600">English Language Department</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-xl border border-rose-100 relative group">
            <button
              onClick={() =>
                handleEditMember({
                  sectionType: 'department_chairman',
                  name: 'Dr. Francisco Luis Mendoza',
                  position: 'Chairman',
                  department: 'Marine Engineering Department',
                  contact: 'f.mendoza@pit.edu.ph',
                  description: 'Marine Engineer, PhD in Naval Architecture'
                })
              }
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <i className="ri-edit-line text-gray-600 text-sm"></i>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-rose-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-anchor-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Dr. Francisco Luis Mendoza</h3>
              <p className="text-sm text-rose-600 font-medium mb-2">Chairman</p>
              <p className="text-xs text-gray-600">Marine Engineering Department</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-team-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">10</p>
              <p className="text-sm text-gray-600">Board Members</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-star-line text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Vice Presidents</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-graduation-cap-line text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-600">College Deans</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-settings-3-line text-orange-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">11</p>
              <p className="text-sm text-gray-600">Department Directors</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-star-line text-emerald-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">6</p>
              <p className="text-sm text-gray-600">Department Chairmen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

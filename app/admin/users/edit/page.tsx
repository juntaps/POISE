
'use client';

import { useState } from 'react';
import AdminLayout from '../../AdminLayout';

export default function EditUserPage() {
  const [user] = useState({
    name: 'Dr. Maria Santos',
    role: 'System Administrator',
    department: 'IPDO',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20administrator%20woman%20in%20business%20attire%2C%20clean%20office%20background%2C%20modern%20portrait%20style&width=100&height=100&seq=admin001&orientation=squarish'
  });

  return (
    <AdminLayout user={user}>
      <EditUserContent />
    </AdminLayout>
  );
}

function EditUserContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filterRole, setFilterRole] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock user data
  const users = [
    {
      id: 1,
      employeeId: 'EMP-2024-001',
      firstName: 'Elena',
      lastName: 'Rodriguez',
      middleName: 'Garcia',
      email: 'e.rodriguez@pit.edu.ph',
      phone: '+63 912 345 6789',
      department: 'College of Engineering and Technology',
      position: 'Associate Professor',
      userRole: 'department_head',
      status: 'active',
      lastLogin: '2024-01-15 09:30:00',
      dateCreated: '2023-08-15',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20professor%20in%20academic%20setting%2C%20laboratory%20background%2C%20confident%20expression&width=80&height=80&seq=user001&orientation=squarish'
    },
    {
      id: 2,
      employeeId: 'EMP-2024-002',
      firstName: 'Michael',
      lastName: 'Chen',
      middleName: 'Wong',
      email: 'm.chen@pit.edu.ph',
      phone: '+63 917 234 5678',
      department: 'College of Arts and Sciences',
      position: 'Full Professor',
      userRole: 'staff',
      status: 'active',
      lastLogin: '2024-01-14 14:20:00',
      dateCreated: '2022-01-10',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20male%20professor%20in%20academic%20office%2C%20books%20background%2C%20scholarly%20appearance&width=80&height=80&seq=user002&orientation=squarish'
    },
    {
      id: 3,
      employeeId: 'EMP-2024-003',
      firstName: 'Sarah',
      lastName: 'Johnson',
      middleName: 'Marie',
      email: 's.johnson@pit.edu.ph',
      phone: '+63 905 123 4567',
      department: 'Registrar Office',
      position: 'Administrative Staff',
      userRole: 'coordinator',
      status: 'inactive',
      lastLogin: '2024-01-10 11:15:00',
      dateCreated: '2023-03-20',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20administrator%20in%20modern%20office%2C%20clean%20desk%20background%2C%20friendly%20demeanor&width=80&height=80&seq=user003&orientation=squarish'
    },
    {
      id: 4,
      employeeId: 'EMP-2024-004',
      firstName: 'Robert',
      lastName: 'Martinez',
      middleName: 'Luis',
      email: 'r.martinez@pit.edu.ph',
      phone: '+63 998 765 4321',
      department: 'Information Technology Services',
      position: 'Technical Staff',
      userRole: 'admin',
      status: 'active',
      lastLogin: '2024-01-15 16:45:00',
      dateCreated: '2021-09-05',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20male%20IT%20specialist%20in%20server%20room%2C%20technology%20background%2C%20expert%20appearance&width=80&height=80&seq=user004&orientation=squarish'
    },
    {
      id: 5,
      employeeId: 'EMP-2024-005',
      firstName: 'Lisa',
      lastName: 'Thompson',
      middleName: 'Ann',
      email: 'l.thompson@pit.edu.ph',
      phone: '+63 932 456 7890',
      department: 'Human Resources',
      position: 'Department Head',
      userRole: 'department_head',
      status: 'active',
      lastLogin: '2024-01-15 08:00:00',
      dateCreated: '2020-11-12',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20HR%20manager%20in%20corporate%20office%2C%20business%20attire%2C%20leadership%20presence&width=80&height=80&seq=user005&orientation=squarish'
    }
  ];

  const departments = [
    'Institutional Planning and Development Office',
    'College of Engineering and Technology',
    'College of Arts and Sciences',
    'College of Education',
    'College of Maritime Education',
    'Graduate School',
    'Administration Office',
    'Registrar Office',
    'Library Services',
    'Student Affairs',
    'Human Resources',
    'Finance Office',
    'Procurement Office',
    'Information Technology Services'
  ];

  const positions = [
    'Department Head',
    'Faculty Member',
    'Assistant Professor',
    'Associate Professor',
    'Full Professor',
    'Administrative Staff',
    'Technical Staff',
    'Support Staff',
    'Research Coordinator',
    'Extension Coordinator'
  ];

  const userRoles = [
    { value: 'admin', label: 'System Administrator' },
    { value: 'staff', label: 'Faculty/Staff' },
    { value: 'department_head', label: 'Department Head' },
    { value: 'coordinator', label: 'Coordinator' },
    { value: 'viewer', label: 'Viewer' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.userRole === filterRole;
    const matchesDepartment = filterDepartment === 'all' || user.department === filterDepartment;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });

  const handleEditUser = (user: any) => {
    setSelectedUser({...user});
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    // Handle save logic here
    setIsEditing(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      // Handle delete logic here
      console.log('Deleting user:', userId);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'department_head': return 'bg-blue-100 text-blue-800';
      case 'coordinator': return 'bg-purple-100 text-purple-800';
      case 'staff': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate API call to refresh user data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset all filters and search
    setSearchTerm('');
    setFilterRole('all');
    setFilterDepartment('all');
    setSelectedUser(null);
    setIsEditing(false);
    
    setIsRefreshing(false);
  };

  if (isEditing && selectedUser) {
    return <EditUserForm user={selectedUser} onSave={handleSaveChanges} onCancel={() => setIsEditing(false)} departments={departments} positions={positions} userRoles={userRoles} />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit User Accounts</h1>
            <p className="text-gray-600 mt-1">Manage and modify existing user accounts in the system</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-download-line mr-2"></i>
              Export Users
            </button>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
            >
              <i className={`ri-refresh-line mr-2 ${isRefreshing ? 'animate-spin' : ''}`}></i>
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Success message when refreshed */}
      {isRefreshing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <i className="ri-information-line text-blue-600"></i>
            <span className="text-blue-800 font-medium">Refreshing user data...</span>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or employee ID..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          
          <div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm pr-8"
            >
              <option value="all">All Roles</option>
              {userRoles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm pr-8"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept.length > 30 ? dept.substring(0, 30) + '...' : dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              User Accounts ({filteredUsers.length} found)
            </h2>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{user.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={user.department}>
                      {user.department}
                    </div>
                    <div className="text-sm text-gray-500">{user.position}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.userRole)}`}>
                      {userRoles.find(r => r.value === user.userRole)?.label}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                        title="Edit User"
                      >
                        <i className="ri-edit-line text-blue-600"></i>
                      </button>
                      
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
                        title="Reset Password"
                      >
                        <i className="ri-key-line text-green-600"></i>
                      </button>
                      
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                        title="Delete User"
                      >
                        <i className="ri-delete-bin-line text-red-600"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-user-search-line text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

function EditUserForm({ user, onSave, onCancel, departments, positions, userRoles }: any) {
  const [formData, setFormData] = useState(user);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSave();
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Edit Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit User Account</h1>
              <p className="text-gray-600">{user.firstName} {user.lastName} ({user.employeeId})</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-gray-600"></i>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Professional Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department/Office</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
              >
                {departments.map((dept: string) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
              >
                {positions.map((pos: string) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* System Access */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">System Access</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User Role</label>
              <select
                name="userRole"
                value={formData.userRole}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
              >
                {userRoles.map((role: any) => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              Cancel Changes
            </button>
            
            <button
              type="button"
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-key-line mr-2"></i>
              Reset Password
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <>
                  <i className="ri-save-line mr-2"></i>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


'use client';

import { useState } from 'react';
import AdminLayout from './AdminLayout';
import DashboardOverview from './DashboardOverview';

export default function AdminPanel() {
  const [user] = useState({
    name: 'Dr. Maria Santos',
    role: 'System Administrator',
    department: 'IPDO',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20administrator%20woman%20in%20business%20attire%2C%20clean%20office%20background%2C%20modern%20portrait%20style&width=100&height=100&seq=admin001&orientation=squarish'
  });

  return (
    <AdminLayout user={user}>
      <DashboardOverview />
    </AdminLayout>
  );
}

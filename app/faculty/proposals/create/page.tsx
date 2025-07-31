'use client';

import { useState } from 'react';
import FacultyLayout from '../../FacultyLayout';
import CreateProposalForm from './CreateProposalForm';

export default function CreateProposalPage() {
  const [user] = useState({
    name: 'Prof. Elena Rodriguez',
    role: 'Faculty Member',
    department: 'College of Engineering and Technology',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20professor%20in%20academic%20setting%2C%20laboratory%20background%2C%20confident%20expression&width=100&height=100&seq=faculty001&orientation=squarish'
  });

  return (
    <FacultyLayout user={user}>
      <CreateProposalForm />
    </FacultyLayout>
  );
}
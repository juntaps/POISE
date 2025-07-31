
import { useState } from 'react';
import FacultyLayout from '../../../FacultyLayout';
import EditProposalForm from './EditProposalForm';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '1753888579079' }
  ];
}

export default function EditProposalPage({ params }: { params: { id: string } }) {
  const user = {
    name: 'Prof. Elena Rodriguez',
    role: 'Faculty Member',
    department: 'College of Engineering and Technology',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20professor%20in%20academic%20setting%2C%20laboratory%20background%2C%20confident%20expression&width=100&height=100&seq=faculty001&orientation=squarish'
  };

  return (
    <FacultyLayout user={user}>
      <EditProposalForm proposalId={params.id} />
    </FacultyLayout>
  );
}

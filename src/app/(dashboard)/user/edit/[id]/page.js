"use client"
import { useRouter } from 'next/navigation';
import EditUserForm from '@/components/forms/editUser';

export default function EditUserPage({ params }) {
  const router = useRouter();
  const { id } = params;

  const handleUpdate = () => {
    router.push('/dashboard'); // Redirect after update
  };

  return (
    <EditUserForm id={id} onUpdate={handleUpdate} />
  );
}

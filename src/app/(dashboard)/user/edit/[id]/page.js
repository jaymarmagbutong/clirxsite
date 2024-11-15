"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditUserForm from '@/components/forms/editUser';

export default function EditUserPage({ params }) {
  const router = useRouter();
  const { id } = React.use(params); // Unwrap params to get id

  const handleUpdate = () => {
    router.push('/dashboard'); // Redirect after update
  };

  return (
    <EditUserForm id={id} onUpdate={handleUpdate} />
  );
}

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { getUserById } from '../../../utils/data/api/userData';
import ProfileForm from '../../../components/forms/ProfileForm';

export default function EditProfile() {
  const [thisUser, setUser] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  const getUser = () => {
    getUserById(user.id).then(setUser);
  };

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div className="formPage">
      <ProfileForm user={thisUser} onUpdate={getUser} />
    </div>
  );
}

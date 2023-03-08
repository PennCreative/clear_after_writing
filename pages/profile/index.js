import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../utils/context/authContext';
import { getUserById } from '../../utils/data/api/userData';
import Pagination from '../../components/Pagination';

export default function ViewProfile() {
  const { user } = useAuth();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});

  const profileDetails = () => {
    getUserById(user.id).then(setUserDetails);
  };

  useEffect(() => {
    profileDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div className="profileContent">
      <div className="profileLeftSide">
        <img className="profilePic" src={userDetails?.profile_image_url} alt="profile pic" />
        <div className="userDetailSection">
          <h3>{userDetails?.first_name} {userDetails?.last_name}</h3>
        </div>
      </div>
      <div className="profileRightSide">
        <Pagination id={userDetails.id} onUpdate={profileDetails} />
      </div>
    </div>
  );
}

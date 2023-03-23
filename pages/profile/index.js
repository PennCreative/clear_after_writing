/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { GrEdit } from 'react-icons/gr';
import { useAuth } from '../../utils/context/authContext';
import { getUserById } from '../../utils/data/api/userData';
import Pagination from '../../components/Pagination';
import { getJournalByWriter } from '../../utils/data/api/journalData';
import { getJournalsSurvey } from '../../utils/data/api/surveyData';

export default function ViewProfile() {
  const { user } = useAuth();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});
  const [, setJournals] = useState({});
  const [sleepAvg, setSleepAvg] = useState();
  const [prodAvg, setProdAvg] = useState();
  const [dayAvg, setDayAvg] = useState();

  const profileDetails = () => {
    getUserById(user.id).then((data) => {
      setUserDetails(data);
      getJournalByWriter(data.id).then((journals) => {
        setJournals(journals);
        Promise.all(
          journals.map((journal) => getJournalsSurvey(journal.id)),
        ).then((surveys) => {
          let sleepSum = 0;
          let sleepCount = 0;
          let productivitySum = 0;
          let productivityCount = 0;
          let daySum = 0;
          let dayCount = 0;

          surveys.forEach((obj) => {
            obj.forEach((q) => {
              if (typeof q.question === 'string' && q.question === 'Rate Your Sleep') {
                sleepSum += q.answer;
                sleepCount++;
              } else if (typeof q.question === 'string' && q.question === 'Rate Your Productivity') {
                productivitySum += q.answer;
                productivityCount++;
              } else if (typeof q.question === 'string' && q.question === 'Rate Your Day') {
                daySum += q.answer;
                dayCount++;
              }
            });
          });

          setSleepAvg(Math.ceil(sleepCount > 0 ? sleepSum / sleepCount : 0));
          setProdAvg(Math.ceil(productivityCount > 0 ? productivitySum / productivityCount : 0));
          setDayAvg(Math.ceil(dayCount > 0 ? daySum / dayCount : 0));
        });
      });
    });
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
          <h1>{userDetails?.first_name} {userDetails?.last_name}</h1>
          <Link href={`/profile/edit/${user.id}`} passHref>
            <Button className="editBtn" variant="link"><GrEdit /></Button>
          </Link>
        </div>
      </div>
      <div className="profileRightSide">
        <Pagination id={userDetails.id} sleep={sleepAvg} day={dayAvg} prod={prodAvg} onUpdate={profileDetails} />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../utils/context/authContext';
import { getUserById } from '../../utils/data/api/userData';
import Pagination from '../../components/Pagination';
import { getJournalByWriter } from '../../utils/data/api/journalData';
import { getJournalsSurvey } from '../../utils/data/api/surveyData';

export default function ViewProfile() {
  const { user } = useAuth();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});
  const [myJournals, setJournals] = useState({});

  const profileDetails = () => {
    getUserById(user.id).then((data) => {
      setUserDetails(data);
      getJournalByWriter(data.id).then((journals) => {
        setJournals(journals);
        Promise.all(
          journals.map((journal) => getJournalsSurvey(journal.id)),
        ).then((surveys) => {
          setJournals((prevJournals) => prevJournals.map((journal, i) => {
            const survey = surveys[i];
            console.log('survey:', survey);
            console.log('answers:', survey[0]?.answer);

            // Calculate the averages for the survey answers
            const answerCount = survey?.answers?.length || 0;
            const answer1Avg = answerCount > 0
              ? survey.answers.reduce((acc, val) => acc + val[0], 0) / answerCount
              : 0;
            const answer2Avg = answerCount > 0
              ? survey.answers.reduce((acc, val) => acc + val[1], 0) / answerCount
              : 0;
            const answer3Avg = answerCount > 0
              ? survey.answers.reduce((acc, val) => acc + val[2], 0) / answerCount
              : 0;

            // Return the modified journal object with the survey and averages
            return {
              ...journal,
              survey,
              answer1Avg,
              answer2Avg,
              answer3Avg,
            };
          }));
        });
      });
    });
  };

  console.log(user);
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
          <Link href={`/profile/edit/${user.id}`} passHref>
            <Button variant="primary">EDIT</Button>
          </Link>
        </div>
      </div>
      <div className="profileRightSide">
        <Pagination id={userDetails.id} onUpdate={profileDetails} />
      </div>
    </div>
  );
}

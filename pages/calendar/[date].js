import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
// import { useAuth } from '../../utils/context/authContext';
import { getJournalByDate, deleteJournal } from '../../utils/data/api/journalData';
import { getJournalsSurvey } from '../../utils/data/api/surveyData';

export default function DateEntry() {
  const router = useRouter();
  // const { user } = useAuth();
  const [journal, setJournal] = useState({});
  const [questions, setQuestions] = useState([]);
  const date = router.asPath.split('/')[2];
  const journalObj = journal[0];

  const getData = () => {
    async function getJournalAndSurveyByDate() {
      try {
        const journalData = await getJournalByDate(date);
        const journalId = journalData[0].id;
        setJournal(journalData);
        const questionsData = await getJournalsSurvey(journalId);
        setQuestions(questionsData);
      } catch (error) {
        console.error(error);
      }
    }
    getJournalAndSurveyByDate();
  };

  const deleteThisEntry = () => {
    if (window.confirm(`Delete ${journalObj.id}?`)) {
      deleteJournal(journalObj.id).then(() => router.push('/'));
    }
  };
  useEffect(() => {
    getData();
  }, [router]);
  return (
    <div className="dailyResults">
      <div className="entry">
        <sup>Viewing Entry for {date}</sup>
        {journalObj?.id ? (
          <>
            <h5>Goal:</h5>
            <ul>
              <li>
                <h3><em className="entry">{journalObj.goal_entry}</em></h3>
              </li>
            </ul>
            <h5>Affirmation:</h5>
            <ul>
              <li>
                <h3><em className="entry">{journalObj.affirmation}</em></h3>
              </li>
            </ul>
            <h5>Journal Entry:</h5>
            <ul>
              <li>
                <h3><em className="entry">{journalObj.entry}</em></h3>
              </li>
            </ul>
            <Link href={`/calendar/${date}/edit`} passHref>
              <Button className="smallBtn" variant="outline-primary">
                <AiFillEdit />
              </Button>
            </Link>
            <Button
              className="smallBtn"
              variant="outline-danger"
              onClick={deleteThisEntry}
            >
              <BsFillTrashFill />
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              router.push('/calendar/new');
            }}
          >Create Entry
          </Button>
        )}
      </div>
    </div>
  );
}

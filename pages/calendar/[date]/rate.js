import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { getJournalByDate } from '../../../utils/data/api/journalData';
import { getJournalsSurvey } from '../../../utils/data/api/surveyData';
import SurveyForm from '../../../components/forms/SurveyForm';

const initialState = [
  { question: 'Rate Your Sleep', answer: 0 },
  { question: 'Rate Your Productivity', answer: 0 },
  { question: 'Rate Your Overall Day', answer: 0 },
];

export default function DateEntry() {
  const router = useRouter();
  const { user } = useAuth();
  const [journal, setJournal] = useState({});
  const [questions, setQuestions] = useState(initialState);
  const date = router.asPath.split('/')[2];

  const getData = () => {
    getJournalByDate(date).then((data) => {
      console.log(data);
      getJournalsSurvey(data[0]?.id).then(setQuestions);
    });
  };

  useEffect(() => {
    getData();
  }, [router]);

  return (
    <>
      {questions?.map((question) => (
        <SurveyForm key={question.id} survey={question} journal={journal} onUpdate={getData} />
      ))}
      <Link className="nav-item" passHref href="/calendar">
          <h1>Finished!</h1>
      </Link>
    </>
  );
}

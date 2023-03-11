import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { getJournalByDate } from '../../../utils/data/api/journalData';
import { getJournalsSurvey } from '../../../utils/data/api/surveyData';
import EntryForm from '../../../components/forms/EntryForm';
import SurveyForm from '../../../components/forms/SurveyForm';

export default function DateEntry() {
  const router = useRouter();
  const { user } = useAuth();
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

  useEffect(() => {
    getData();
  }, [router]);

  return (
    <>
      {questions.map((question) => (
        <SurveyForm key={question.id} survey={question} onUpdate={getData} />
      ))}
      <EntryForm writer={user.id} journal={journalObj} survey={questions} />
    </>
  );
}

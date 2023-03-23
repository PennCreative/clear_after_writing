import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import { createSurvey, updateSurvey } from '../../utils/data/api/surveyData';
import { getJournalByDate } from '../../utils/data/api/journalData';
import { createStat } from '../../utils/data/api/statData';

export default function SurveyForm({ survey }) {
  const router = useRouter();
  const date = router.asPath.split('/')[2];
  const [journal, setJournal] = useState({});
  const [formInput, setFormInput] = useState({
    id: 0,
    question: '',
    answer: 0,
  });

  useEffect(() => {
    getJournalByDate(date).then(setJournal);
    if (survey?.id) {
      setFormInput(survey);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const surveyData = {
      id: survey.id,
      question: survey.question,
      answer: formInput.answer,
    };
    if (survey.id) {
      updateSurvey(surveyData, survey.id);
    } else {
      createSurvey(surveyData).then((data) => {
        const payload = { journal: journal[0].id, survey: data.id };
        createStat(payload).then();
      });
    }
  };

  return (
    <div onSubmit={handleSubmit} className="card cardForm text-center text-dark bg-light mb-3">
      <div className="card-body surveyForm">
        <Row className="mb-3">

          <Form.Group as={Col} controlId="">
            <Form.Label>{survey?.question}</Form.Label>
            <Form.Range
              min={1}
              max={10}
              value={formInput.answer}
              onChange={handleChange}
              name="answer"
              label={`${formInput.answer}`}
            />
          </Form.Group>

        </Row>
        <ButtonGroup vertical>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            {survey?.id ? 'Update' : 'Create'} Survey
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

SurveyForm.propTypes = {
  survey: PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    answer: PropTypes.number,
  }).isRequired,
};

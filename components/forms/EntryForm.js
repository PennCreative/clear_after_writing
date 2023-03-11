import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { createJournal, updateJournal } from '../../utils/data/api/journalData';
import { createStat } from '../../utils/data/api/statData';
import { createSurvey } from '../../utils/data/api/surveyData';
// import { getJournalsSurvey } from '../../utils/data/api/surveyData';

const initialState = {
  writer: 0,
  date: '',
  goal_entry: '',
  affirmation: '',
  distraction: '',
  entry: '',
  significant: false,
};

const initialSurvey = [
  { question: 'Rate Your Sleep', answer: 0 },
  { question: 'Rate Your Productivity', answer: 0 },
  { question: 'Rate Your Overall Day', answer: 0 },
];

export default function EntryForm({ journal }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  const format = `2023-${currentMonth + 1}-${currentDate}`;
  // const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    if (journal) setFormInput(journal);
  }, [journal, user]);

  // useEffect(() => {
  //   if (journal) getJournalsSurvey(journal.id).then(setSurveys);
  // }, [journal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (journal.id) {
      updateJournal(formInput, journal.id)
        .then(() => router.push(`/calendar/${journal.date}`));
    } else {
      const payload = {
        ...formInput, writer_id: user.id, date: today,
      };
      createJournal(payload).then((data) => {
        initialSurvey.map((surveyData) => {
          const surveyPayload = {
            question: surveyData.question,
            answer: 0,
          };
          createSurvey(surveyPayload).then((d2) => {
            const statPayload = {
              journal: data.id,
              survey: d2.id,
              rating: 0,
            };
            createStat(statPayload).then(() => router.push(`/calendar/${format}/rate`));
          });
          return console.log(surveyData);
        });
      });
    }
  };
  return (
    <div onSubmit={handleSubmit} className="card cardForm text-center text-dark bg-light mb-3">
      <div className="card-header">
        {journal.id ? 'Update' : 'Create' } Entry
      </div>
      <div className="card-body">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="affirmation">
            <Form.Label>Daily Affirmation</Form.Label>
            <InputGroup className="mb-2">
              <Form.Control defaultValue={formInput.affirmation} onChange={handleChange} type="text" name="affirmation" placeholder="Say it out loud" />
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="goal_entry">
            <Form.Label>Today&#39;s Goal</Form.Label>
            <Form.Control defaultValue={formInput.goal_entry} onChange={handleChange} name="goal_entry" type="text" placeholder="Make it achievable" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="distraction">
            <Form.Label>Today&#39;s Biggest Distraction</Form.Label>
            <Form.Control defaultValue={formInput.distraction} onChange={handleChange} name="distraction" type="text" placeholder="What's holding you back?" />
          </Form.Group>
        </Row>

        <Row className="mb-3">

          <Form.Group className="mb-3" controlId="entry">
            <Form.Label>Today&#39;s Entry</Form.Label>
            <Form.Control as="textarea" rows={3} defaultValue={formInput.entry} onChange={handleChange} type="text" name="entry" placeholder="Let It All Out" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="significant">
            <Form.Check
              type="checkbox"
              label="Significant"
              checked={formInput.significant}
              onChange={(e) => setFormInput((prevState) => ({
                ...prevState,
                significant: e.target.checked,
              }))}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {journal.id ? 'Update' : 'Create'} Today&#39;s Entry
        </Button>

      </div>
      <div className="card-footer text-muted">
        CAW &#8482;
      </div>
    </div>
  );
}

EntryForm.propTypes = {
  journal: PropTypes.shape({
    writer: PropTypes.shape({
      id: PropTypes.number,
    }),
    id: PropTypes.number,
    date: PropTypes.string,
    goal_entry: PropTypes.string,
    affirmation: PropTypes.string,
    distraction: PropTypes.string,
    entry: PropTypes.string,
    significant: PropTypes.bool,
  }),
};

EntryForm.defaultProps = {
  journal: initialState,
};

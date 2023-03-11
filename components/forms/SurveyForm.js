import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import { createSurvey, updateSurvey } from '../../utils/data/api/surveyData';

export default function SurveyForm({ survey, onUpdate }) {
  const [formInput, setFormInput] = useState({
    id: 0,
    question: '',
    answer: 5,
  });

  useEffect(() => {
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
      question: formInput.question,
      answer: formInput.answer,
    };
    if (survey.id) {
      updateSurvey(surveyData, survey.id).then(() => onUpdate(surveyData));
    } else {
      createSurvey(surveyData).then((newSurvey) => onUpdate(newSurvey));
    }
  };

  return (
    <div onSubmit={handleSubmit} className="card cardForm text-center text-dark bg-light mb-3">
      <div className="card-header">
        {survey?.id ? 'Update' : 'Create' } Survey
      </div>
      <div className="card-body">
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
  onUpdate: PropTypes.func.isRequired,
};

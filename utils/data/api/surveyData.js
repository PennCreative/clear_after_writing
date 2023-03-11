import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getAllSurveys = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/surveys`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleSurvey = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/surveys/${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});
const getJournalsSurvey = (journalId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/surveys/?journal_id=${journalId}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createSurvey = (surveyObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/surveys`, {
    method: 'POST',
    body: JSON.stringify(surveyObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateSurvey = (surveyObj, id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/surveys/${id}`, {
    method: 'PUT',
    body: JSON.stringify(surveyObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteSurvey = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/surveys/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getAllSurveys, getSingleSurvey, getJournalsSurvey, updateSurvey, createSurvey, deleteSurvey,
};

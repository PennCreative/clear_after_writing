import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getAllJournals = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/journals`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});
const getJournalByDate = (date) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/${date}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});
const getJournalByWriter = (writerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/journals/writer/?writer_id=${writerId}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleJournal = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/journals/${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createJournal = (journalObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/journals`, {
    method: 'POST',
    body: JSON.stringify(journalObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});
const updateJournal = (journalObj, id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/journals/${id}`, {
    method: 'PUT',
    body: JSON.stringify(journalObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteJournal = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/journals/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getAllJournals, getSingleJournal, getJournalByWriter, getJournalByDate, createJournal, updateJournal, deleteJournal,
};

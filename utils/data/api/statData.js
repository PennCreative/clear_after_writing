import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getAllStats = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/stats`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleStat = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/stats/${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createStat = (statObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/stats`, {
    method: 'POST',
    body: JSON.stringify(statObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateStat = (statObj, id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/stat/${id}`, {
    method: 'PUT',
    body: JSON.stringify(statObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteStat = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/stats/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getAllStats, getSingleStat, createStat, updateStat, deleteStat,
};

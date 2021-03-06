// Use Node-style imports for dependencies.
const axios = require('axios');
const result = require('./result.js');

const setResult = result.setResult;
const setError = result.setError;

const BASE_URL = 'http://localhost:3000/pets/';

// Option functions.
const listPets = () => {
  axios.get(BASE_URL)
    .then((response) => {
      setResult(response.data);
    })
    .catch((error) => {
      setError(`Your request has errors`);
    })
};

const showDetails = (selectedPetId) => {
  if (!selectedPetId) {
    setError("You tried to show details for a pet without selecting it!");
  } else {
    axios.get(`${BASE_URL}${selectedPetId}`)
      .then((response) => {
        setResult(response.data)
      })
      .catch((error) => {
        setError('Request failed with status 404')
      });
  }
};

const removePet = (selectedPetId) => {
  if (!selectedPetId) {
    setError("You tried to remove a pet without selecting it!");
  } else {
    axios.delete(`${BASE_URL}${selectedPetId}`)
      .then((response) => {
        setResult(response.data)
      })
      .catch((error) => {
        setError('Failed to remove pet')
      });
  }
};

const addPet = (petInfo) => {
  const newPetInfo = {
    name: petInfo['name'],
    ...petInfo["options"]
  }
  axios.post(BASE_URL, newPetInfo)
    .then((response) => {
      setResult(response.data)
    })
    .catch((error) => {
      setError('Failed to add pet')
    });
};

// Use Node-style exports to export functions for tests and main.
module.exports = {
  listPets,
  showDetails,
  removePet,
  addPet
};

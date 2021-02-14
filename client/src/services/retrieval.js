import axios from 'axios';
const baseURL = '/api';

const getShows = () => (
  axios({
    method: 'get',
    url: '/shows',
    baseURL: baseURL
  })
    .then(response => response.data)
    .catch(err => console.log(err))
);

const getSongs = () => (
  axios({
    method: 'get',
    url: '/songs',
    baseURL: baseURL
  })
    .then(response => response.data)
    .catch(err => console.log(err))
);

const getVenues = () => (
  axios({
    method: 'get',
    url: '/venues',
    baseURL: baseURL
  })
    .then(response => response.data)
    .catch(err => console.log(err))
);

const retrieval = { getShows, getSongs, getVenues };
export default retrieval;

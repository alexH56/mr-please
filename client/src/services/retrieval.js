import axios from 'axios';
const baseURL = '/api/show/';

const getShow = () => (
  axios
    .get(baseURL)
    .then(res => res.data)
);

const retrievalService = { getShow };
export default retrievalService
;

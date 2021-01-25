import axios from 'axios';
const baseURL = '/api';

const addShow = newShow => (
  axios({
    method: 'post',
    url: '/shows',
    baseURL: baseURL,
    data: newShow
  })
    .then(response => response.data)
    .catch(err => console.log(err))
);

const addSong = newSong => (
  axios({
    method: 'post',
    url: '/songs',
    baseURL: baseURL,
    data: newSong
  })
    .then(response => response.data)
    .catch(err => console.log(err))
);

const posting = { addShow, addSong };
export default posting;

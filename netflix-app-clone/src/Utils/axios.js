 // axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3", // ✅ Correct base URL
});

export default instance;

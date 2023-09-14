import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  // baseURL: "http://127.0.0.1:3333",
});
export default instance;

import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});

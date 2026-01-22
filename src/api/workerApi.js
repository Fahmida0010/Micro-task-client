// src/api/workerApi.js
import axiosSecure from "../hooks/useAxiosSecure";

// Worker Stats
export const getWorkerStats = (email) =>
  axiosSecure.get(`/worker/stats?email=${email}`);

// All Tasks
export const getTasks = () => axiosSecure.get("/tasks/available");

// Submit Task
export const submitTask = (submission) =>
  axiosSecure.post("/submissions", submission);

// Worker Submissions
export const getMySubmissions = (email) =>
  axiosSecure.get(`/submissions/my?email=${email}`);

// Withdrawals
export const withdrawCoin = (data) => axiosSecure.post("/withdrawals", data);

// Current Coin for worker
export const getWorkerCoin = (email) =>
  axiosSecure.get(`/worker/coin?email=${email}`);

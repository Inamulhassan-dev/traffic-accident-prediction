import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000"
});

export const predictAccident = (data) => API.post("/predict", data);

export const getRecommendations = (data) => API.post("/api/recommendations", data);

export const getStats = () => API.get("/api/stats");

export const getAnalytics = () => API.get("/api/analytics");

export const getWeatherImpact = () => API.get("/api/weather-impact");

export const getDriverProfile = (data) => API.post("/api/driver-profile", data);

export const batchPredict = (predictions) => API.post("/api/batch-predict", { predictions });
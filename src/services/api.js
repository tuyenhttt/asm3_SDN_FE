import axios from "axios";

// const API_URL = "http://localhost:8080/api/";
const API_URL = "https://asm3-sdn.onrender.com/api/v1";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (url) => {
  try {
    const response = await apiClient.get(url);
    return response.data; // Ensure the API returns data correctly
  } catch (error) {
    console.error("API call failed:", error);
    return null; // Return null or handle the error as needed
  }
};

export const getById = async (url, id) => {
  const response = await apiClient.get(`${url}/${id}`);
  return response.data;
};

export const post = async (url, data) => {
  const response = await apiClient.post(url, data);
  return response;
};

export const put = async (url, data) => {
  const response = await apiClient.put(url, data);
  return response;
};

export const deleteRequest = async (url) => {
  await apiClient.delete(url);
};

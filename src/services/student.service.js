import { get, post, put, deleteRequest } from "./api";

const API_GET = "/students";
const API_POST = "/students/create";

export const getStudents = async () => {
  return await get(API_GET);
};

export const getById = async (id) => {
  return await get(`${API_GET}/${id}`);
};

export const deleteStudent = async (id) => {
  return await deleteRequest(`${API_GET}/${id}`);
};

export const createStudent = async (question) => {
  return await post(API_POST, question);
};

export const updateStudent = async (id, question) => {
  return await put(`${API_GET}/${id}`, question);
};

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/prompts';

export const getAllPrompts = () => axios.get(BASE_URL);
export const getPromptById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createPrompt = (data) => axios.post(BASE_URL, data);
export const updatePrompt = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deletePrompt = (id) => axios.delete(`${BASE_URL}/${id}`);
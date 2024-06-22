// Import Axios library
import axios from 'axios';

import { ADD_TASK_URL, BASE_URL, DELETE_TASK_URL, EDIT_TASK_URL, VIEW_TASK_URL } from '../constants';

// Base URL of your backend API
// const BASE_URL = 'https://api.example.com';


// Function to handle errors (optional)
const handleErrors = (error) => {
  console.error('API Error:', error);
  throw error;  // Throw error to handle it wherever the service function is called
};

// POST request example
export const addTask = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${ADD_TASK_URL}`, data);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

// PUT request example
export const updateTask = async (data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${EDIT_TASK_URL}`, data);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

// GET request example
export const getAllTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/${VIEW_TASK_URL}`);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

// DELETE request example
export const removeTask = async (endpoint) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${DELETE_TASK_URL}`);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

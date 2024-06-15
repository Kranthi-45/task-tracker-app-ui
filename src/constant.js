// src/constants.js

const getConfig = () => {
    if (!window.config) {
      throw new Error('Configuration not loaded');
    }
    return window.config;
  };
  
  export const BASE_APP_URL = () => getConfig().BASE_URL;
  // Export other configurations as needed
  
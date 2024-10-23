import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data from an API.
 * @param {string} url - The API endpoint to fetch data from.
 * @param {object} options - Fetch options such as method, headers, etc.
 * @returns {object} - Contains the data, loading state, and error state.
 */
const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches data from the given API endpoint.
   * Handles the loading state, error management, and data parsing.
   */
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles any error that occurs during the fetch process.
   * @param {Error} error - The error encountered during the fetch.
   */
  const handleError = (error) => {
    setError(error.message);
  };

  // useEffect to trigger the data fetching when the component mounts or when the URL or options change.
  useEffect(() => {
    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useFetch;
 

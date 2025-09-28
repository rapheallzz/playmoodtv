import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useHighlights = (user) => {
  const [highlights, setHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHighlights = useCallback(async () => {
    if (!user?._id) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/highlights/creator/${user._id}`);
      setHighlights(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch highlights.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchHighlights();
  }, [fetchHighlights]);

  const createHighlight = async (highlightData) => {
    if (!user?._id) {
      setError('User not authenticated.');
      return { success: false };
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/highlights', {
        ...highlightData,
        creatorId: user._id,
      });
      setHighlights((prev) => [...prev, response.data]);
      setIsLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create highlight.';
      setError(errorMessage);
      console.error(err);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return { highlights, isLoading, error, createHighlight, fetchHighlights };
};

export default useHighlights;
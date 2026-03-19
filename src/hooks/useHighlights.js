import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';

const useHighlights = (user, creatorId) => {
  const [highlights, setHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  const fetchHighlights = useCallback(async () => {
    const idToFetch = creatorId || user?._id;
    if (!idToFetch) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_API_URL}/api/highlights/creator/${idToFetch}`, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      setHighlights(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to fetch highlights.');
    } finally {
      setIsLoading(false);
    }
  }, [user?._id, creatorId]);

  useEffect(() => {
    fetchHighlights();
  }, [fetchHighlights]);

  const createHighlight = async (highlightData) => {
    if (!user?._id || !user.token) {
      setError('User not authenticated.');
      return { success: false };
    }
    setIsCreating(true);
    setError(null);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.post(
        `${BASE_API_URL}/api/highlights`,
        {
          ...highlightData,
          creatorId: user._id,
        },
        config
      );
      setHighlights((prev) => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to create highlight.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsCreating(false);
    }
  };

  const deleteHighlight = async (highlightId) => {
    if (!user?._id || !user.token) {
      setError('User not authenticated.');
      return { success: false };
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(`${BASE_API_URL}/api/highlights/${highlightId}`, config);
      setHighlights((prev) => prev.filter((h) => h._id !== highlightId));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to delete highlight.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return { highlights, isLoading, isCreating, error, createHighlight, deleteHighlight, fetchHighlights };
};

export default useHighlights;
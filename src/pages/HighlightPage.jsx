import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VerticalHighlightViewer from '../components/creator/VerticalHighlightViewer';
import styled from 'styled-components';

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #541011;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Loading = styled.div`
  color: #fff;
  text-align: center;
  font-size: 1.2rem;
`;


const HighlightPage = () => {
  const { encodedHighlightId } = useParams();
  const navigate = useNavigate();
  const [highlight, setHighlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (encodedHighlightId) {
      const fetchHighlight = async () => {
        try {
          const highlightId = atob(encodedHighlightId);
          const response = await axios.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/highlights/${highlightId}`);

          if (response.data) {
            const enrichedHighlight = await enrichHighlight(response.data);
            setHighlight(enrichedHighlight);
          }
        } catch (e) {
          console.error("Failed to decode or fetch highlight:", e);
          setError("Failed to load highlight.");
        } finally {
          setLoading(false);
        }
      };
      fetchHighlight();
    }
  }, [encodedHighlightId]);

  const enrichHighlight = async (h) => {
    try {
      const res = await axios.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${h.content._id}`);
      const contentDetails = res.data;
      // The creator's information is already in contentDetails.user
      const creatorInfo = {
        name: contentDetails.user.name,
        profileImage: contentDetails.user.profileImage || '',
      };
      return {
        ...h,
        content: contentDetails,
        creator: creatorInfo
      };
    } catch (e) {
      console.error(`Failed to enrich highlight ${h._id}:`, e);
      return {
        ...h,
        creator: { name: 'Error loading data', profileImage: '' }
      };
    }
  };

  if (loading) {
    return (
      <LoadingOverlay>
        <LoadingSpinner />
        <Loading>Loading Highlight...</Loading>
      </LoadingOverlay>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center bg-black">
        <h1 className="text-2xl font-semibold mb-4 text-white">{error}</h1>
        <button
          className="px-4 py-2 bg-[#541011] text-white rounded-lg hover:bg-white hover:text-[#541011] transition duration-200"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return highlight ? (
    <VerticalHighlightViewer
      highlights={[highlight]}
      startIndex={0}
      onClose={() => navigate('/')}
    />
  ) : null;
};

export default HighlightPage;
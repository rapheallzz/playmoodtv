import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';

const useChannelDetails = (user) => {
  const [bannerImage, setBannerImage] = useState('');
  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [about, setAbout] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [data, setData] = useState([]);
  const [subscribers, setSubscribers] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const fetchChannelDetails = async () => {
      if (isFetchingRef.current || !user?._id) return;
      setIsLoading(true);
      isFetchingRef.current = true;
      try {
        const response = await axios.get(
          `${BASE_API_URL}/api/channel/my-channel/${user._id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        const content = Array.isArray(response.data.content) ? response.data.content : [];
        const uniqueContent = [...new Map(content.map(item => [item._id, item])).values()];
        setBannerImage(response.data.bannerImage || '');
        setProfileImage(response.data.profileImage || '');
        setCreatorName(response.data.name || '');
        setAbout(response.data.about || '');
        setInstagram(response.data.instagram || '');
        setTiktok(response.data.tiktok || '');
        setLinkedin(response.data.linkedin || '');
        setTwitter(response.data.twitter || '');
        setSubscribers(response.data.subscribers || 0);
        setData(uniqueContent);
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching channel details:', error);
        setErrorMessage('Failed to load channel details. Please try again later.');
      } finally {
        isFetchingRef.current = false;
        setIsLoading(false);
      }
    };

    if (user && user._id) {
      fetchChannelDetails();
    }
  }, [user]);

  const uploadBannerAndGetUrl = async (file, token) => {
    // 1. Get signature from the backend
    const { data } = await axios.post(
      `${BASE_API_URL}/api/content/signature`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const sigData = typeof data === 'string' ? JSON.parse(data) : data;

    // 2. Upload the file directly to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', sigData.api_key);
    formData.append('timestamp', sigData.timestamp);
    formData.append('signature', sigData.signature);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/di97mcvbu/image/upload`;
    const { data: cloudinaryData } = await axios.post(cloudinaryUrl, formData);

    // Return the full response to get URL and public_id
    return cloudinaryData;
  };

  const handleUpdateChannelInfo = async (file = null) => {
    setErrorMessage('');
    try {
      const fileToUpload = file || bannerImageFile;
      let bannerData = {};

      // Step 1: Upload banner if a new file is present and get its data
      if (fileToUpload) {
        const cloudinaryResponse = await uploadBannerAndGetUrl(fileToUpload, user.token);
        bannerData = {
          bannerImage: cloudinaryResponse.secure_url,
          bannerImagePublicId: cloudinaryResponse.public_id,
        };
      }

      // Step 2: Consolidate all channel information into a single payload
      const payload = {
        name: creatorName,
        about,
        instagram,
        tiktok,
        linkedin,
        twitter,
        ...bannerData, // Add banner data if it exists
      };

      // Step 3: Send a single PUT request to update all channel info
      const response = await axios.put(
        `${BASE_API_URL}/api/channel/${user._id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Update state with the response from the server
      setBannerImage(response.data.bannerImage || bannerImage);
      setProfileImage(response.data.profileImage || '');
      setCreatorName(response.data.name || '');
      setAbout(response.data.about || '');
      setInstagram(response.data.instagram || '');
      setTiktok(response.data.tiktok || '');
      setLinkedin(response.data.linkedin || '');
      setTwitter(response.data.twitter || '');
      setBannerImageFile(null); // Clear the file state
      setErrorMessage('');
      return { success: true };
    } catch (error) {
      console.error('Error updating channel info:', error);
      setErrorMessage(
        error.response?.data?.message ||
        'Failed to update channel. Please check your inputs or try again later.'
      );
      return { success: false };
    }
  };

  return {
    bannerImage,
    setBannerImageFile,
    profileImage,
    creatorName,
    setCreatorName,
    about,
    setAbout,
    instagram,
    setInstagram,
    tiktok,
    setTiktok,
    linkedin,
    setLinkedin,
    twitter,
    setTwitter,
    data,
    subscribers,
    errorMessage,
    handleUpdateChannelInfo,
    isLoading,
  };
};

export default useChannelDetails;
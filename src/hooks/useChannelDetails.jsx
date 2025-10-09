import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/my-channel/${user._id}`,
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
      `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/signature`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 2. Upload the file directly to Cloudinary
    const sigData = typeof data === 'string' ? JSON.parse(data) : data;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', sigData.api_key);
    formData.append('timestamp', sigData.timestamp);
    formData.append('signature', sigData.signature);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/di97mcvbu/image/upload`;
    const { data: cloudinaryData } = await axios.post(cloudinaryUrl, formData);

    return cloudinaryData.secure_url;
  };

  const handleUpdateChannelInfo = async () => {
    setErrorMessage('');
    try {
      // Step 1: Handle banner image upload and update if a new file is present.
      if (bannerImageFile) {
        const bannerUrl = await uploadBannerAndGetUrl(bannerImageFile, user.token);
        await axios.post(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/${user._id}/banner`,
          { bannerImage: bannerUrl },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setBannerImage(bannerUrl);
      }

      // Step 2: Update the rest of the channel information (text fields).
      const payload = {
        name: creatorName,
        about,
        instagram,
        tiktok,
        linkedin,
        twitter,
      };

      const response = await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/${user._id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Update state with the response from the general info update
      setBannerImage(response.data.bannerImage || bannerImage);
      setProfileImage(response.data.profileImage || '');
      setCreatorName(response.data.name || '');
      setAbout(response.data.about || '');
      setInstagram(response.data.instagram || '');
      setTiktok(response.data.tiktok || '');
      setLinkedin(response.data.linkedin || '');
      setTwitter(response.data.twitter || '');
      setBannerImageFile(null);
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
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

  const handleUpdateChannelInfo = async () => {
    setErrorMessage('');
    try {
      let payload;
      let headers;

      if (bannerImageFile) {
        payload = new FormData();
        payload.append('name', creatorName);
        payload.append('about', about);
        payload.append('instagram', instagram);
        payload.append('tiktok', tiktok);
        payload.append('linkedin', linkedin);
        payload.append('twitter', twitter);
        payload.append('bannerImage', bannerImageFile);
        headers = {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        };
      } else {
        payload = {
          name: creatorName,
          about,
          instagram,
          tiktok,
          linkedin,
          twitter,
        };
        headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        };
      }

      const response = await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/${user._id}`,
        payload,
        { headers }
      );

      setBannerImage(response.data.bannerImage || '');
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
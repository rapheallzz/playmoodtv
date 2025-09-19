import React, { useState, useEffect } from 'react';
import MobileBurger from '../components/headers/MobileBurger';
import DesktopHeader from '../components/headers/DesktopHeader';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AiOutlineClose, AiOutlineUser, AiOutlineHeart, AiOutlineStar, AiOutlineEye } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import SliderLiked from '../components/sliders/SlideLiked';
import UserWatchlist from '../components/sliders/UserSliderWatchlist';
import UserFavourite from '../components/sliders/UserSliderFavourite';
import UserRecommended from '../components/miscSlider/UserSliderRecommended';
import TermsModal from '../components/Terms';
import { VideoModal } from '../components/ModalVU'; // Ensure this import is correct
import MessageModal from '../components/MessageModal';
import DonationModal from '../components/DonationModal';
import Sliderfriends from '../components/Sliderfriends';
import Footer from '../components/footer/Footer';
import { updateAuthUser, logout } from '../features/authSlice';
import defaultImage from '../assets/default-image.jpg';
import {jwtDecode} from 'jwt-decode'; // Ensure this import is present
import EmailVerificationModal from '../components/modals/EmailVerificationModal';

const defaultProfileIcon = '/default-profile.png';

function Dashboardpage() {
  const [edit, show_edit] = useState(false);
  const [billing, set_billing] = useState(false);
  const [channels, set_channels] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [activeAction, setActiveAction] = useState('LIKES');
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [showCreatorConfirmPopup, setShowCreatorConfirmPopup] = useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);

  const [personalData, setPersonalData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    city: '',
    age: '',
    address: '',
  });

  const [billingData, setBillingData] = useState({
    bankLocation: 'United States',
    accountHolderName: '',
    beneficiaryName: '',
    bankName: '',
    routingNumber: '',
    abaRouting: '',
    accountHolderNameSecondary: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: authUser, userToken } = useSelector((state) => state.auth);
  const isAdmin = authUser && authUser.role === 'admin';
  const isCreator = authUser && authUser.role === 'creator';
  let userId = authUser && authUser.userId;

  // Derive userId from token if not in authUser
  if (!userId && userToken) {
    try {
      const decoded = jwtDecode(userToken);
      userId = decoded.id;
    } catch (error) {
      console.error('Error decoding token for userId:', error);
    }
  }

  const handle_edit = () => show_edit(!edit);
  const handle_billing_clicked = () => set_billing(!billing);
  const handleActionClick = (action) => setActiveAction(action);
  const handleDonationClick = () => setShowDonationModal(true);
  const handleDonationClose = () => setShowDonationModal(false);
  const handleVideoModalClose = () => setShowVideoModal(false);
  const handleAddVideo = () => setShowVideoModal(true);
  const handleSubscriptionSubmit = (event) => {
    event.preventDefault();
    console.log('Email submitted');
    setShowDonationModal(false);
  };

  const handleClose = () => {
    show_edit(false);
    setProfileImage(null);
    setProfileImagePreview(null);
  };

  const handlePersonalInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const fetchUserData = async () => {
    if (!authUser || !authUser.token) {
      console.log('fetchUserData: No authUser or token, checking localStorage');
      const cachedUser = JSON.parse(localStorage.getItem('user'));
      if (cachedUser && cachedUser.token) {
        console.log('fetchUserData: Found cached user with token, dispatching updateAuthUser');
        const decoded = jwtDecode(cachedUser.token);
        const updatedUser = {
          ...cachedUser,
          userId: cachedUser.userId || decoded.id || cachedUser._id,
        };
        dispatch(updateAuthUser(updatedUser));
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setPersonalData({
          name: cachedUser.name || '',
          email: cachedUser.email || '',
          phone: cachedUser.phone || '',
          dateOfBirth: cachedUser.dateOfBirth || '',
          city: cachedUser.city || '',
          age: cachedUser.age || '',
          address: cachedUser.address || '',
        });
        setBillingData({
          bankLocation: cachedUser.billing?.bankLocation || 'United States',
          accountHolderName: cachedUser.billing?.accountHolderName || '',
          beneficiaryName: cachedUser.billing?.beneficiaryName || '',
          bankName: cachedUser.billing?.bankName || '',
          routingNumber: cachedUser.billing?.routingNumber || '',
          abaRouting: cachedUser.billing?.abaRouting || '',
          accountHolderNameSecondary: cachedUser.billing?.accountHolderNameSecondary || '',
        });
        setProfileImagePreview(cachedUser.profileImage || defaultProfileIcon);
        if (!cachedUser.verified) {
          setShowEmailVerificationModal(true);
        }
        setIsLoadingUser(false);
      } else {
        setIsLoadingUser(false);
        navigate('/login');
      }
      return;
    }

    try {
      const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/profile/', {
        headers: { Authorization: `Bearer ${authUser.token}` },
      });
      const fetchedUser = response.data.user;
      if (fetchedUser) {
        const imageUrl = fetchedUser.profileImage
          ? `${fetchedUser.profileImage}?t=${new Date().getTime()}`
          : defaultProfileIcon;
        const decoded = jwtDecode(authUser.token);
        const updatedUser = {
          ...fetchedUser,
          userId: fetchedUser._id || decoded.id,
          profileImage: imageUrl,
          token: authUser.token,
        };
        dispatch(updateAuthUser(updatedUser));
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('fetchUserData stored in localStorage:', updatedUser);
        setPersonalData({
          name: fetchedUser.name || '',
          email: fetchedUser.email || '',
          phone: fetchedUser.phone || '',
          dateOfBirth: fetchedUser.dateOfBirth || '',
          city: fetchedUser.city || '',
          age: fetchedUser.age || '',
          address: fetchedUser.address || '',
        });
        setBillingData({
          bankLocation: fetchedUser.billing?.bankLocation || 'United States',
          accountHolderName: fetchedUser.billing?.accountHolderName || '',
          beneficiaryName: fetchedUser.billing?.beneficiaryName || '',
          bankName: fetchedUser.billing?.bankName || '',
          routingNumber: fetchedUser.billing?.routingNumber || '',
          abaRouting: fetchedUser.billing?.abaRouting || '',
          accountHolderNameSecondary: fetchedUser.billing?.accountHolderNameSecondary || '',
        });
        setProfileImagePreview(imageUrl);
        if (!fetchedUser.verified) {
          setShowEmailVerificationModal(true);
        }
      }
      setIsLoadingUser(false);
    } catch (error) {
      console.error('fetchUserData error:', error.response?.data || error.message);
      toast.error('Failed to fetch user data. Using cached data.');
      const cachedUser = JSON.parse(localStorage.getItem('user'));
      if (cachedUser && cachedUser.token) {
        const decoded = jwtDecode(cachedUser.token);
        const imageUrl = cachedUser.profileImage
          ? `${cachedUser.profileImage}?t=${new Date().getTime()}`
          : defaultProfileIcon;
        const updatedUser = {
          ...cachedUser,
          userId: cachedUser.userId || decoded.id || cachedUser._id,
          profileImage: imageUrl,
          token: cachedUser.token,
        };
        dispatch(updateAuthUser(updatedUser));
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('fetchUserData stored cached user in localStorage:', updatedUser);
        setPersonalData({
          name: cachedUser.name || '',
          email: cachedUser.email || '',
          phone: cachedUser.phone || '',
          dateOfBirth: cachedUser.dateOfBirth || '',
          city: cachedUser.city || '',
          age: cachedUser.age || '',
          address: cachedUser.address || '',
        });
        setBillingData({
          bankLocation: cachedUser.billing?.bankLocation || 'United States',
          accountHolderName: cachedUser.billing?.accountHolderName || '',
          beneficiaryName: cachedUser.billing?.beneficiaryName || '',
          bankName: cachedUser.billing?.bankName || '',
          routingNumber: cachedUser.billing?.routingNumber || '',
          abaRouting: cachedUser.billing?.abaRouting || '',
          accountHolderNameSecondary: cachedUser.billing?.accountHolderNameSecondary || '',
        });
        setProfileImagePreview(imageUrl);
        if (!cachedUser.verified) {
          setShowEmailVerificationModal(true);
        }
      } else {
        navigate('/login');
      }
      setIsLoadingUser(false);
    }
  };

  const fetchCreatorRequestStatus = async () => {
    if (authUser && authUser.token && userId) {
      try {
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/rolechange/', {
          headers: { Authorization: `Bearer ${authUser.token}` },
        });
        const requests = response.data;
        const pendingRequest = requests.find((request) => request.userId === userId && request.status === 'pending');
        setHasPendingRequest(!!pendingRequest);
      } catch (error) {
        console.error('fetchCreatorRequestStatus error:', error);
      }
    }
  };

  useEffect(() => {
    console.log('Dashboard useEffect:', { authUser, userToken, userId });
    if (!authUser || !userToken) {
      const cachedUser = JSON.parse(localStorage.getItem('user'));
      if (cachedUser && cachedUser.token) {
        console.log('Restoring user from localStorage:', cachedUser);
        try {
          const decoded = jwtDecode(cachedUser.token);
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            console.log('useEffect: Token expired, clearing localStorage');
            localStorage.removeItem('user');
            dispatch(logout());
            navigate('/login');
            return;
          }
          const updatedUser = {
            ...cachedUser,
            userId: cachedUser.userId || decoded.id || cachedUser._id,
          };
          dispatch(updateAuthUser(updatedUser));
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
          console.error('useEffect: Error decoding token:', error);
          localStorage.removeItem('user');
          dispatch(logout());
          navigate('/login');
          return;
        }
      } else {
        navigate('/login');
        return;
      }
    }
    if (authUser && authUser.token) {
      fetchUserData();
      fetchCreatorRequestStatus();
    }
  }, [authUser, userToken, dispatch, navigate]);

  const updateProfileImage = async (userId, file, token) => {
    if (!userId) {
      console.error('updateProfileImage: userId is undefined');
      toast.error('User ID is missing. Please try logging in again.');
      dispatch(logout());
      navigate('/login');
      return;
    }
    if (!token) {
      console.error('updateProfileImage: token is missing');
      toast.error('Authentication token is missing. Please log in again.');
      dispatch(logout());
      navigate('/login');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('profileImage', file);
      const response = await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUser = response.data.user;
      const imageUrl = updatedUser.profileImage
        ? `${updatedUser.profileImage}?t=${new Date().getTime()}`
        : defaultProfileIcon;
      const userWithToken = { ...updatedUser, userId: updatedUser._id || userId, token };
      dispatch(updateAuthUser(userWithToken));
      localStorage.setItem('user', JSON.stringify(userWithToken));
      console.log('updateProfileImage stored in localStorage:', userWithToken);
      setProfileImagePreview(imageUrl);
      setProfileImage(null);
      toast.success('Profile image updated successfully!');
      return imageUrl;
    } catch (error) {
      console.error('updateProfileImage error:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        dispatch(logout());
        navigate('/login');
      } else {
        toast.error('Failed to update profile image.');
      }
      throw error;
    }
  };

  const validatePersonalData = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{7,15}$/;
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    if (!personalData.name || !nameRegex.test(personalData.name)) {
      toast.error('Please enter a valid name (at least 2 characters, letters only).');
      return false;
    }
    if (!personalData.email || !emailRegex.test(personalData.email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }
    if (personalData.phone && !phoneRegex.test(personalData.phone)) {
      toast.error('Please enter a valid phone number.');
      return false;
    }
    if (personalData.age && (isNaN(personalData.age) || personalData.age < 0 || personalData.age > 120)) {
      toast.error('Please enter a valid age (0-120).');
      return false;
    }
    return true;
  };

  const validateBillingData = () => {
    const routingRegex = /^\d{9}$/;
    if (billingData.routingNumber && !routingRegex.test(billingData.routingNumber)) {
      toast.error('Routing number must be 9 digits.');
      return false;
    }
    if (billingData.accountHolderName !== billingData.accountHolderNameSecondary) {
      toast.error('Account holder names must match.');
      return false;
    }
    return true;
  };

  const updateProfile = async () => {
    if (!validatePersonalData()) return;
    if (!userId) {
      console.error('updateProfile: userId is undefined');
      toast.error('User ID is missing. Please try logging in again.');
      dispatch(logout());
      navigate('/login');
      return;
    }
    if (!authUser.token) {
      console.error('updateProfile: token is missing');
      toast.error('Authentication token is missing. Please log in again.');
      dispatch(logout());
      navigate('/login');
      return;
    }
    try {
      let updatedProfileImage = authUser.profileImage;
      if (profileImage) {
        updatedProfileImage = await updateProfileImage(userId, profileImage, authUser.token);
      }
      const response = await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/${userId}`,
        {
          name: personalData.name,
          email: personalData.email,
          phone: personalData.phone,
          dateOfBirth: personalData.dateOfBirth,
          city: personalData.city,
          age: personalData.age,
          address: personalData.address,
          profileImage: updatedProfileImage,
        },
        {
          headers: { Authorization: `Bearer ${authUser.token}` },
        }
      );
      const updatedUser = response.data.user;
      const imageUrl = updatedUser.profileImage
        ? `${updatedUser.profileImage}?t=${new Date().getTime()}`
        : defaultProfileIcon;
      const userWithToken = { ...updatedUser, userId: updatedUser._id || userId, token: authUser.token };
      dispatch(updateAuthUser(userWithToken));
      localStorage.setItem('user', JSON.stringify(userWithToken));
      console.log('updateProfile stored in localStorage:', userWithToken);
      setProfileImagePreview(imageUrl);
      handleClose();
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('updateProfile error:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        dispatch(logout());
        navigate('/login');
      } else {
        toast.error('Failed to update profile.');
      }
    }
  };

  const updateBillingInfo = async () => {
    if (!validateBillingData()) return;
    if (!userId) {
      console.error('updateBillingInfo: userId is undefined');
      toast.error('User ID is missing. Please try logging in again.');
      dispatch(logout());
      navigate('/login');
      return;
    }
    try {
      const response = await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/${userId}`,
        {
          billing: {
            bankLocation: billingData.bankLocation,
            accountHolderName: billingData.accountHolderName,
            beneficiaryName: billingData.beneficiaryName || '',
            bankName: billingData.bankName,
            routingNumber: billingData.routingNumber,
            abaRouting: billingData.abaRouting,
            accountHolderNameSecondary: billingData.accountHolderNameSecondary,
          },
        },
        {
          headers: { Authorization: `Bearer ${authUser.token}` },
        }
      );
      const updatedUser = response.data.user;
      const userWithToken = { ...updatedUser, userId: updatedUser._id || userId, token: authUser.token };
      dispatch(updateAuthUser(userWithToken));
      localStorage.setItem('user', JSON.stringify(userWithToken));
      console.log('updateBillingInfo stored in localStorage:', userWithToken);
      toast.success('Billing information updated successfully!');
      set_billing(false);
    } catch (error) {
      console.error('updateBillingInfo error:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        dispatch(logout());
        navigate('/login');
      } else {
        toast.error('Failed to update billing information.');
      }
    }
  };

  const handleApplyAsCreator = () => {
    if (hasPendingRequest) return;
    if (!userId) {
      console.error('handleApplyAsCreator: userId is undefined');
      toast.error('User ID is missing. Please try logging in again.');
      dispatch(logout());
      navigate('/login');
      return;
    }
    setShowCreatorConfirmPopup(true);
  };

  const confirmApplyAsCreator = async () => {
    try {
      const response = await axios.post(
        'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/rolechange',
        { userId, requestedRole: 'creator' },
        { headers: { Authorization: `Bearer ${authUser.token}` } }
      );
      if (response.status === 201) {
        setMessage('Your request to become a creator has been submitted.');
        setHasPendingRequest(true);
        await fetchCreatorRequestStatus();
      } else {
        setMessage('There was an issue submitting your request. Please try again.');
      }
    } catch (error) {
      console.error('confirmApplyAsCreator error:', error);
      setMessage('There was an issue submitting your request. Please try again.');
    }
    setShowCreatorConfirmPopup(false);
    setShowMessageModal(true);
  };

  const handleProfileImageClick = async () => {
    if (isLoadingUser) {
      toast.info('Please wait, user data is still loading.');
      return;
    }
    if (!userId) {
      console.error('handleProfileImageClick: userId is undefined');
      toast.error('User ID is missing. Please try logging in again.');
      dispatch(logout());
      navigate('/login');
      return;
    }
    if (!authUser.token) {
      console.error('handleProfileImageClick: token is missing');
      toast.error('Authentication token is missing. Please log in again.');
      dispatch(logout());
      navigate('/login');
      return;
    }
    try {
      await updateProfileImage(userId, profileImage, authUser.token);
    } catch (error) {
      setProfileImagePreview(authUser.profileImage || defaultProfileIcon);
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Dashboard>
      <Mainsection>
        {isMobile ? (
          <Hamburger onClick={() => handle_sidebar_hover()}>
            <MobileBurger channels={channels} set_channels={set_channels} />
          </Hamburger>
        ) : (
          <DesktopHeader channels={channels} set_channels={set_channels} />
        )}

        <EmailVerificationModal
          show={showEmailVerificationModal}
          onClose={() => setShowEmailVerificationModal(false)}
          email={authUser?.email}
          userId={userId}
        />

        {channels && (
          <div className="h-[500px] w-[1000px] absolute top-[100px] left-[250px] z-[1001] overflow-hidden flex justify-center items-center rounded-2xl md:w-4/5 md:h-4/5 md:left-20 md:top-[100px]">
            <button
              className="absolute w-5 h-5 top-2.5 right-2.5 bg-red-500 border-none rounded-full text-white text-lg cursor-pointer"
              onClick={() => set_channels(false)}
            >
              <AiOutlineClose />
            </button>
            <img
              src={defaultImage}
              alt=""
              className="w-full h-full absolute object-cover top-0 left-0 z-[-1]"
            />
            <div className="h-fit w-4/5 flex justify-center items-center flex-col gap-2.5">
              <h2 className="text-white text-2xl md:text-xl" style={{ textShadow: '2px 2px red' }}>
                This feature is Coming Soon
              </h2>
              <p className="text-white text-xl md:text-sm" style={{ textShadow: '1px 1px red' }}>
                Our content creators are doing great, and we are building a special platform for them!
              </p>
              <form className="flex justify-center items-center gap-5 w-1/2 mx-auto md:flex-col">
                <input name="name" placeholder="Name" type="text" className="px-5 py-2.5 rounded-full" />
                <input name="email" placeholder="Email" type="email" className="px-5 py-2.5 rounded-full" />
                <button className="bg-red-500 px-5 py-2.5 text-white border-none rounded-full cursor-pointer">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        )}

        <User className="w-4/5 mx-auto my-20 flex justify-between items-center">
          {!edit ? (
            <>
              <div
                className="w-36 h-36 rounded-full bg-white flex items-center justify-center font-semibold"
                onClick={() => document.getElementById('profileImage').click()}
              >
                <img
                  src={profileImagePreview || authUser?.profileImage || defaultProfileIcon}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                  onError={(e) => (e.target.src = defaultProfileIcon)}
                />
              </div>
              <input
                type="file"
                id="profileImage"
                className="hidden"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProfileImage(file);
                    setProfileImagePreview(URL.createObjectURL(file));
                    try {
                      await updateProfileImage(userId, file, authUser.token);
                    } catch (error) {
                      setProfileImagePreview(authUser.profileImage || defaultProfileIcon);
                    }
                  }
                }}
              />
              <h1 className="text-white">{authUser && authUser.name}</h1>
            </>
          ) : (
            <div className="flex items-center text-white gap-12">
              <div className="bg-[#541011] rounded-full p-5">
                <FaEdit />
              </div>
              <h1>{authUser && authUser.name}</h1>
            </div>
          )}

          <div className="flex flex-row justify-center align-middle gap-2">
            <h3 className="text-white text-base">EDIT PROFILE</h3>
            <div
              className="h-15 w-12 flex items-center justify-center cursor-pointer text-white text-[20px]"
              onClick={handle_edit}
            >
              <FaEdit />
            </div>
          </div>

          <div className="dash-btn flex">
            {isAdmin && (
              <button
                className="bg-[#541011] text-[#f3f3f3] py-2 px-8 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:bg-white hover:text-[#541011]"
                onClick={() => navigate('/admin')}
              >
                Admin Page
              </button>
            )}
            {!isCreator && (
              <button
                className={`bg-[#541011] text-[#f3f3f3] py-2 px-8 border-none rounded text-base font-normal transition-colors duration-300 ease-in-out m-2 ${
                  hasPendingRequest ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-[#541011]'
                }`}
                onClick={handleApplyAsCreator}
                disabled={hasPendingRequest}
              >
                {hasPendingRequest ? 'Pending Request' : 'Become a Creator'}
              </button>
            )}
            {isCreator && (
              <>
                <button
                  className="bg-[#541011] text-[#f3f3f3] py-2 px-8 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:bg-white hover:text-[#541011]"
                  onClick={() => navigate('/creatorpage')}
                >
                  View Channel
                </button>
                <button
                  className="bg-[#541011] text-[#f3f3f3] py-2 px-8 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:bg-white hover:text-[#541011]"
                  onClick={handleAddVideo}
                >
                  Upload a Video for Review
                </button>
              </>
            )}
          </div>
        </User>

        {showVideoModal && <VideoModal onClose={handleVideoModalClose} />}

        <MessageModal show={showMessageModal} onClose={() => setShowMessageModal(false)} message={message} />

        {showCreatorConfirmPopup && (
          <PopupOverlay>
            <PopupContainer>
              <CloseButton onClick={() => setShowCreatorConfirmPopup(false)} aria-label="Close confirmation popup">
                ×
              </CloseButton>
              <h2 className="text-white text-xl font-semibold mb-4">Apply to Become a Creator</h2>
              <p className="text-white text-base mb-6">
                Are you sure you want to apply to become a creator? This will submit a request for admin approval.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-[#541011] text-white py-2 px-6 rounded text-base font-normal hover:bg-white hover:text-[#541011] transition-colors"
                  onClick={confirmApplyAsCreator}
                >
                  Confirm
                </button>
                <button
                  className="bg-transparent text-white py-2 px-6 border border-white rounded text-base font-normal hover:bg-[#541011] transition-colors"
                  onClick={() => setShowCreatorConfirmPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </PopupContainer>
          </PopupOverlay>
        )}

        {!edit ? (
          <>
            <Useractions className="h-fit w-1/3 ml-36 flex justify-between gap-5 md:relative md:left-36 md:w-full md:my-1 md:ml-0 md:gap-0 md:justify-center md:text-xs">
              <button
                className="flex items-center justify-center mr-2 text-[#541011] bg-[#f3f3f3] py-2 px-4 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:text-white hover:bg-[#541011]"
                onClick={() => handleActionClick('LIKES')}
              >
                <AiOutlineHeart />
                <span className="ml-1 text-xs">LIKES</span>
              </button>
              <button
                className="flex items-center justify-center mr-2 text-[#541011] bg-[#f3f3f3] py-2 px-4 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:text-white hover:bg-[#541011]"
                onClick={() => handleActionClick('FAVORITES')}
              >
                <AiOutlineStar />
                <span className="ml-1 text-xs">FAVORITES</span>
              </button>
              <button
                className="flex items-center justify-center mr-2 text-[#541011] bg-[#f3f3f3] py-2 px-4 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:text-white hover:bg-[#541011]"
                onClick={() => handleActionClick('FOR YOU')}
              >
                <AiOutlineUser />
                <span className="ml-1 text-xs">FOR_YOU</span>
              </button>
              <button
                className="flex items-center justify-center mr-2 text-[#541011] bg-[#f3f3f3] py-2 px-4 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:text-white hover:bg-[#541011]"
                onClick={() => handleActionClick('WATCHLIST')}
              >
                <AiOutlineEye />
                <span className="ml-1 text-xs">WATCHLIST</span>
              </button>
            </Useractions>

            <UserSlider className="w-4/5 mx-auto my-2 h-72 md:w-[90%] md:mx-auto">
              {activeAction === 'LIKES' && <SliderLiked />}
              {activeAction === 'FAVORITES' && <UserFavourite />}
              {activeAction === 'FOR YOU' && <UserRecommended />}
              {activeAction === 'WATCHLIST' && <UserWatchlist />}
            </UserSlider>

            <UseractionsInteraction>
              <button onClick={handleDonationClick} className="text-white text-sm font-medium">
                DONATIONS
              </button>
              <button onClick={handleDonationClick} className="text-white text-sm font-medium">
                SUBSCRIPTION
              </button>
              <button onClick={handleDonationClick} className="text-white text-sm font-medium">
                FRIENDS
              </button>
              <button onClick={handleDonationClick} className="text-white text-sm font-medium">
                FRIENDS REQUEST
              </button>
              <button onClick={handleDonationClick} className="text-white text-sm font-medium">
                BLOCK USERS
              </button>
            </UseractionsInteraction>

            <DonationModal isOpen={showDonationModal} onClose={handleDonationClose} onSubmit={handleSubscriptionSubmit} />

            <Friendsslider>
              <Sliderfriends />
            </Friendsslider>

            <div className="w-4/5 mx-auto my-12 h-72 flex justify-between sm:w-9/10 sm:flex-col sm:ml-32 sm:items-center">
              <div className="w-1/5 h-full flex flex-col gap-2.5">
                <button className="py-1 bg-none text-white rounded-sm border border-white cursor-pointer hover:text-red-500">
                  Activity history
                </button>
                <button className="py-1 bg-none text-white rounded-sm border border-white cursor-pointer hover:text-red-500">
                  Manage cookies
                </button>
                <button className="py-1 bg-none text-white rounded-sm border border-white cursor-pointer hover:text-red-500">
                  Remove cache
                </button>
              </div>
              <div className="w-3/4 h-full border border-white p-4 rounded-md">
                <div className="flex gap-5 text-white">
                  <h4>History</h4>
                  <button className="bg-none border border-white py-1 px-1.5 text-white rounded-sm">
                    Remove history
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-4/5 h-fit bg-black mx-auto my-10 rounded-lg flex flex-col p-8 relative shadow-lg">
            <button className="absolute top-4 right-4 text-white text-2xl hover:text-red-500" onClick={handleClose}>
              ×
            </button>
            <h2 className="text-white text-3xl font-semibold mb-6">Edit Profile</h2>
            <form className="flex flex-col gap-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src={profileImagePreview || defaultProfileIcon}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="mt-2 text-white text-sm cursor-pointer hover:text-[#541011]">
                  Change Profile Picture
                  <input type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-white text-sm mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={personalData.name}
                    onChange={handlePersonalInputChange}
                    placeholder="Enter your full name"
                    className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-white text-sm mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={personalData.email}
                    onChange={handlePersonalInputChange}
                    placeholder="Enter your email"
                    className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-white text-sm mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={personalData.phone}
                    onChange={handlePersonalInputChange}
                    placeholder="Enter your phone number"
                    className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-white text-sm mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={personalData.dateOfBirth}
                    onChange={handlePersonalInputChange}
                    className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-white text-sm mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={personalData.city}
                    onChange={handlePersonalInputChange}
                    placeholder="Enter your city"
                    className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-white text-sm mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={personalData.age}
                    onChange={handlePersonalInputChange}
                    placeholder="Enter your age"
                    className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
                    min="0"
                    max="120"
                  />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="text-white text-sm mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={personalData.address}
                    onChange={handlePersonalInputChange}
                    placeholder="Enter your address"
                    className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
                  />
                </div>
              </div>

              <button
                type="button"
                className="w-52 mt-4 py-3 bg-transparent text-white border border-white rounded-md hover:bg-[#541011] hover:text-white transition-colors"
                onClick={updateProfile}
              >
                Save Profile
              </button>

              <button
                type="button"
                className="w-52 mt-2 py-3 bg-transparent text-white border border-white rounded-md hover:text-[#541011] transition-colors"
                onClick={handle_billing_clicked}
              >
                {billing ? 'Hide Billing Info' : 'Show Billing Info'}
              </button>

              {billing && (
                <div className="mt-6">
                  <h3 className="text-white text-xl font-medium mb-4">Billing Information</h3>
                  <p className="text-xs text-white mb-2">Why do we ask for your bank information?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="text-white text-sm mb-1">Bank Location</label>
                      <select
                        name="bankLocation"
                        value={billingData.bankLocation}
                        onChange={handleBillingInputChange}
                        className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md focus:outline-none focus:border-[#541011]"
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-white text-sm mb-1">Account Holder's Name</label>
                      <input
                        type="text"
                        name="accountHolderName"
                        value={billingData.accountHolderName}
                        onChange={handleBillingInputChange}
                        placeholder="Name as on bank documents"
                        className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-white text-sm mb-1">Beneficiary Name</label>
                      <input
                        type="text"
                        name="beneficiaryName"
                        value={billingData.beneficiaryName}
                        onChange={handleBillingInputChange}
                        placeholder="Beneficiary Name"
                        className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-white text-sm mb-1">Bank Name</label>
                      <input
                        type="text"
                        name="bankName"
                        value={billingData.bankName}
                        onChange={handleBillingInputChange}
                        placeholder="Bank Name"
                        className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-white text-sm mb-1">9-Digit Routing Number</label>
                      <input
                        type="text"
                        name="routingNumber"
                        value={billingData.routingNumber}
                        onChange={handleBillingInputChange}
                        placeholder="9 digits"
                        className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-white text-sm mb-1">Routing (ABA)</label>
                      <input
                        type="text"
                        name="abaRouting"
                        value={billingData.abaRouting}
                        onChange={handleBillingInputChange}
                        placeholder="Routing (ABA)"
                        className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-white text-sm mb-1">Confirm Account Holder's Name</label>
                      <input
                        type="text"
                        name="accountHolderNameSecondary"
                        value={billingData.accountHolderNameSecondary}
                        onChange={handleBillingInputChange}
                        placeholder="Name as on bank documents"
                        className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-52 mt-6 py-3 bg-transparent text-white border border-white rounded-md hover:bg-[#541011] hover:text-white transition-colors"
                    onClick={updateBillingInfo}
                  >
                    Save Billing
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
        <Footer />
      </Mainsection>
    </Dashboard>
  );
}

export default Dashboardpage;

// Styled components
const Dashboard = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
`;
const Mainsection = styled.div`
  width: 100%;
  height: 100%;
  background-color: #191818;
  display: flex;
  flex-direction: column;
  .edit-profile {
    width: 55vw;
    height: fit-content;
    background-color: grey;
    margin: 10px auto 10px auto;
    border-radius: 10px;
    display: flex;
    padding: 60px 20px 20px 40px;
    flex-direction: column;
    .billing_information_section {
      display: flex;
      height: fit-content;
      width: 100%;
      .billing_section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 20px;
        width: 100%;
        .billing_infos {
          display: flex;
          width: 100%;
          height: fit-content;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          .billing_infos_section_one {
            .billing_info_enter {
              color: white;
              font-size: 1rem;
            }
            .billing_info_why {
              font-size: 0.6rem;
              color: white;
            }
            .billing_info_location {
              font-size: 0.8rem;
              color: white;
            }
            .billing_info_country {
              width: 15vw;
              padding: 4px;
            }
            .billing_info_name {
              font-size: 0.8rem;
              color: white;
            }
            .billing_info_inputs {
              width: 20vw;
              padding: 4px;
            }
          }
          .billing_section_secondsection {
            .billing_info_enter {
              color: white;
              font-size: 1rem;
            }
            .billing_info_why {
              font-size: 0.6rem;
              color: white;
            }
            .billing_info_location {
              font-size: 0.8rem;
              color: white;
            }
            .billing_info_country {
              width: 15vw;
              padding: 4px;
            }
            .billing_info_name {
              font-size: 0.8rem;
              color: white;
            }
            .billing_info_inputs {
              width: 20vw;
              padding: 4px;
            }
          }
        }
        .billing_info_enter {
          color: white;
          font-size: 1rem;
        }
        .billing_info_why {
          font-size: 0.6rem;
          color: white;
        }
        .billing_info_location {
          font-size: 0.8rem;
          color: white;
        }
        .billing_info_country {
          width: 15vw;
          padding: 4px;
        }
        .billing_info_name {
          font-size: 0.8rem;
          color: white;
        }
        .billing_info_inputs {
          width: 20vw;
          padding: 4px;
        }
      }
      .billing_section_secondsection {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 20px;
        .billing_info_enter {
          color: white;
          font-size: 1rem;
        }
        .billing_info_why {
          font-size: 0.6rem;
          color: white;
        }
        .billing_info_location {
          font-size: 0.8rem;
          color: white;
        }
        .billing_info_country {
          width: 15vw;
          padding: 4px;
        }
        .billing_info_name {
          font-size: 0.8rem;
          color: white;
        }
        .billing_info_inputs {
          width: 20vw;
          padding: 4px;
        }
      }
    }
    .billing-btn {
      width: 200px;
      margin-top: 20px;
      height: 50px;
      background: none;
      color: white;
      border: 1px solid white;
      &:hover {
        color: #541011;
        cursor: pointer;
      }
    }
    .user-data {
      color: white;
      font-size: 2rem;
      font-weight: 400;
    }
    .user-info {
      width: 100%;
      height: fit-content;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      .user-info-first {
        display: flex;
        flex-direction: column;
        width: 50%;
        padding: 0px 20px 0px 0px;
        gap: 10px;
        input {
          width: 100%;
          padding: 15px;
          background: none;
          color: white;
          border: 1px solid white;
          &::placeholder {
            color: white;
          }
        }
      }
      .user-info-second {
        display: flex;
        flex-direction: column;
        width: 50%;
        padding: 0px 0px 0px 20px;
        gap: 10px;
        input {
          width: 100%;
          padding: 15px;
          background: none;
          color: #fff;
          border: 1px solid white;
          &::placeholder {
            color: white;
          }
        }
      }
    }
  }
`;
const Hamburger = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;
    svg {
      font-size: 40px;
    }
  }
`;
const User = styled.div`
  width: 80%;
  margin: 100px auto 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user-edits {
    display: flex;
    align-items: center;
    color: white;
    gap: 50px;
    .user-edits-container {
      background-color: #541011;
      border-radius: 100%;
      padding: 20px;
    }
  }
  .picture-placeholder {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  .edit-user-dashboard {
    display: flex;
    flex-direction: row;
    gap: 10px;
    h3 {
      padding-top: 20px;
      color: white;
      font-size: 1.0rem;
    }
    .edit-button-dashboard {
      height: 60px;
      width: 50px;
      background-color: ;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img {
        height: 25px;
        width: 25px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    .user-edits {
      margin-top: 20px;
      text-align: center;
      gap: 20px;
    }
    .picture-placeholder {
      width: 100px;
      height: 100px;
      font-size: 1.2rem;
    }
    .edit-user-dashboard {
      margin-top: 20px;
      flex-direction: column;
      align-items: center;
      h3 {
        margin-bottom: 10px;
      }
      .edit-button-dashboard {
        width: 30px;
        height: 30px;
        img {
          height: 15px;
        }
      }
    }
  }
`;
const Useractions = styled.div`
  height: fit-content;
  width: 30%;
  margin-left: 150px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  p {
    color: white;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    position: relative;
    left: 150px;
    margin: 2px 0;
    margin-left: 0px;
    gap: 0px;
    justify-content: center;
    flex-direction: column;
    font-size: 8px;
  }
`;
const UserSlider = styled.div`
  width: 80%;
  margin: 10px auto;
  height: 300px;
  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 10px auto;
  }
`;
const UseractionsInteraction = styled.div`
  height: fit-content;
  width: 50%;
  margin-left: 150px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  p {
    color: white;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 85%;
    margin: 20px auto;
    flex-direction: column;
    align-items: center;
    font-size: 15px;
    p {
      margin-bottom: 10px;
    }
  }
`;
const Friendsslider = styled.div`
  width: 80%;
  margin: 50px auto 20px auto;
  height: 200px;
  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 50px auto;
  }
`;
const Popup = styled.div`
  height: 500px;
  width: 1000px;
  position: absolute;
  top: 100px;
  left: 250px;
  z-index: 1001;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  @media screen and (max-width: 1000px) {
    width: 70%;
    height: 70%;
    left: 80px;
    top: 100px;
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    top: 0;
    left: 0;
    z-index: -1;
  }
  div {
    height: fit-content;
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    h2 {
      color: white;
      font-size: 2rem;
      text-shadow: 2px 2px red;
      @media screen and (max-width: 1000px) {
        font-size: 1.2rem;
      }
    }
    p {
      color: white;
      font-size: 1.2rem;
      text-shadow: 1px 1px red;
      @media screen and (max-width: 1000px) {
        font-size: 0.9rem;
      }
    }
    .form {
      display: flex;
      justify-content: center;
      align-item: center;
      gap: 20px;
      width: 50%;
      margin: 0px auto 0px auto;
      @media screen and (max-width: 1000px) {
        flex-direction: column;
      }
      .inputfield {
        padding: 10px 20px;
        border-radius: 20px;
      }
      .subscribe-button {
        background-color: red;
        padding: 10px 20px;
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
      }
    }
  }
`;
const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1002; /* Above other modals */
  padding: 1rem;
`;
const PopupContainer = styled.div`
  background: #191818;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #dc2626;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

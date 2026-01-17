import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
import { FiClock, FiPlay, FiAlertCircle } from 'react-icons/fi';
import DesktopHeader from '../components/headers/DesktopHeader';
import MobileBurger from '../components/headers/MobileBurger';
import BASE_API_URL from '../apiConfig';
import Footer from '../components/footer/Footer';

export default function Schedule() {
  const [schedule, setSchedule] = useState({ liveProgram: null, upcomingPrograms: [] });
  const [loading, setLoading] = useState(true);
  const [channels, set_channels] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [liveEdge, setLiveEdge] = useState(0);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const refreshTimeoutRef = useRef(null);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/live-programs/today`);
      const data = response.data;
      setSchedule(data);

      if (data.liveProgram) {
        setLiveEdge(data.liveProgram.currentPlaybackTime);

        // Calculate when to refresh (when current program ends)
        const duration = data.liveProgram.contentId?.duration || 0;
        const remaining = duration - data.liveProgram.currentPlaybackTime;

        if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
        if (remaining > 0) {
            refreshTimeoutRef.current = setTimeout(() => {
                fetchSchedule();
            }, remaining * 1000);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    // Increment live edge every second
    const interval = setInterval(() => {
        setLiveEdge(prev => prev + 1);
    }, 1000);

    return () => {
        window.removeEventListener('resize', handleResize);
        clearInterval(interval);
        if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
        if (videoRef.current.currentTime > liveEdge) {
            videoRef.current.currentTime = liveEdge;
        }
    }
  };

  useEffect(() => {
    if (videoRef.current && schedule.liveProgram) {
      const video = videoRef.current;
      const initialTime = schedule.liveProgram.currentPlaybackTime;

      const setInitialTime = () => {
        if (video.readyState >= 2) {
          video.currentTime = initialTime;
        }
      };

      if (video.readyState >= 2) {
        setInitialTime();
      } else {
        video.addEventListener('loadeddata', setInitialTime, { once: true });
      }
    }
  }, [schedule.liveProgram]);

  const handleProgramClick = (program) => {
    // For upcoming programs, maybe just show a preview or navigate to movie page?
    // User said "play the gotten live content video", which I am doing in the hero.
    // Clicking upcoming could just show info or do nothing if it's not live yet.
    if (program.contentId?._id) {
        const titleSlug = program.contentId.title.replace(/\s+/g, '-');
        navigate(`/movie/${titleSlug}-${program.contentId._id}`);
    }
  };

  if (loading) {
    return <PageWrapper>Loading...</PageWrapper>;
  }

  return (
    <PageWrapper>
      {isMobile ? (
        <Hamburger>
          <MobileBurger channels={channels} set_channels={set_channels} />
        </Hamburger>
      ) : (
        <DesktopHeader channels={channels} set_channels={set_channels} />
      )}

      <MainContent>
        {/* Hero Section: Live Player */}
        <HeroSection>
          {schedule.liveProgram ? (
            <PlayerContainer>
              <div className="live-badge">
                <span className="dot"></span> LIVE NOW
              </div>
              <video
                ref={videoRef}
                src={schedule.liveProgram.contentId?.video}
                autoPlay
                muted
                controls
                onTimeUpdate={handleTimeUpdate}
                controlsList="noseek" // Non-standard but some browsers respect
              />
              <ProgramOverlay>
                <h2>{schedule.liveProgram.contentId?.title}</h2>
                <p>{schedule.liveProgram.contentId?.description}</p>
                <div className="time-info">
                    <FiClock /> {schedule.liveProgram.startTime} - {schedule.liveProgram.endTime}
                </div>
              </ProgramOverlay>
            </PlayerContainer>
          ) : (
            <StayTunedContainer>
                <div className="content">
                    <FiAlertCircle size={64} color="#541011" />
                    <h1>STAY TUNED</h1>
                    <p>No program is currently on air. Check the schedule below for upcoming content.</p>
                </div>
            </StayTunedContainer>
          )}
        </HeroSection>

        {/* Upcoming Section */}
        <UpcomingSection>
          <SectionTitle>Upcoming Programs</SectionTitle>
          <HorizontalScroll>
            {schedule.upcomingPrograms.length > 0 ? (
              schedule.upcomingPrograms.map((program) => (
                <ProgramCard key={program._id} onClick={() => handleProgramClick(program)}>
                  <div className="thumbnail">
                    {program.contentId?.thumbnail ? (
                        <img src={program.contentId.thumbnail} alt={program.contentId.title} />
                    ) : (
                        <div className="placeholder"><FiPlay size={32} /></div>
                    )}
                    <div className="time-tag">{program.startTime}</div>
                  </div>
                  <div className="info">
                    <h3>{program.contentId?.title}</h3>
                    <p className="category">{program.contentId?.category}</p>
                  </div>
                </ProgramCard>
              ))
            ) : (
              <p className="no-upcoming">No more programs scheduled for today.</p>
            )}
          </HorizontalScroll>
        </UpcomingSection>
      </MainContent>

      <Footer />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 80px;
`;

const HeroSection = styled.section`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

const PlayerContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #111;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .live-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #541011;
    color: #fff;
    padding: 6px 12px;
    border-radius: 50px;
    font-weight: 800;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 10;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);

    .dot {
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
      animation: pulse 1.5s infinite;
    }
  }

  @keyframes pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  }
`;

const ProgramOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 60px 40px 40px;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  pointer-events: none;

  h2 {
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }

  p {
    font-size: 1.1rem;
    color: #ccc;
    max-width: 600px;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .time-info {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    color: #541011;
    background: #fff;
    width: fit-content;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    padding: 30px 20px 20px;
    h2 { font-size: 1.5rem; }
    p { font-size: 0.9rem; }
  }
`;

const StayTunedContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #111;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px dashed #333;

  .content {
    max-width: 400px;
    h1 {
        font-size: 3rem;
        font-weight: 900;
        letter-spacing: -2px;
        margin: 20px 0 10px;
    }
    p {
        color: #666;
        font-weight: 500;
    }
  }
`;

const UpcomingSection = styled.section`
  padding: 40px 20px 80px;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-left: 4px solid #541011;
  padding-left: 15px;
`;

const HorizontalScroll = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  .no-upcoming {
    color: #666;
    font-style: italic;
  }
`;

const ProgramCard = styled.div`
  min-width: 300px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
    .thumbnail img { transform: scale(1.1); }
  }

  .thumbnail {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 12px;
    overflow: hidden;
    background: #222;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s;
    }

    .placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #444;
    }

    .time-tag {
        position: absolute;
        bottom: 10px;
        left: 10px;
        background: rgba(0,0,0,0.8);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 700;
    }
  }

  .info {
    margin-top: 12px;
    h3 {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 4px;
        line-height: 1.2;
    }
    .category {
        font-size: 11px;
        font-weight: 900;
        color: #541011;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
  }
`;

const Hamburger = styled.div`
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 100;
`;

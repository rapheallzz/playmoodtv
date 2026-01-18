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
    const content = program.contentId;
    if (content?._id) {
        navigate(`/movie/${content._id}`, {
          state: {
            movie: content.video,
            title: content.title || '',
            desc: content.description || '',
            credits: content.credit || '',
          },
        });
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
        <BrandHeader>
          <span className="playmood">PLAYMOOD</span><span className="tv">TV</span>
        </BrandHeader>
        <LayoutContainer>
          {/* Left Column: Player */}
          <PlayerColumn>
            {schedule.liveProgram ? (
              <PlayerWrapper>
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
                  controlsList="noseek"
                />
                <ProgramDetails>
                  <h1>{schedule.liveProgram.contentId?.title}</h1>
                  <p>{schedule.liveProgram.contentId?.description}</p>
                </ProgramDetails>
              </PlayerWrapper>
            ) : (
              <StayTunedContainer>
                  <div className="content">
                      <FiAlertCircle size={64} color="#541011" />
                      <h1>STAY TUNED</h1>
                      <p>No program is currently on air. Check the guide for upcoming content.</p>
                  </div>
              </StayTunedContainer>
            )}
          </PlayerColumn>

          {/* Right Column: Vertical Schedule Guide */}
          <ScheduleColumn>
            <GuideHeader>
                <SectionTitle>TV Guide</SectionTitle>
                <p className="today-label">Today's Schedule</p>
            </GuideHeader>
            <VerticalList>
              {/* Currently Live Item in Guide */}
              {schedule.liveProgram && (
                <GuideItem active={true} onClick={() => {}}>
                  <div className="time-col">
                    <span className="time">{schedule.liveProgram.startTime}</span>
                    <span className="status">ON AIR</span>
                  </div>
                  <div className="content-col">
                    <h3 className="title">{schedule.liveProgram.contentId?.title}</h3>
                    <p className="category">{schedule.liveProgram.contentId?.category}</p>
                  </div>
                </GuideItem>
              )}

              {/* Upcoming Items */}
              {schedule.upcomingPrograms.length > 0 ? (
                schedule.upcomingPrograms.map((program) => (
                  <GuideItem key={program._id} active={false} onClick={() => handleProgramClick(program)}>
                    <div className="time-col">
                      <span className="time">{program.startTime}</span>
                    </div>
                    <div className="content-col">
                      <h3 className="title">{program.contentId?.title}</h3>
                      <p className="category">{program.contentId?.category}</p>
                    </div>
                  </GuideItem>
                ))
              ) : !schedule.liveProgram ? (
                <p className="no-guide">No programs scheduled for today.</p>
              ) : null}
            </VerticalList>
          </ScheduleColumn>
        </LayoutContainer>
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
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
`;

const BrandHeader = styled.div`
  padding: 20px 20px 0;
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -2px;

  .playmood { color: #b51315; }
  .tv { color: #fff; }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    text-align: center;
    padding-top: 40px;
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  gap: 30px;
  padding: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const PlayerColumn = styled.div`
  flex: 2;
  min-width: 0;
`;

const ScheduleColumn = styled.div`
  flex: 1;
  background: #111;
  border-radius: 20px;
  padding: 30px;
  height: fit-content;
  max-height: 800px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #333 #111;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 10px;
  }
`;

const PlayerWrapper = styled.div`
  position: relative;

  video {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #000;
    border-radius: 20px;
    object-fit: cover;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  }

  .live-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #541011;
    padding: 6px 12px;
    border-radius: 50px;
    font-weight: 800;
    font-size: 11px;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 10;

    .dot {
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
      animation: pulse 1.5s infinite;
    }
  }

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const ProgramDetails = styled.div`
  margin-top: 25px;
  padding: 0 10px;

  h1 {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 12px;
  }

  p {
    color: #888;
    line-height: 1.6;
    font-size: 1.1rem;
    max-width: 800px;
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

  .content {
    h1 {
        font-size: 3rem;
        font-weight: 900;
        margin: 20px 0 10px;
    }
    p { color: #666; }
  }
`;

const GuideHeader = styled.div`
  margin-bottom: 30px;
  .today-label {
    font-size: 12px;
    font-weight: 700;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 5px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
`;

const VerticalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  .no-guide {
    color: #555;
    font-style: italic;
    text-align: center;
    padding: 40px 0;
  }
`;

const GuideItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 15px;
  background: ${props => props.active ? 'rgba(84, 16, 17, 0.1)' : '#1a1a1a'};
  border: 1px solid ${props => props.active ? '#541011' : 'transparent'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? 'rgba(84, 16, 17, 0.15)' : '#222'};
    transform: translateX(5px);
  }

  .time-col {
    display: flex;
    flex-direction: column;
    min-width: 60px;

    .time {
        font-weight: 800;
        font-size: 14px;
        color: ${props => props.active ? '#541011' : '#fff'};
    }
    .status {
        font-size: 9px;
        font-weight: 900;
        color: #541011;
        margin-top: 2px;
    }
  }

  .content-col {
    .title {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 4px;
        color: ${props => props.active ? '#fff' : '#ccc'};
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .category {
        font-size: 10px;
        font-weight: 900;
        color: ${props => props.active ? '#541011' : '#555'};
        text-transform: uppercase;
    }
  }
`;

const Hamburger = styled.div`
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 100;
`;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Onboarding.css';

const Onboarding = () => {
  return (
    <div className="onboarding-container">
      <div className="onboarding-content">
        <h1 className="onboarding-title">Welcome to Playmood!</h1>
        <p className="onboarding-description">
          We're excited to have you on board. Here are a few features to get you started:
        </p>
        <ul className="features-list">
          <li>✨ Personalized movie recommendations</li>
          <li>🎬 Access to exclusive content</li>
          <li>📺 Create and share watchlists</li>
        </ul>
        <Link to="/dashboard" className="get-started-btn">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Onboarding;
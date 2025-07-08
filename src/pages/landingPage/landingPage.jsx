import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './landingPage.css';
import bgImage from '../../assets/bg-temple.png';
import journiqaAvatar from '../../assets/avatar.png';

export default function LandingPage() {
  const [stage, setStage] = useState(0); // 0 = idle, 1 = spinner, 2 = expand, 3 = show logo
  const navigate = useNavigate();

  const startAnimation = () => {
    setStage(1); // Start spinner

    // Progress through animation stages
    setTimeout(() => setStage(2), 800);   // Show expanding circle
    setTimeout(() => setStage(3), 1400);  // Show logo + bg
    setTimeout(() => navigate('/auth'), 2500); // Navigate after logo shown
  };

  return (
    <div className="landing-container">
      <img src={bgImage} alt="Background" className="landing-bg" />
      <div className="landing-overlay" />

      {/* ANIMATION LAYERS */}
      {stage >= 1 && <div className="circle-loader" />}
      {stage >= 2 && <div className="circle-expand" />}
      {stage === 3 && (
        <div className="logo-reveal">
          <img src={journiqaAvatar} alt="Journiqa" className="logo-avatar" />
          <div className="logo-text">Journiqa</div>
        </div>
      )}

      {/* CONTENT */}
      <div className={`landing-content ${stage > 0 ? 'fade-out' : 'fade-in'}`}>
        <h1 className="landing-title">Jump into the Rhythm</h1>
        <p className="landing-subtitle">Experience the ultimate school concert, redefined.</p>
        <button onClick={startAnimation} className="landing-btn" disabled={stage > 0}>
          {stage > 0 ? 'Loading...' : 'Get Started'}
        </button>
      </div>
    </div>
  );
}

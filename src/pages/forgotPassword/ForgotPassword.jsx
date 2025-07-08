// ForgotPassword.jsx
import React, { useState } from 'react';
import '../authPage/authPage.css';
import bgImage from '../../assets/bg-temple.png';
import avatarImage from '../../assets/avatar.png';
import { IoIosArrowBack } from "react-icons/io";

export default function ForgotPassword({ onBackToSignIn }) {
  const [step, setStep] = useState(1);

  function handleNext() {
    setStep(prev => prev + 1);
  }

  function handleConfirm() {
    setStep(4); // success step
  }

  return (
    <div className="page-container">
      <div className="responsive-wrapper">
        <div className="branding-panel"></div>

        <div className="form-panel">
          <div className="auth-container">

            <header className="auth-header">
              <img src={bgImage} alt="Background" className="auth-header-image" />
              <button
                className="auth-header-back-button"
                onClick={() => {
                  if (step === 1) {
                    onBackToSignIn();
                  } else {
                    setStep(step - 1);
                  }
                }}
                aria-label="Go Back"
              >
                <IoIosArrowBack />
              </button>
              <div className="avatar-container">
                <div className="avatar">
                  <img src={avatarImage} alt="Avatar" className="avatar-image" />
                </div>
              </div>
            </header>

            <main className="form-container">
              {step === 1 && <StepEmail onNext={handleNext} onBack={onBackToSignIn} />}
              {step === 2 && <StepVerify onNext={handleNext} />}
              {step === 3 && <StepNewPassword onConfirm={handleConfirm} />}
              {step === 4 && <SuccessPopup />}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

// Components below styled and integrated:

function StepEmail({ onNext, onBack }) {
  return (
    <div className="step-card">
      <h2 className="step-title">Forgot Password?</h2>
      <p className="step-desc">Enter your email and we’ll send you a link to reset your password.</p>

      <div className="input-group">
        <input type="email" placeholder="Email Address" className="form-input" />
      </div>

      <button className="submit-button" onClick={onNext}>Send Verify Code</button>

      <button
        type="button"
        className="back-link"
        onClick={onBack}
      >
        Back to Sign In
      </button>
    </div>
  );
}

function StepVerify({ onNext }) {
  return (
    <div className="step-card">
      <h2 className="step-title">Verify</h2>
      <p className="step-desc">Please enter the code we sent to your email</p>

      <div className="code-boxes">
        {[...Array(4)].map((_, i) => (
          <input
            key={i}
            maxLength={1}
            className="code-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        ))}
      </div>

      <div className="resend">
        Didn’t receive the code? <button className="resend-link" type="button">Resend Code</button>
      </div>

      <button className="submit-button" onClick={onNext}>Verify Code</button>

      <div className="step-indicator">1 of 3</div>
    </div>
  );
}

function StepNewPassword({ onConfirm }) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="step-card">
      <h2 className="step-title">Create New Password</h2>

      <div className="input-group">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          className="form-input"
        />
      </div>

      <div className="input-group">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          className="form-input"
        />
      </div>

      <label className="show-password">
        <input
          type="checkbox"
          onChange={() => setShowPassword(prev => !prev)}
        /> Show password
      </label>

      <button className="submit-button" onClick={onConfirm}>Confirm</button>

      <div className="step-indicator">2 of 3</div>
    </div>
  );
}

function SuccessPopup() {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/auth'; // redirect to login page
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="success-popup">
      <div className="popup-card">
        <div className="paper-plane">✈️</div>
        <h3>Congratulations!</h3>
        <p>Password reset successful.<br />You'll be redirected to login.</p>
      </div>
    </div>
  );
}

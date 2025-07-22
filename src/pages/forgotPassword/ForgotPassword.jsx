//src/pages/forgotPassword/ForgotPassword.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../authPage/authPage.css";
import bgImage from "../../assets/bg-temple.png";
import avatarImage from "../../assets/avatar.png";
import { IoIosArrowBack } from "react-icons/io";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  function handleNext() {
    setStep((prev) => prev + 1);
  }

  function handleConfirm() {
    setStep(4); // success step
  }

  function handleBackToSignIn() {
    navigate("/auth");
  }

  return (
    <div className="page-container">
      <div className="responsive-wrapper">
        <div className="branding-panel"></div>

        <div className="form-panel">
          <div className="auth-container">
            <header className="auth-header">
              <img
                src={bgImage}
                alt="Background"
                className="auth-header-image"
              />
              <button
                className="auth-header-back-button"
                onClick={() => {
                  if (step === 1) {
                    handleBackToSignIn();
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
                  <img
                    src={avatarImage}
                    alt="Avatar"
                    className="avatar-image"
                  />
                </div>
              </div>
            </header>

            <main className="form-container">
              {step === 1 && (
                <StepEmail onNext={handleNext} onBack={handleBackToSignIn} />
              )}
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
      <p className="step-desc">
        Enter your email and we'll send you a link to reset your password.
      </p>

      <div className="input-group">
        <input
          type="email"
          placeholder="Email Address"
          className="form-input"
        />
      </div>

      <button className="submit-button" onClick={onNext}>
        Send Verify Code
      </button>

      <button type="button" className="back-link" onClick={onBack}>
        Back to Sign In
      </button>
    </div>
  );
}

function StepVerify({ onNext }) {
  // ใช้ useRef เพื่อเก็บ reference ของ input แต่ละช่อง
  const inputsRef = React.useRef([]);

  // เช็คว่าพิมพ์ช่องไหนอยู่
  const handleChange = (e, index) => {
    const value = e.target.value;
    
    // ตรวจสอบว่าค่าที่กรอกเป็นตัวเลข
    if (/^\d$/.test(value)) {
      // ถ้ายังไม่ใช่ช่องสุดท้าย ให้ focus ไปช่องถัดไป
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    } else {
      e.target.value = '';
    }
  };

  return (
    <div className="step-card">
      <h2 className="step-title">Verify</h2>
      <p className="step-desc">Please enter the code we sent to your email</p>

      {/* กล่องกรอก OTP จำนวน 4 ช่อง */}
      <div className="code-boxes">
        {[...Array(4)].map((_, i) => (
          <input
            key={i}                           // ให้ react รู้ว่าช่องนี้มี index อะไร
            maxLength={1}                    // จำกัดให้พิมพ์ได้แค่ 1 ตัวอักษร
            className="code-input"         
            type="text"                    
            inputMode="numeric"             // ใช้ numeric keyboard บนอุปกรณ์มือถือ
            pattern="[0-9]*"                // รับเฉพาะตัวเลข
            ref={el => inputsRef.current[i] = el}  // เก็บ reference ของ input แต่ละช่อง
            onChange={e => handleChange(e, i)}     // เรียกเมื่อมีการเปลี่ยนแปลงในช่อง
            onKeyDown={(e) => {
              // ถ้ากด backspace แล้วช่องนั้นว่างอยู่ และไม่ใช่ช่องแรก
              // ให้ย้าย focus กลับไปช่องก่อนหน้า
              if (e.key === 'Backspace' && !e.target.value && i > 0) {
                inputsRef.current[i - 1].focus();
              }
            }}
          />
        ))}
      </div>

      <div className="resend">
        Didn't receive the code? <button className="resend-link" type="button">Resend Code</button>
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
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="form-input"
        />
      </div>

      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className="form-input"
        />
      </div>

      <label className="show-password">
        <input
          type="checkbox"
          onChange={() => setShowPassword((prev) => !prev)}
        />{" "}
        Show password
      </label>

      <button className="submit-button" onClick={onConfirm}>
        Confirm
      </button>

      <div className="step-indicator">2 of 3</div>
    </div>
  );
}

function SuccessPopup() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth"); // Navigate to auth page using React Router
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-popup">
      <div className="popup-card">
        <div className="paper-plane">✈️</div>
        <h3>Congratulations!</h3>
        <p>
          Password reset successful.
          <br />
          You'll be redirected to login.
        </p>
      </div>
    </div>
  );
}
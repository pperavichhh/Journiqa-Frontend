// src/pages/authPage/authPage.jsx
import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import "./authPage.css";

// Import รูปภาพและไอคอนเหมือนเดิม
import bgImage from "../../assets/bg-temple.png";
import avatarImage from "../../assets/avatar.png";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard after successful login/register
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="page-container">
      {/* New: Wrapper สำหรับ Responsive Layout */}
      <div className="responsive-wrapper">
        {/* New: คอลัมน์ซ้ายสำหรับรูปภาพ (แสดงเฉพาะบนจอใหญ่) */}
        <div className="branding-panel"></div>

        {/* คอลัมน์ขวาสำหรับฟอร์ม (โค้ดเดิมของเรา) */}
        <div className="form-panel">
          <div className="auth-container">
            {/* Header Section */}
            <header className="auth-header">
              <img
                src={bgImage}
                alt="Background"
                className="auth-header-image"
              />
              <button 
                className="auth-header-back-button"
                onClick={() => navigate('/')}
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

            {/* Form Section */}
            <main className="form-container">
              <div className="auth-toggle">
                <button
                  onClick={() => setIsLogin(true)}
                  className={isLogin ? "active" : "inactive"}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={!isLogin ? "active" : "inactive"}
                >
                  Register
                </button>
              </div>

              <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <span className="input-icon">
                    <MdOutlineEmail />
                  </span>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="form-input"
                    required
                  />
                </div>

                <div className="input-group">
                  <span className="input-icon">
                    <RiLockPasswordLine />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="form-input"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>

                {!isLogin && (
                  <div className="input-group">
                    <span className="input-icon">
                      <RiLockPasswordLine />
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmed Password"
                      className="form-input"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                )}

                <div className="form-actions">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember Me</span>
                  </label>
                  <a href="/forgot-password" className="forgot-password-link">
                    Forgot Password?
                  </a>
                </div>

                <button 
                  type="submit" 
                  className={`submit-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-text">
                      {isLogin ? "Signing In..." : "Creating Account..."}
                    </span>
                  ) : (
                    isLogin ? "Sign In" : "Sign Up"
                  )}
                </button>
              </form>

              <div className="divider-container">
                <div className="divider">
                  <div className="divider-line">
                    <div />
                  </div>
                  <div className="divider-text-container">
                    <span className="divider-text">
                      {isLogin ? "Or sign up with" : "Or connect"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="social-login-container">
                <button className="social-button" onClick={() => navigate('/dashboard')}>
                  <FcGoogle size={22} />
                </button>
                <button className="social-button" onClick={() => navigate('/dashboard')}>
                  <FaApple size={22} />
                </button>
                <button className="social-button" onClick={() => navigate('/dashboard')}>
                  <FaFacebook size={22} color="#1877F2" />
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
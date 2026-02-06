import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Redirect if not completed
    if (localStorage.getItem("bingoCompleted") !== "true") {
      navigate("/thank-you", { replace: true });
      return;
    }

    // 2. Disable Back Button Logic
    // Push a new entry to the history stack immediately
    window.history.pushState(null, null, window.location.href);

    const handlePopState = () => {
      // If they hit back, push them forward again
      window.history.pushState(null, null, window.location.href);
    };

    // 3. Prevent Refresh/Close Warning
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Standard browsers requirement
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .app-container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f0f2f5;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .success-card {
          position: relative;
          width: 100%;
          max-width: 390px;
          height: 100vh;
          background: white;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .hero-section {
          position: relative;
          width: 102%;
          left: -1%;
          background: #4666f6;
          padding: 60px 20px 80px;
          text-align: center;
          z-index: 1;
        }

        .hero-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(115deg, rgba(255,255,255,0.1) 25%, transparent 25.1%, transparent 50%, rgba(255,255,255,0.1) 50.1%, rgba(255,255,255,0.1) 75%, transparent 75.1%);
          background-size: 100px 100%;
          z-index: -1;
        }

        .main-title {
          font-size: 48px;
          font-weight: 800;
          color: #fff8a6;
          -webkit-text-stroke: 1.5px #000;
          line-height: 1.1;
          margin-bottom: 10px;
        }

        .subtitle {
          color: white;
          font-size: 18px;
          font-weight: 700;
        }

        .white-curve {
          position: absolute;
          bottom: -1px;
          left: -10%;
          width: 120%;
          height: 60px;
          background: white;
          clip-path: ellipse(50% 100% at 50% 100%);
          z-index: 2;
        }

        .content-section {
          flex: 1;
          padding: 30px 25px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: white;
          text-align: center;
        }

        .verification-box {
          background: #fffdf0;
          border: 2px dashed #4666f6;
          padding: 20px;
          border-radius: 16px;
          margin-bottom: 30px;
          width: 100%;
        }

        .verification-text {
          font-size: 14px;
          font-weight: 700;
          color: #000;
          line-height: 1.5;
        }

        .socials {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .social-link {
          padding: 14px;
          border-radius: 12px;
          background: #f0f2f5;
          color: #4666f6;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
        }

        .community-btn {
          padding: 20px;
          border-radius: 12px;
          background: #5aa100;
          color: white;
          text-decoration: none;
          font-weight: 800;
          font-size: 18px;
          margin-top: 10px;
          box-shadow: 0 4px 15px rgba(90, 161, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div className="app-container">
        <div className="success-card">
          <div className="hero-section">
            <h1 className="main-title">🎉 Bingo!<br/>Winner</h1>
            <p className="subtitle">All tasks completed</p>
            <div className="white-curve"></div>
          </div>

          <div className="content-section">
            <div className="verification-box">
              <p className="verification-text">
                📢 DO NOT REFRESH THIS PAGE.<br/><br/>
                Show this screen to the host now to verify your entries and claim your surprise gift!
              </p>
            </div>
            
            <div className="socials">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="social-link">
                Follow on Instagram
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="social-link">
                Connect on LinkedIn
              </a>
              <a href="#" className="community-btn">
                Join Our Community 🚀
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
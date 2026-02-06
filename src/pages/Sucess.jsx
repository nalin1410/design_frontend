import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("bingoCompleted") !== "true") {
      navigate("/thank-you", { replace: true });
      return;
    }
    window.history.pushState(null, null, window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, null, window.location.href);
    };
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate]);

  const Icons = {
    Globe: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    Instagram: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    Linkedin: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  };

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
        }

        .success-card {
          width: 100%;
          max-width: 400px;
          height: 100vh;
          background: white;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          position: relative;
          scrollbar-width: none;
        }
        .success-card::-webkit-scrollbar { display: none; }

        .hero-header {
          background: #4666f6;
          padding: 50px 20px 70px;
          text-align: center;
          position: relative;
          flex-shrink: 0;
        }

        /* Restoring the Original Bold Yellow Title */
        .hero-header h1 {
          font-size: 44px;
          font-weight: 800;
          color: #fff8a6;
          -webkit-text-stroke: 1.5px #000;
          line-height: 1.1;
          margin-bottom: 5px;
        }

        .hero-subtitle {
          color: white;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.5px;
        }

        .white-curve {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 40px;
          background: white;
          clip-path: ellipse(50% 100% at 50% 100%);
        }

        .content { padding: 25px 20px; flex: 1; }

        /* Restoring the dashed verification box from your screenshot */
        .verification-box {
          background: #fffdf0;
          border: 2px dashed #4666f6;
          padding: 20px;
          border-radius: 16px;
          margin-bottom: 30px;
          text-align: center;
        }

        .verification-text {
          font-size: 14px;
          font-weight: 800;
          color: #000;
          line-height: 1.5;
        }

        .community-section {
          text-align: center;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .community-logo {
          width: 80px;
          height: 80px;
          object-fit: cover;
          margin-bottom: 12px;
          border-radius: 50%;
          border: 2px solid #000;
          box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
        }

        .community-title {
          font-size: 22px;
          font-weight: 800;
          color: #000;
          margin-bottom: 15px;
        }

        .social-row {
          display: flex;
          gap: 20px;
          margin-bottom: 25px;
        }

        .social-icon {
          color: #4666f6;
          background: #f0f2f5;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .social-icon:active { transform: scale(0.9); background: #4666f6; color: white; }

        .join-btn {
          width: 100%;
          max-width: 280px;
          padding: 16px;
          border-radius: 12px;
          background: #5aa100;
          color: white;
          text-decoration: none;
          font-weight: 800;
          font-size: 16px;
          box-shadow: 0 4px 15px rgba(90, 161, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .divider {
          width: 60px;
          height: 4px;
          background: #f0f2f5;
          margin: 0 auto 40px;
          border-radius: 10px;
        }
      `}</style>

      <div className="app-container">
        <div className="success-card">
          <div className="hero-header">
            <h1>🎉 BINGO!<br/>WINNER</h1>
            <p className="hero-subtitle">Designer Day Out Collab</p>
            <div className="white-curve"></div>
          </div>

          <div className="content">
            {/* The Verification Box from your screenshot */}
            <div className="verification-box">
              <p className="verification-text">
                Show this screen to the host now to verify your entries!
              </p>
            </div>

            {/* COMMUNITY 1 */}
            <div className="community-section">
              <img src="/logo.jpeg" alt="Draft Room Logo" className="community-logo" />
              <h2 className="community-title">The Draft Room</h2>
              <div className="social-row">
                <a href="https://the-draft-room.vercel.app/" target="_blank" rel="noreferrer" className="social-icon"><Icons.Globe /></a>
                <a href="https://instagram.com/the.draft.room" target="_blank" rel="noreferrer" className="social-icon"><Icons.Instagram /></a>
                <a href="https://linkedin.com/company/thedraftroomcommunity" target="_blank" rel="noreferrer" className="social-icon"><Icons.Linkedin /></a>
              </div>
              <a href="https://chat.whatsapp.com/Ixvv9uknVMv9QWhyRMpvSn" className="join-btn">
                Join Community 🚀
              </a>
            </div>

            <div className="divider"></div>

            {/* COMMUNITY 2 */}
            <div className="community-section">
              <img src="/cultur_logo_square.png" alt="Cultur Logo" className="community-logo" />
              <h2 className="community-title">Cultur</h2>
              <div className="social-row">
                <a href="https://www.cultur.design/" target="_blank" rel="noreferrer" className="social-icon"><Icons.Globe /></a>
                <a href="https://www.instagram.com/cultur.we/" target="_blank" rel="noreferrer" className="social-icon"><Icons.Instagram /></a>
                <a href="https://www.linkedin.com/company/culturwe/" target="_blank" rel="noreferrer" className="social-icon"><Icons.Linkedin /></a>
              </div>
              <a href="https://chat.whatsapp.com/IkmSFfVPALe48nzQHJIUhv" className="join-btn">
                Join Community 🚀
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
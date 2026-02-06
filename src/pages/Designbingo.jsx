import React from "react";
import { useNavigate } from "react-router-dom";
import cappy from "../assets/Group.png"; 

const DesignBingo = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

        /* Reset everything to zero */
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .app-container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #000; /* Contrast color to check for gaps */
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .bingo-card {
          position: relative;
          width: 100%;
          max-width: 450px; /* Limits width on desktop */
          height: 100vh;
          background: #fff;
          /* This is the 'mask' that hides the bleed */
          overflow: hidden; 
          display: flex;
          flex-direction: column;
        }

        .hero-section {
          position: relative;
          /* BLEED: Make it slightly wider than 100% and offset it */
          width: 102%;
          left: -1%; 
          flex: 1.3;
          background: #4666f6;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 60px;
          background-image: linear-gradient(
            110deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25.1%,
            transparent 45%,
            rgba(255, 255, 255, 0.1) 45.1%,
            rgba(255, 255, 255, 0.1) 60%,
            transparent 60.1%
          );
        }

        .subtitle {
          color: white;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .main-title {
          font-size: clamp(42px, 10vw, 58px);
          font-weight: 800;
          color: #fff8a6;
          text-align: center;
          line-height: 1.1;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
        }

        .mascot-img {
          width: 200px;
          margin-top: auto;
          z-index: 5;
          filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));
        }

        /* The Curve: Also bled past the edges */
        .white-ground {
          position: absolute;
          bottom: -2px;
          left: -10%;
          width: 120%; 
          height: 120px;
          background: white;
          clip-path: ellipse(50% 100% at 50% 100%);
          z-index: 2;
        }

        .content-section {
          position: relative;
          flex: 0.7;
          /* BLEED: Ensure bottom section also covers any side gaps */
          width: 102%;
          left: -1%;
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          background: white;
        }

        .description {
          font-size: 19px;
          color: #8a8e9b;
          line-height: 1.4;
          font-weight: 500;
          max-width: 280px;
          margin-top: 30px;
        }

        .start-button {
          position: relative;
          width: 100%;
          max-width: 320px;
          background: #4865f6;
          color: white;
          border: none;
          padding: 22px 0;
          border-radius: 22px;
          font-size: 24px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 20px;
        }

        .button-accent {
          position: absolute;
          width: 12px;
          height: 4px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
        }
        .acc-tl { top: 12px; left: 14px; transform: rotate(-45deg); }
        .acc-tr { top: 12px; right: 14px; transform: rotate(45deg); }

        @media (min-width: 450px) {
          .bingo-card {
            height: 844px;
            border-radius: 40px;
          }
        }
      `}</style>

      <div className="app-container">
        <div className="bingo-card">
          <div className="hero-section">
            <p className="subtitle">Designer Day Out</p>
            <h1 className="main-title">Design Bingo</h1>
            
            <img src={cappy} alt="Mascot" className="mascot-img" />
            
            <div className="white-ground"></div>
          </div>

          <div className="content-section">
            <p className="description">
              Meet new designers. Complete tasks. Win a prize.
            </p>

            <button className="start-button" onClick={() => navigate("/signup")}>
              <span className="button-accent acc-tl"></span>
              <span className="button-accent acc-tr"></span>
              Start
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignBingo;
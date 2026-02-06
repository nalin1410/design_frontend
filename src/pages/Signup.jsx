import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import { useEffect } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("signedUp") === "true") {
      navigate("/thank-you", { replace: true });
    }
  }, [navigate]);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await signupUser({ name, email, number });
  
      if (res.message) {
        localStorage.setItem("signedUp", "true");
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("number", number);
  
        navigate("/thank-you", { replace: true });
      } else {
        alert(res.error || "Something went wrong");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
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
          overflow: hidden;
        }

        .signup-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          height: 100vh;
          background: white;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .hero-section {
          position: relative;
          width: 102%; /* Bleed to prevent lines */
          left: -1%;
          background: #4666f6;
          padding: 60px 20px 80px;
          text-align: center;
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
          font-size: 16px;
          font-weight: 600;
        }

        .white-curve {
          position: absolute;
          bottom: -1px;
          left: -10%;
          width: 120%;
          height: 60px;
          background: white;
          clip-path: ellipse(50% 100% at 50% 100%);
        }

        .form-section {
          flex: 1;
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: white;
          width: 102%;
          left: -1%;
          position: relative;
        }

        .input-group {
          background: #eae8f0;
          border-radius: 8px 8px 0 0;
          padding: 10px 15px;
          border-bottom: 2.5px solid #5d46f6;
        }

        .input-label {
          display: block;
          font-size: 11px;
          color: #7c69e3;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .custom-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-size: 17px;
          color: #333;
          font-family: 'Inter', sans-serif;
        }

        .signup-btn {
          margin-top: 10px;
          background: #4666f6;
          color: white;
          border: none;
          padding: 18px;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .signup-btn:disabled {
          opacity: 0.6;
        }

        @media (min-width: 450px) {
          .signup-card {
            height: 844px;
            border-radius: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
        }
      `}</style>

      <div className="app-container">
        <div className="signup-card">
          <div className="hero-section">
            <h1 className="main-title">Start The<br/>Game</h1>
            <p className="subtitle">Sign up to start the Bingo!</p>
            <div className="white-curve"></div>
          </div>

          <form className="form-section" onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-label">Full Name</span>
              <input
                className="custom-input"
                type="text"
                placeholder="Enter your name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <span className="input-label">Email Address</span>
              <input
                className="custom-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <span className="input-label">Phone Number</span>
              <input
  className="custom-input"
  type="tel"
  inputMode="numeric"
  placeholder="10 digit number"
  value={number}
  required
  pattern="[0-9]{10}"
  onChange={(e) => setNumber(e.target.value)}
/>

            </div>

            <button className="signup-btn" type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
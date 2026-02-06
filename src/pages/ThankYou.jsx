import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const STORAGE_KEY = "bingo_tasks";

const ThankYou = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "Join a new Slack group", answer: "", completed: false },
          { id: 2, title: "Ask a designer about their journey", answer: "", completed: false },
          { id: 3, title: "Share your portfolio", answer: "", completed: false },
          { id: 4, title: "Give feedback to someone", answer: "", completed: false },
          { id: 5, title: "Attend a design meetup", answer: "", completed: false },
          { id: 6, title: "Learn a new design tool", answer: "", completed: false },
          { id: 7, title: "Post a design tip", answer: "", completed: false },
          { id: 8, title: "Help a junior designer", answer: "", completed: false },
          { id: 9, title: "Collaborate on a project", answer: "", completed: false },
        ];
  });
  const navigate = useNavigate();

  const [selectedTask, setSelectedTask] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // ✅ Logic: Check if all tasks are completed
  const allTasksCompleted = tasks.every((task) => task.completed === true);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === selectedTask.id
          ? { ...task, answer: inputValue, completed: true }
          : task
      )
    );

    setSelectedTask(null);
    setInputValue("");
  };
  const submitBingoToBackend = async (payload) => {
    const res = await fetch("https://design-meetup-backend.onrender.com/api/bingo/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Submission failed");
    }
  
    return res.json();
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

        .bingo-card {
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
          width: 101%;
          left: -0.5%;
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

        .subtitle { color: white; font-size: 24px; font-weight: 700; }
        .main-title {
          font-size: 52px;
          font-weight: 800;
          color: #fff8a6;
          -webkit-text-stroke: 1.5px #000;
          margin-bottom: 10px;
        }

        .surprise-text {
          color: white;
          font-size: 15px;
          font-weight: 600;
          max-width: 280px;
          margin: 0 auto;
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

        .grid-container { padding: 35px 20px; background: white; flex: 1; }
        .bingo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: #4666f6;
          gap: 1.5px;
          border: 1.5px solid #4666f6;
        }

        .grid-square {
          aspect-ratio: 1/1;
          background: #fffdf0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8px;
          cursor: pointer;
        }

        .grid-square.completed { background: #dfff9e; }

        .square-text {
          font-size: 10px;
          font-weight: 800;
          text-align: center;
          color: #000000 !important;
          line-height: 1.2;
          word-break: break-word;
        }

        .checkmark {
          color: #6fb942;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 2px;
        }

        /* Final Submit Section */
        .final-action-container {
          padding: 20px;
          background: white;
          border-top: 1px solid #eee;
          animation: slideUp 0.4s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .final-submit-btn {
          width: 100%;
          padding: 18px;
          font-weight: 800;
          font-size: 16px;
          background: #5aa100; /* Green to signify completion */
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(90, 161, 0, 0.3);
        }

        /* Modal Styles */
        .modal-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }

        .modal-card {
          background: white;
          width: 100%;
          max-width: 320px;
          border-radius: 12px;
          padding: 24px;
        }

        .modal-header {
          font-size: 19px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #000;
        }

        .input-group {
          background: #eae8f0;
          padding: 10px 15px;
          margin-bottom: 15px;
          border-bottom: 2.5px solid #5d46f6;
          border-radius: 4px 4px 0 0;
        }

        .input-label {
          font-size: 11px;
          font-weight: 700;
          color: #7c69e3;
          display: block;
          margin-bottom: 2px;
        }

        .modal-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-size: 17px;
          color: #000;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          font-weight: 800;
          background: #4666f6;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }
      `}</style>

      <div className="app-container">
        <div className="bingo-card">
          <div className="hero-section">
            <p className="subtitle">Designer Day Out</p>
            <h1 className="main-title">Design Bingo</h1>
            <p className="surprise-text">
              the person who completes all tasks sabse pahle will get a surprise gift
            </p>
            <div className="white-curve" />
          </div>

          <div className="grid-container">
            <div className="bingo-grid">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`grid-square ${task.completed ? "completed" : ""}`}
                  onClick={() => {
                    setSelectedTask(task);
                    setInputValue(task.answer || "");
                  }}
                >
                  {task.completed && <span className="checkmark">✓</span>}
                  <p className="square-text">
                    {task.completed && task.answer ? task.answer : task.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ ONLY SHOWS WHEN ALL BOXES ARE FILLED */}
          {allTasksCompleted && (
            <div className="final-action-container">
              <button
  className="final-submit-btn"
  onClick={async () => {
    try {
      const email = localStorage.getItem("email");

      const payload = {
        email,
        tasks,
        submitted_at: new Date().toISOString(),
      };

      await submitBingoToBackend(payload);

      localStorage.setItem("bingoCompleted", "true");
      navigate("/success", { replace: true });

    } catch (err) {
      alert("Failed to submit bingo. Please try again.");
      console.error(err);
    }
  }}
>
  Claim Your Surprise Gift! 🎁
</button>


            </div>
          )}

          {selectedTask && (
            <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
              <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-header">
                  Task:<br />{selectedTask.title}
                </h2>

                <div className="input-group">
                  <span className="input-label">Answer</span>
                  <input
                    className="modal-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                  />
                </div>

                <button className="submit-btn" onClick={handleSubmit}>
                  Submit Task
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ThankYou;
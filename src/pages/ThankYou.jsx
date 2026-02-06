import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "bingo_tasks";

const ThankYou = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    // ✅ Updated Task Data with your Networking Prompts
    const initialTasks = [
      { id: 1, title: "Talk to Someone New", prompt: "Ask: 'What made you get into design?'", verify: "Their original career interest?", answer: "", completed: false },
      { id: 2, title: "Find Someone Who Uses the Same Design Tool As You", prompt: "Ask: 'Which tool do you use most and why?'", verify: "A feature they love or hate?", answer: "", completed: false },
      { id: 3, title: "Get One Honest Career Advice", prompt: "Ask: 'What do you wish you knew when starting?'", verify: "What exact advice did they give?", answer: "", completed: false },
      { id: 4, title: "Meet Someone From a Different City", prompt: "Ask: 'What do you miss most about your city?'", verify: "One unique thing about their city?", answer: "", completed: false },
      { id: 5, title: "Meet Someone Currently Working in Design", prompt: "Ask: 'What does a normal work day look like?'", verify: "One task they do regularly?", answer: "", completed: false },
      { id: 6, title: "Meet Someone Building Their Portfolio", prompt: "Ask: 'What projects are you adding right now?'", verify: "The type of project they are building?", answer: "", completed: false },
      { id: 7, title: "Find Someone With Similar Design Interests", prompt: "Ask: 'What kind of design excites you most?'", verify: "A project idea or domain they like?", answer: "", completed: false },
      { id: 8, title: "Find Someone Who Switched Into Design From Another Field", prompt: "Ask: 'What were you doing before design?'", verify: "Why did they switch to design?", answer: "", completed: false },
      { id: 9, title: " Make a New Design Friend", prompt: "Ask: 'What's one thing you both want to learn?'", verify: "What common goal do you share?", answer: "", completed: false },
    ];
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const allTasksCompleted = tasks.every((task) => task.completed === true);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === selectedTask.id ? { ...task, answer: inputValue, completed: true } : task
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
    if (!res.ok) throw new Error("Submission failed");
    return res.json();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .app-container { min-height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center; background-color: #f0f2f5; font-family: 'Inter', sans-serif; }
        .bingo-card { position: relative; width: 100%; max-width: 390px; height: 100vh; background: white; display: flex; flex-direction: column; overflow: hidden; }
        .hero-section { position: relative; width: 101%; left: -0.5%; background: #4666f6; padding: 50px 20px 70px; text-align: center; z-index: 1; }
        .hero-section::before { content: ""; position: absolute; inset: 0; background-image: linear-gradient(115deg, rgba(255,255,255,0.1) 25%, transparent 25.1%, transparent 50%, rgba(255,255,255,0.1) 50.1%, rgba(255,255,255,0.1) 75%, transparent 75.1%); background-size: 100px 100%; z-index: -1; }
        .subtitle { color: white; font-size: 20px; font-weight: 700; }
        .main-title { font-size: 48px; font-weight: 800; color: #fff8a6; -webkit-text-stroke: 1.5px #000; margin-bottom: 8px; }
        .surprise-text { color: white; font-size: 13px; font-weight: 600; max-width: 280px; margin: 0 auto; line-height: 1.4; }
        .white-curve { position: absolute; bottom: -1px; left: -10%; width: 120%; height: 50px; background: white; clip-path: ellipse(50% 100% at 50% 100%); }
        .grid-container { padding: 25px 20px; background: white; flex: 1; }
        .bingo-grid { display: grid; grid-template-columns: repeat(3, 1fr); background: #4666f6; gap: 1.5px; border: 1.5px solid #4666f6; }
        .grid-square { aspect-ratio: 1/1; background: #fffdf0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 6px; cursor: pointer; }
        .grid-square.completed { background: #dfff9e; }
        .square-text { font-size: 9px; font-weight: 800; text-align: center; color: #000 !important; line-height: 1.2; word-break: break-word; }
        .checkmark { color: #6fb942; font-size: 16px; font-weight: bold; margin-bottom: 2px; }
        .final-action-container { padding: 20px; background: white; border-top: 1px solid #eee; animation: slideUp 0.4s ease-out; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .final-submit-btn { width: 100%; padding: 18px; font-weight: 800; font-size: 16px; background: #5aa100; color: white; border: none; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 15px rgba(90, 161, 0, 0.3); }
        .modal-overlay { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.45); display: flex; justify-content: center; align-items: center; z-index: 100; }
        .modal-card { background: white; width: 90%; max-width: 340px; border-radius: 12px; padding: 24px; }
        .modal-header { font-size: 18px; font-weight: 800; margin-bottom: 10px; color: #000; }
        .icebreaker-hint { font-size: 13px; color: #4666f6; font-weight: 600; margin-bottom: 20px; display: block; background: #f0f3ff; padding: 10px; border-radius: 8px; border-left: 4px solid #4666f6; }
        .input-group { background: #eae8f0; padding: 10px 15px; margin-bottom: 15px; border-bottom: 2.5px solid #5d46f6; border-radius: 4px 4px 0 0; }
        .input-label { font-size: 11px; font-weight: 700; color: #7c69e3; display: block; margin-bottom: 4px; text-transform: uppercase; }
        .modal-input { width: 100%; background: transparent; border: none; outline: none; font-size: 16px; color: #000; font-weight: 500; }
        .submit-btn { width: 100%; padding: 15px; font-weight: 800; background: #4666f6; color: white; border: none; border-radius: 10px; cursor: pointer; }
      `}</style>

      <div className="app-container">
        <div className="bingo-card">
          <div className="hero-section">
            <p className="subtitle">Designer Day Out</p>
            <h1 className="main-title">Design Bingo</h1>
            <p className="surprise-text">Complete all tasks to claim a surprise gift! 🎁</p>
            <div className="white-curve" />
          </div>

          <div className="grid-container">
            <div className="bingo-grid">
              {tasks.map((task) => (
                <div key={task.id} className={`grid-square ${task.completed ? "completed" : ""}`} onClick={() => { setSelectedTask(task); setInputValue(task.answer || ""); }}>
                  {task.completed && <span className="checkmark">✓</span>}
                  <p className="square-text">{task.completed ? task.answer : task.title}</p>
                </div>
              ))}
            </div>
          </div>

          {allTasksCompleted && (
            <div className="final-action-container">
              <button className="final-submit-btn" onClick={async () => {
                try {
                  const email = localStorage.getItem("email");
                  await submitBingoToBackend({ email, tasks, submitted_at: new Date().toISOString() });
                  localStorage.setItem("bingoCompleted", "true");
                  navigate("/success", { replace: true });
                } catch (err) { alert("Submission failed. Check your internet."); }
              }}>Claim Your Surprise Gift! 🎁</button>
            </div>
          )}

          {selectedTask && (
            <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
              <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-header">{selectedTask.title}</h2>
                <span className="icebreaker-hint">{selectedTask.prompt}</span>

                <div className="input-group">
                  <span className="input-label">{selectedTask.verify}</span>
                  <input className="modal-input" placeholder="Enter answer here" value={inputValue} onChange={(e) => setInputValue(e.target.value)} autoFocus />
                </div>

                <button className="submit-btn" onClick={handleSubmit}>Submit Answer</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ThankYou;
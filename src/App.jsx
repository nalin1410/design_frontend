import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import DesignBingo from "./pages/DesignBingo.jsx";
import Success from "./pages/Sucess.jsx";

function App() {
  // Check if the user has already finished the bingo
  const isLocked = localStorage.getItem("bingoCompleted") === "true";

  return (
    <Routes>
      {/* If isLocked is true, any attempt to visit these 
          routes will instantly kick them back to /success 
      */}
      <Route 
        path="/" 
        element={isLocked ? <Navigate to="/success" replace /> : <DesignBingo />} 
      />
      
      <Route 
        path="/signup" 
        element={isLocked ? <Navigate to="/success" replace /> : <Signup />} 
      />
      
      <Route 
        path="/thank-you" 
        element={isLocked ? <Navigate to="/success" replace /> : <ThankYou />} 
      />

      <Route path="/success" element={<Success />} />

      {/* Fallback: Redirect any unknown URL to success if locked, else home */}
      <Route 
        path="*" 
        element={<Navigate to={isLocked ? "/success" : "/"} replace />} 
      />
    </Routes>
  );
}

export default App;
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;

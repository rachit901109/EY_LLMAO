import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login'; // adjust the path to your Login component as necessary
import Signup from './views/Signup'
import Home from './views/Home';
import LandingPage from './views/LandingPage'
import Trending from './views/Trending';
import Modules from './views/Modules'
import QuizPage from './views/QuizPage'
import Contact from './views/Contact'
import Content from './views/Content'
import Issac from './views/Issac'
import Profile from './views/Profile';
import Issac2 from './views/Issac3D'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/explore" element={<Modules />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/issac" element={<Issac />} /> */}
        <Route path="/issac" element={<Issac2 />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/content" element={<Content />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
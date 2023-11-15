import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login'; // adjust the path to your Login component as necessary
import Signup from './views/Signup'
import Home from './views/Home';
import LandingPage from './views/LandingPage'
import Trending from './views/Trending';
import Modules from './views/Modules'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/modules" element={<Modules />} />
      </Routes>
    </Router>
  );
}

export default App;
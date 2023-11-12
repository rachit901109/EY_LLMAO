import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login'; // adjust the path to your Login component as necessary
import Signup from './views/Signup'
import Home from './views/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* // add more routes here as necessary */}
      </Routes>
    </Router>
  );
}

export default App;
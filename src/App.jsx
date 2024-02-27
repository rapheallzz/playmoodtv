// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import MoviePage from './pages/MoviePage';
import Channels from './pages/Channels';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Login from './pages/LoginPage';
import Register from './pages/Registrationpage';
import Dashboardpage from './pages/Dashboardpage';
import AdminDashboard from './pages/Adminpage'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/dashboard' element={<Dashboardpage/>} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/channels" element={<Channels />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path='/cookies' element={<Cookies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

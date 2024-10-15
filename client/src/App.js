import './App.css';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import SuccessPage from './pages/SucessPage';
import CancelPage from './pages/CancelPage';
import MyBookings from './pages/MyBookings';
import UserProfile from './pages/UserProfile';
import AllBookings from './pages/AllBookings';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/booking/:carid" element={<ProtectedRoute><BookingCar /></ProtectedRoute>} />
          <Route path="/userbookings" element={<ProtectedRoute><UserBookings /></ProtectedRoute>} />
          <Route path="/addcar" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
          <Route path="/editcar/:carid" element={<ProtectedRoute><EditCar /></ProtectedRoute>} />
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/userprofile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/addcar" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
          <Route path="/all-bookings" element={<ProtectedRoute><AllBookings /></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem('user')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

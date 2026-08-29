import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import About from './pages/About';
import Campaign from './pages/Campaign';
import FundForm from './pages/FundForm';
import PublicCampaignPage from './pages/PublicCampaignPage';
import Profile from './pages/Profile';
import Login from './components/Login';
import { useDialog } from './DialogContext';
import { useState, useEffect } from 'react';
import EditProfile from './components/EditProfile';
import Notification from './components/Notifications';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider, useAuth } from './components/AuthContext'; // <-- import AuthContext
import ProtectedRoute from './components/ProtectedRoute'; // <-- import ProtectedRoute

function AppContent() {
  const { isLoginDialogOpen, isNotifDialogOpen } = useDialog();
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  const { logout } = useAuth(); // <-- from AuthContext

  // hide navbar and footer on public campaign page
  const hideNavAndFooter = location.pathname.startsWith('/campaign/public/');

  // Auto logout if token expires
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1])); // decode JWT payload
        const expiry = payload.exp;
        const now = Math.floor(Date.now() / 1000);
        if (expiry < now) {
          logout();
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          window.location.href = '/'; // Redirect to home
        }
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000); // check every 1 min
    return () => clearInterval(interval);
  }, [logout]);

  return (
    <div className="relative">
      <div
        className={`${isLoginDialogOpen ? 'blur-md max-h-[1000px] overflow-hidden' : ''} ${
          edit ? 'blur-md max-h-[1300px] overflow-hidden' : ''
        } ${isNotifDialogOpen ? 'blur-md max-h-[1800px] overflow-hidden' : ''} bg-[#DEF0FF]`}
      >
        {/* navbar */}
        {!hideNavAndFooter && <NavBar />}

        {/* pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/campaign" element={<Campaign />} /> */}
          <Route path="/campaign/public/:campaignUrl" element={<PublicCampaignPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/raisefund" 
            element={
              <ProtectedRoute>
                <FundForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/campaign" 
            element={
              <ProtectedRoute>
                <Campaign />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile edit={edit} setEdit={setEdit} />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* footer */}
        {!hideNavAndFooter && <Footer />}
      </div>

      {/* Dialog components */}
      {isLoginDialogOpen && <Login />}
      {isNotifDialogOpen && <Notification />}
      {edit && <EditProfile edit={edit} setEdit={setEdit} />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

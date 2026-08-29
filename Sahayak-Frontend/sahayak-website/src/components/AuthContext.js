import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken && isTokenValid(storedToken)) {
      setToken(storedToken);
      setUserId(storedUserId); // assumes userId was saved correctly
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  }, []);

  const login = (newToken) => {
    const payload = parseJwt(newToken);
    const newUserId = payload?.userId || null;

    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', newUserId);

    setToken(newToken);
    setUserId(newUserId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
    navigate('/home'); // Redirect to home on logout
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth easily
export const useAuth = () => useContext(AuthContext);

// Helper functions
function isTokenValid(token) {
  if (!token) return false;

  try {
    const payload = parseJwt(token);
    const currentTime = Date.now() / 1000;
    return payload.exp && payload.exp > currentTime;
  } catch (e) {
    console.error('Invalid token format', e);
    return false;
  }
}

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error('Failed to parse JWT', e);
    return null;
  }
}

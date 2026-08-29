import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const fetchUnreadCount = async () => {
    if (!userId || !token) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/notifications/unread-count/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnreadCount(res.data.count || 0);
    } catch (err) {
      console.error("Error fetching unread count", err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, [userId, token]);

  return (
    <NotificationContext.Provider value={{ unreadCount, setUnreadCount, fetchUnreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

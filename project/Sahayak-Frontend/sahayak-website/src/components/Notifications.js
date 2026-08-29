import { useEffect, useState } from "react";
import closeIcon from "../assets/CloseIcon.png";
import profileIcon from "../assets/Profile-Notif.svg";
import dot from "../assets/Ellipse 26.svg";
import { useDialog } from "../DialogContext";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { formatDistanceToNow } from "date-fns";

const typeIcons = {
  PROFILE_VERIFIED: profileIcon,
  // add more icons per type if needed
};

const typeColors = {
  PROFILE_VERIFIED: "#E6F4EA", // light green background
  // extend as needed
};

const Notification = () => {
  const { closeNotifDialog } = useDialog();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 10;

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications(0, true);
  }, []);

  const fetchNotifications = async (offset = 0, reset = false) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/notifications/${userId}?offset=${offset}&limit=${LIMIT}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newNotifications = res.data.notifications || [];
      setNotifications((prev) =>
        reset ? newNotifications : [...prev, ...newNotifications]
      );
      setHasMore(newNotifications.length === LIMIT);
      setPage(offset + LIMIT);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/notifications/mark-read/${userId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchNotifications(0, true);
    } catch (err) {
      console.error("Error marking all as read", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `${API_BASE_URL}/notifications/mark-read/${userId}/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, status: "READ" } : n
        )
      );
    } catch (err) {
      console.error("Error marking as read", err);
    }
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => n.status === "NOT_READ")
      : notifications;

  return (
    <div className="bg-white w-[62%] pb-16 rounded-[40px] shadow-2xl mx-auto flex flex-col gap-[30px] items-center absolute top-24 left-64">
      <div className="flex flex-row-reverse justify-between w-full mt-[50px]">
        <div className="w-[60%] flex justify-between items-center">
          <div className="text-[32px] text-[#003198] font-bold text-center">
            Notifications
          </div>
          <button>
            <img
              src={closeIcon}
              className="w-[40px] h-[40px] mr-11 hover:scale-110 transition"
              onClick={closeNotifDialog}
              alt="close"
            />
          </button>
        </div>
      </div>

      <div className="w-[90%] flex flex-col gap-[30px]">
        <div className="flex gap-[20px] w-full items-center">
          <button
            onClick={() => setFilter("all")}
            className={`w-[100px] h-[44px] rounded-[16px] text-[20px] font-medium text-center flex items-center justify-center transition ${
              filter === "all"
                ? "bg-[#D9D9D9] text-[#003198]"
                : "text-[#5A79BE] hover:bg-gray-100"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("unread")}
            className={`w-[100px] h-[44px] rounded-[16px] text-[20px] font-medium transition ${
              filter === "unread"
                ? "text-[#003198] bg-[#D9D9D9]"
                : "text-[#5A79BE] hover:bg-gray-100"
            }`}
          >
            Unread
          </button>

          <button
            onClick={markAllAsRead}
            className="ml-auto text-[14px] text-[#003198] underline hover:text-blue-800"
          >
            Mark all as read
          </button>
        </div>

        {filteredNotifications.length === 0 ? (
          <div className="text-gray-500 text-center mt-6">No notifications</div>
        ) : (
          <>
            {filteredNotifications.map((notif, index) => {
              const bgColor = notif.status === "NOT_READ"
                ? typeColors[notif.type] || "#f0f4ff"
                : "#fff";

              return (
                <div
                  key={notif.id || index}
                  onClick={() =>
                    notif.status === "NOT_READ" && markAsRead(notif.id)
                  }
                  className={`w-full flex items-start gap-[15px] p-4 rounded-[20px] cursor-pointer transition hover:bg-[#f5f8ff]`}
                  style={{ backgroundColor: bgColor }}
                >
                  <img
                    src={typeIcons[notif.type] || profileIcon}
                    alt="icon"
                    className="w-[40px] h-[40px]"
                  />
                  <div className="flex flex-col gap-[4px] w-full">
                    <div className="text-[16px] text-gray-800">{notif.message}</div>
                    <div className="text-[#003198] text-[12px] font-semibold">
                      {formatDistanceToNow(new Date(notif.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                  {notif.status === "NOT_READ" && (
                    <img src={dot} alt="unread-dot" className="w-[15px] h-[15px]" />
                  )}
                </div>
              );
            })}
            {hasMore && (
              <button
                className="mt-4 self-center text-blue-700 underline text-sm hover:text-blue-900"
                onClick={() => fetchNotifications(page)}
              >
                Load more
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notification;

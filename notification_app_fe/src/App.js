import { useEffect, useState } from "react";
import { fetchNotifications } from "./api";
import { Log } from "./logger";
import "./App.css";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [type, setType] = useState("All");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchNotifications();
        const notificationsArray = Array.isArray(data) ? data : [];

        if (!notificationsArray.length) {
          Log("frontend", "warn", "api", "No notifications received");
        } else {
          Log("frontend", "info", "api", "Fetched notifications successfully");
        }

        setNotifications(notificationsArray);
        setFiltered(notificationsArray);
      } catch (err) {
        Log("frontend", "error", "api", "Failed to fetch notifications");
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let result =
      type === "All"
        ? notifications
        : notifications.filter((n) => n.Type === type);

    setFiltered(result);
    setPage(1);
  }, [type, notifications]);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const getTypeColor = (type) => {
    switch (type) {
      case "Placement":
        return "#4CAF50";
      case "Result":
        return "#2196F3";
      case "Event":
        return "#FF9800";
      default:
        return "#999";
    }
  };

  return (
    <div className="container">
      <h2 className="title">📢 Notifications</h2>

      <div className="toolbar">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="All">All</option>
          <option value="Placement">Placement</option>
          <option value="Result">Result</option>
          <option value="Event">Event</option>
        </select>
      </div>

      {paginated.length === 0 ? (
        <p className="empty">No notifications found</p>
      ) : (
        <div className="list">
          {paginated.map((n) => (
            <div className="card" key={n.ID}>
              <div
                className="tag"
                style={{ backgroundColor: getTypeColor(n.Type) }}
              >
                {n.Type}
              </div>

              <div className="content">
                <p className="message">{n.Message}</p>
                <span className="time">{n.Timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ⬅ Prev
        </button>

        <span>Page {page}</span>

        <button
          disabled={start + ITEMS_PER_PAGE >= filtered.length}
          onClick={() => setPage(page + 1)}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default App;
import { useEffect, useState } from "react";
import { fetchNotifications } from "./api";
import { Log } from "./logger";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [type, setType] = useState("All");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  // 🔹 Fetch data
  useEffect(() => {
  const loadData = async () => {
    try {
      const data = await fetchNotifications();

      // api.js already returns the notifications array
      const notificationsArray = Array.isArray(data) ? data : [];

      console.log("Notifications Array:", notificationsArray);

      if (!notificationsArray.length) {
        Log("frontend", "warn", "api", "No notifications received");
      } else {
        Log("frontend", "info", "api", "Fetched notifications successfully");
      }

      setNotifications(notificationsArray);
      setFiltered(notificationsArray);
    } catch (err) {
      console.error("Fetch Error:", err);
      Log("frontend", "error", "api", "Failed to fetch notifications");
    }
  };

  loadData();
}, []);

  // 🔹 Filter logic
  useEffect(() => {
    let result;

    if (type === "All") {
      result = notifications;
    } else {
      result = notifications.filter((n) => n.Type === type);
    }

    setFiltered(result);
    setPage(1);
  }, [type, notifications]);

  // 🔹 Pagination
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notifications</h2>

      {/* FILTER */}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="All">All</option>
        <option value="Placement">Placement</option>
        <option value="Result">Result</option>
        <option value="Event">Event</option>
      </select>

      {/* LIST */}
      {paginated.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No notifications found</p>
      ) : (
        <ul>
          {paginated.map((n) => (
            <li key={n.ID}>
              <b>{n.Type}</b> - {n.Message} ({n.Timestamp})
            </li>
          ))}
        </ul>
      )}

      {/* PAGINATION */}
      <div style={{ marginTop: "10px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button
          disabled={start + ITEMS_PER_PAGE >= filtered.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
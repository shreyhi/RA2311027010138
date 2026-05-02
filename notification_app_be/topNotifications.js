import axios from "axios";

const TOKEN = "YOUR_TOKEN";

const API = "http://20.207.122.201/evaluation-service/notifications";

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1
};

const getTopNotifications = async () => {
  try {
    const res = await axios.get(API, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    const notifications = res.data.notifications;

    // Sort by weight + timestamp
    const sorted = notifications.sort((a, b) => {
      const weightDiff = weights[b.Type] - weights[a.Type];
      if (weightDiff !== 0) return weightDiff;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = sorted.slice(0, 10);

    console.log("Top Notifications:");
    console.log(top10);

  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};

getTopNotifications();
import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiYXJhbndhbHNocmV5OTJAZ21haWwuY29tIiwiZXhwIjoxNzc3NzAwNTA4LCJpYXQiOjE3Nzc2OTk2MDgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJjYTA3NTkxMi1hY2M3LTRkZDctYjE3Yi01MTIzMzRlZDEyNjUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzaHJleSIsInN1YiI6IjM4MjM5NThiLTBjMWYtNGYzYi04YzllLTMwZjlkMmFhZjg4ZiJ9LCJlbWFpbCI6ImJhcmFud2Fsc2hyZXk5MkBnbWFpbC5jb20iLCJuYW1lIjoic2hyZXkiLCJyb2xsTm8iOiJyYTIzMTEwMjcwMTAxMzgiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiIzODIzOTU4Yi0wYzFmLTRmM2ItOGM5ZS0zMGY5ZDJhYWY4OGYiLCJjbGllbnRTZWNyZXQiOiJEdW1RcVpReGVYVUhVbWVFIn0.P5V-Qxi_7sa576hmq_K5VzcCuheTpoYfKDM16xZmB38";

const API = "http://20.207.122.201/evaluation-service/notifications";

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1
};

const getTopNotifications = async () => {
  try {
    // 🔸 Fetch notifications
    const res = await axios.get(API, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    const notifications = res.data.notifications;

    console.log("Total notifications fetched:", notifications.length);

    // 🔸 Sort by priority → then timestamp
    const sorted = [...notifications].sort((a, b) => {
  const weightA = weights[a.Type];
  const weightB = weights[b.Type];

  const timeA = new Date(a.Timestamp).getTime();
  const timeB = new Date(b.Timestamp).getTime();

  // Normalize time (reduce magnitude so weight still matters)
  const scoreA = weightA * 10000000000 + timeA;
  const scoreB = weightB * 10000000000 + timeB;

  return scoreB - scoreA;
});

    // 🔸 Take top 10
    const top10 = sorted.slice(0, 10);

    // 🔸 Print nicely (for screenshots)
    console.log("\nTop 10 Notifications:\n");

    top10.forEach((n, index) => {
      console.log(
        `${index + 1}. [${n.Type}] ${n.Message} (${n.Timestamp})`
      );
    });

  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
};

// 🔹 Run function
getTopNotifications();